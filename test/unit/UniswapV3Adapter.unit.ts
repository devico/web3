import { expect } from "chai"
import { ethers } from "hardhat"
import { ERC20, UniswapV3Adapter } from "../../typechain"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { encodePriceSqrt } from "../shared/utilities"
import { BigNumber } from "ethers"
const { MAX_INTEGER } = require("@nomicfoundation/ethereumjs-util");

describe("UniswapV3Adapter", function () {
    let adapter: UniswapV3Adapter
    let owner: SignerWithAddress
    let addr1: SignerWithAddress
    let addr2: SignerWithAddress
    let user: SignerWithAddress
    let token0: ERC20
    let token1: ERC20
    const initialsupply = ethers.utils.parseEther("100000")
    let tokenId: BigNumber;

    beforeEach(async function () {
        [owner, addr1, addr2, user] = await ethers.getSigners()

        const token = await ethers.getContractFactory("ERC20")
        token0 = await token.deploy(initialsupply)
        token1 = await token.deploy(initialsupply)

        const UniswapV3Adapter = await ethers.getContractFactory("UniswapV3Adapter")

        adapter = await UniswapV3Adapter.deploy(
            "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
            "0xE592427A0AEce92De3Edee1F18E0157C05861564"
        )
    })

    describe("createPool", function () {
        it("should create a pool correctly", async function () {
            const poolFee = 500
            const sqrtPriceX96 = encodePriceSqrt("1", 18)

            const tx = await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )
            await expect(tx).to.emit(adapter, "PoolCreated")
        })

        it("should revert with identical token addresses", async function () {
            const PoolFee = 500
            const sqrtPriceX96 = encodePriceSqrt("1", 18)
            const tokenAddress = token0.address

            await expect(
                adapter.createPool(tokenAddress, tokenAddress, PoolFee, sqrtPriceX96)
            ).to.be.revertedWithCustomError(adapter, "IdenticalAddresses")
        })

        it("should revert with zero address for token0", async function () {
            const poolFee = 500
            const sqrtPriceX96 = encodePriceSqrt("1", 18)
            const tokenAddress = token0.address

            await expect(
                adapter.createPool(
                    ethers.constants.AddressZero,
                    tokenAddress,
                    poolFee,
                    sqrtPriceX96
                )
            ).to.be.revertedWithCustomError(adapter, "ZeroAddress")
        })

        it("should revert with zero address for token1", async function () {
            const poolFee = 500
            const sqrtPriceX96 = encodePriceSqrt("1", 18)
            const tokenAddress = token0.address

            await expect(
                adapter.createPool(
                    tokenAddress,
                    ethers.constants.AddressZero,
                    poolFee,
                    sqrtPriceX96
                )
            ).to.be.revertedWithCustomError(adapter, "ZeroAddress")
        })

        it("should revert with invalid fee", async function () {
            const sqrtPriceX96 = encodePriceSqrt("1", 18)
            const invalidFee = 100

            await expect(
                adapter.createPool(token0.address, token1.address, invalidFee, sqrtPriceX96)
            ).to.be.revertedWithCustomError(adapter, "InvalidFee")
        })

        it("should revert with invalid sqrtPriceX96", async function () {
            const fee = 500;
            const invalidSqrtPriceX96 = 0

            await expect(
                adapter.createPool(token0.address, token1.address, fee, invalidSqrtPriceX96)
            ).to.be.revertedWithCustomError(adapter, "InvalidSqrtPriceX96")
        })
    })

    describe("mintNewPosition", function () {
        it("should mint new position correctly", async function () {
            const poolFee = 500
            const amount0ToMint = ethers.utils.parseUnits("10", 18)
            const amount1ToMint = ethers.utils.parseUnits("10", 18)
            const minTick = -885000
            const maxTick = 885000
            const sqrtPriceX96 = encodePriceSqrt("1", 18)

            await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const tx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, poolFee, amount0ToMint, amount1ToMint, minTick, maxTick);

            await expect(tx).to.emit(adapter, "NewPositionMinted")
        })

        it("should revert with insufficient token amount to mint", async function () {
            const poolFee = 500
            const amount1ToMint = ethers.utils.parseUnits("10", 18)
            const minTick = -885000
            const maxTick = 885000
            const insufficientAmount = ethers.utils.parseUnits("0", 18)

            await expect(
                adapter.mintNewPosition(
                    token0.address,
                    token1.address,
                    poolFee,
                    insufficientAmount,
                    amount1ToMint,
                    minTick,
                    maxTick
                )
            ).to.be.revertedWithCustomError(adapter, "InsufficientAmount")
        })

        it("should revert with invalid fee", async function () {
            const amount0ToMint = ethers.utils.parseUnits("10", 18)
            const amount1ToMint = ethers.utils.parseUnits("10", 18)
            const minTick = -885000
            const maxTick = 885000
            const invalidFee = 100

            await expect(
                adapter.mintNewPosition(
                    token0.address,
                    token1.address,
                    invalidFee,
                    amount0ToMint,
                    amount1ToMint,
                    minTick,
                    maxTick
                )
            ).to.be.revertedWithCustomError(adapter, "InvalidFee")
        })

        it("should revert with invalid tick bounds", async function () {
            const poolFee = 500
            const amount0ToMint = ethers.utils.parseUnits("10", 18)
            const amount1ToMint = ethers.utils.parseUnits("10", 18)
            const invalidMinTick = 100
            const invalidMaxTick = -100

            await expect(
                adapter.mintNewPosition(
                    token0.address,
                    token1.address,
                    poolFee,
                    amount0ToMint,
                    amount1ToMint,
                    invalidMinTick,
                    invalidMaxTick
                )
            ).to.be.revertedWithCustomError(adapter, "InvalidTicks")
        })

        it("should revert when token amount is zero", async function () {
            const poolFee = 500
            const amount1ToMint = ethers.utils.parseUnits("10", 18)
            const zeroAmount = ethers.constants.Zero
            const minTick = -885000
            const maxTick = 885000

            await expect(
                adapter.mintNewPosition(
                    token0.address,
                    token1.address,
                    poolFee,
                    zeroAmount,
                    amount1ToMint,
                    minTick,
                    maxTick
                )
            ).to.be.revertedWithCustomError(adapter, "InsufficientAmount")
        })

        it("should revert when both tokens are identical", async function() {
            const poolFee = 500;
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
    
            await expect(
                adapter.mintNewPosition(
                    token0.address,
                    token0.address,
                    poolFee,
                    amount0ToMint,
                    amount1ToMint,
                    minTick,
                    maxTick
                )
            ).to.be.revertedWithCustomError(adapter, "IdenticalAddresses");
        });
    
        it("should revert when token0 is zero address", async function() {
            const poolFee = 500;
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
    
            await expect(
                adapter.mintNewPosition(
                    ethers.constants.AddressZero,
                    token1.address,
                    poolFee,
                    amount0ToMint,
                    amount1ToMint,
                    minTick,
                    maxTick
                )
            ).to.be.revertedWithCustomError(adapter, "ZeroAddress");
        });
    
        it("should revert when token1 is zero address", async function() {
            const poolFee = 500;
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
    
            await expect(
                adapter.mintNewPosition(
                    token0.address,
                    ethers.constants.AddressZero,
                    poolFee,
                    amount0ToMint,
                    amount1ToMint,
                    minTick,
                    maxTick
                )
            ).to.be.revertedWithCustomError(adapter, "ZeroAddress");
        });
    })

    describe("encodePriceSqrt", function() {
        it("Should correctly encode price", async function() {
            const reserve0 = ethers.utils.parseUnits("10", 18);
            const reserve1 = ethers.utils.parseUnits("20", 18);
            const sqrtPriceX96 = await adapter.encodePriceSqrt(reserve0, reserve1);
            expect(sqrtPriceX96).to.be.gt(0);
        });
    
        it("Should revert with invalid reserve values", async function() {
            const invalidReserve = ethers.constants.Zero;
            await expect(adapter.encodePriceSqrt(invalidReserve, invalidReserve))
                .to.be.revertedWithCustomError(adapter, "InvalidReserveValue");
        });
    
        it("Should revert on overflow risk", async function() {
            const overflowReserve = ethers.constants.MaxUint256;
            await expect(adapter.encodePriceSqrt(overflowReserve, 1))
                .to.be.revertedWithCustomError(adapter, "OverflowRisk");
        });
    
        it("Should return correct sqrtPriceX96 for large reserve values", async function() {
            const largeReserve0 = ethers.utils.parseUnits("1", 36);
            const largeReserve1 = ethers.utils.parseUnits("1", 18);
            const sqrtPriceX96 = await adapter.encodePriceSqrt(largeReserve0, largeReserve1);
            expect(sqrtPriceX96).to.be.gt(0);
        });
    
        it("Should return 1 for equal reserve values", async function() {
            const reserve = ethers.utils.parseUnits("1", 18);
            const sqrtPriceX96 = await adapter.encodePriceSqrt(reserve, reserve);
            expect(sqrtPriceX96).to.equal("281474976710656");
        });
    
        it("Should handle small reserve values correctly", async function() {
            const reserve0 = 1;
            const reserve1 = 1000;
            const sqrtPriceX96 = await adapter.encodePriceSqrt(reserve0, reserve1);
            expect(sqrtPriceX96).to.be.gt(0);
        });

        it("Should revert if reserve0 is zero", async function() {
            const reserve0 = ethers.constants.Zero;
            const reserve1 = ethers.utils.parseUnits("1", 18);
    
            await expect(adapter.encodePriceSqrt(reserve0, reserve1))
                .to.be.revertedWithCustomError(adapter, "InvalidReserveValue");
        });

        it("Should revert if reserve1 is zero", async function() {
            const validReserve0 = ethers.utils.parseUnits("1", 18);
            const zeroReserve1 = ethers.constants.Zero;
        
            await expect(adapter.encodePriceSqrt(validReserve0, zeroReserve1))
                .to.be.revertedWithCustomError(adapter, "InvalidReserveValue");
        });
    
        it("Should revert if reserve values are too high", async function() {
            const reserve0 = ethers.constants.MaxUint256;
            const reserve1 = ethers.utils.parseUnits("1", 18);
    
            await expect(adapter.encodePriceSqrt(reserve0, reserve1))
                .to.be.revertedWithCustomError(adapter, "OverflowRisk");
        });
    });

    describe("sqrt function", function() {
        it("should correctly calculate the square root of 4", async function() {
            expect(await adapter.testSqrt(4)).to.equal(2);
        });
    
        it("should return 1 for any input less than 4", async function() {
            for (let i = 1; i < 4; i++) {
                expect(await adapter.testSqrt(i)).to.equal(1);
            }
        });
    
        it("should return 0 for input 0", async function() {
            expect(await adapter.testSqrt(0)).to.equal(0);
        });
    });

    describe("collectAllFees", function () {
        it("Should successfully collect fees", async function () {
            const poolFee = 500
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt("1", 18)

            await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, poolFee, amount0ToMint, amount1ToMint, minTick, maxTick);

            const mintReceipt = await mintTx.wait();

            if (!mintReceipt.events) throw new Error("Events are undefined");

            const mintEvent = mintReceipt.events.find(event => event.event === 'NewPositionMinted');

            expect(mintEvent).to.exist;

            const tokenId = mintEvent?.args?.tokenId;

            await expect(adapter.connect(owner).collectAllFees(tokenId))
                .to.emit(adapter, "FeesCollected");
        });

        it("Should revert if position does not exist", async function () {
            const poolFee = 500
            const sqrtPriceX96 = encodePriceSqrt("1", 18)

            await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            await expect(adapter.connect(owner).collectAllFees(ethers.constants.Zero))
                .to.be.revertedWithCustomError(adapter, "PositionDoesNotExist");
        });

        it("Should revert if caller is not position owner", async function () {
            const poolFee = 500
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt("1", 18)
            const liquidity = 1000;

            await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, poolFee, amount0ToMint, amount1ToMint, minTick, maxTick);

            const mintReceipt = await mintTx.wait();

            if (!mintReceipt.events) throw new Error("Events are undefined");

            const mintEvent = mintReceipt.events.find(event => event.event === 'NewPositionMinted');

            expect(mintEvent).to.exist;

            const tokenId = mintEvent?.args?.tokenId;

            await expect(adapter.connect(user).collectAllFees(tokenId))
                .to.be.revertedWithCustomError(adapter, "Unauthorized");
        });
    });

    describe("decreaseLiquidity", function () {
        it("should decrease liquidity correctly", async function () {
            const poolFee = 500
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt("1", 18)
            const liquidityToDecrease = 500;

            await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, poolFee, amount0ToMint, amount1ToMint, minTick, maxTick);

            const mintReceipt = await mintTx.wait();

            if (!mintReceipt.events) throw new Error("Events are undefined");

            const mintEvent = mintReceipt.events.find(event => event.event === 'NewPositionMinted');

            expect(mintEvent).to.exist;

            const tokenId = mintEvent?.args?.tokenId;

            await expect(adapter.connect(owner).decreaseLiquidity(tokenId, liquidityToDecrease))
                .to.emit(adapter, "LiquidityDecreased");
        });

        it("should revert if position does not exist", async function () {
            const poolFee = 500
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt("1", 18)
            const invalidTokenId = 999;
            const liquidity = 1000;

            await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, poolFee, amount0ToMint, amount1ToMint, minTick, maxTick);

            await expect(adapter.connect(owner).decreaseLiquidity(invalidTokenId, liquidity))
                .to.be.revertedWithCustomError(adapter, "PositionDoesNotExist");
        });

        it("should revert if caller is not position owner", async function () {
            const poolFee = 500
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt("1", 18)
            const liquidity = 1000;

            await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, poolFee, amount0ToMint, amount1ToMint, minTick, maxTick);

            const mintReceipt = await mintTx.wait();

            if (!mintReceipt.events) throw new Error("Events are undefined");

            const mintEvent = mintReceipt.events.find(event => event.event === 'NewPositionMinted');

            expect(mintEvent).to.exist;

            const tokenId = mintEvent?.args?.tokenId;

            await expect(adapter.connect(addr1).decreaseLiquidity(tokenId, liquidity))
                .to.be.revertedWithCustomError(adapter, "Unauthorized");
        });

        it("should revert if liquidity is invalid", async function () {
            const poolFee = 500
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt("1", 18)
            const invalidLiquidity = 0;

            await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, poolFee, amount0ToMint, amount1ToMint, minTick, maxTick);

            const mintReceipt = await mintTx.wait();

            if (!mintReceipt.events) throw new Error("Events are undefined");

            const mintEvent = mintReceipt.events.find(event => event.event === 'NewPositionMinted');

            expect(mintEvent).to.exist;

            const tokenId = mintEvent?.args?.tokenId;

            await expect(adapter.connect(owner).decreaseLiquidity(tokenId, invalidLiquidity))
                .to.be.revertedWithCustomError(adapter, "InvalidLiquidity");
        });

        it("should revert if liquidity is more than the position's", async function () {
            const poolFee = 500
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt("1", 18);

            await adapter.createPool(
                token0.address,
                token1.address,
                poolFee,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, poolFee, amount0ToMint, amount1ToMint, minTick, maxTick);

            const mintReceipt = await mintTx.wait();

            if (!mintReceipt.events) throw new Error("Events are undefined");

            const mintEvent = mintReceipt.events.find(event => event.event === 'NewPositionMinted');

            expect(mintEvent).to.exist;

            const tokenId = mintEvent?.args?.tokenId;

            const excessiveLiquidity = mintEvent?.args?.liquidity + 1000;

            await expect(adapter.connect(owner).decreaseLiquidity(tokenId, excessiveLiquidity))
                .to.be.revertedWithCustomError(adapter, "InvalidLiquidity");
        });
    });

    describe("increaseLiquidity", function () {
        beforeEach(async function () {
            const poolFee = 500;
            const sqrtPriceX96 = ethers.utils.parseUnits("1", 18);

            await adapter.createPool(token0.address, token1.address, poolFee, sqrtPriceX96);

            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, poolFee, amount0ToMint, amount1ToMint, minTick, maxTick);

            const mintReceipt = await mintTx.wait();

            if (!mintReceipt.events) throw new Error("Events are undefined");

            const mintEvent = mintReceipt.events.find(event => event.event === 'NewPositionMinted');

            tokenId = mintEvent?.args?.tokenId;
        });

        it("should increase liquidity correctly", async function () {
            const amountAdd0 = ethers.utils.parseEther("1");
            const amountAdd1 = ethers.utils.parseEther("1");

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            await expect(adapter.connect(owner).increaseLiquidity(tokenId, amountAdd0, amountAdd1))
                .to.emit(adapter, "LiquidityIncreased");
        });

        it("Should revert if tokenId does not exist", async function() {
            const invalidTokenId = BigNumber.from(999);
            await expect(adapter.increaseLiquidity(invalidTokenId, 100, 100))
                .to.be.revertedWithCustomError(adapter, "PositionDoesNotExist");
        });
    
        it("Should revert if called by non-owner", async function() {
            await expect(adapter.connect(addr1).increaseLiquidity(tokenId, 100, 100))
                .to.be.revertedWithCustomError(adapter, "Unauthorized");
        });
    
        it("Should revert if amounts are zero", async function() {
            await expect(adapter.increaseLiquidity(tokenId, 0, 0))
                .to.be.revertedWithCustomError(adapter, "InvalidLiquidityAmounts");
        });

        it("Should revert if token approval is insufficient", async function() {
            const amountAdd0 = ethers.utils.parseEther("1");
            const amountAdd1 = ethers.utils.parseEther("1");
            
            await token0.connect(owner).approve(adapter.address, amountAdd0.sub(1));
            await token1.connect(owner).approve(adapter.address, amountAdd1.sub(1));
    
            await expect(adapter.increaseLiquidity(tokenId, amountAdd0, amountAdd1))
                .to.be.reverted;
        });
    });

    describe("swapExactInput", function () {
        const POOL_FEE = 500;
    
        beforeEach(async function () {
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt("1", 18)

            await adapter.createPool(
                token0.address,
                token1.address,
                POOL_FEE,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, POOL_FEE, amount0ToMint, amount1ToMint, minTick, maxTick);

            const mintReceipt = await mintTx.wait();

            if (!mintReceipt.events) throw new Error("Events are undefined");

            const mintEvent = mintReceipt.events.find(event => event.event === 'NewPositionMinted');

            expect(mintEvent).to.exist;

            tokenId = mintEvent?.args?.tokenId;
        });
    
        it("should swap tokens correctly", async function () {
            const amountToSwap = ethers.utils.parseUnits("5", 18);
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [token0.address, POOL_FEE, token1.address]);
    
            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await expect(adapter.connect(owner).swapExactInput(token0.address, amountToSwap, 0, path))
                .to.emit(adapter, "SwapExecuted");
        });
    
        it("should revert if tokenIn is zero address", async function () {
            const amountToSwap = ethers.utils.parseUnits("5", 18);
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [ethers.constants.AddressZero, POOL_FEE, token1.address]);
    
            await expect(adapter.swapExactInput(ethers.constants.AddressZero, amountToSwap, 0, path))
                .to.be.revertedWithCustomError(adapter, "InvalidTokenInput");
        });
    
        it("should revert if amountIn is zero", async function () {
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [token0.address, POOL_FEE, token1.address]);
    
            await expect(adapter.swapExactInput(token0.address, 0, 0, path))
                .to.be.revertedWithCustomError(adapter, "InvalidAmount");
        });
    
        it("should revert if path is invalid", async function () {
            const amountToSwap = ethers.utils.parseUnits("5", 18);
            const invalidPath = "0x";
    
            await expect(adapter.swapExactInput(token0.address, amountToSwap, 0, invalidPath))
                .to.be.revertedWithCustomError(adapter, "InvalidPath");
        });
    
        it("should revert if amountOutMinimum is not met", async function () {
            const amountToSwap = ethers.utils.parseUnits("5", 18);
            const amountOutMinimum = ethers.utils.parseUnits("1000", 18);
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [token0.address, POOL_FEE, token1.address]);
    
            await expect(adapter.swapExactInput(token0.address, amountToSwap, amountOutMinimum, path))
                .to.be.revertedWith("Too little received");
        });
    
        it("should revert if tokenIn has insufficient balance", async function () {
            const amountToSwap = ethers.utils.parseUnits("1000000", 18);
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [token0.address, POOL_FEE, token1.address]);
    
            await expect(adapter.swapExactInput(token0.address, amountToSwap, 0, path))
                .to.be.revertedWith("Not enough tokens.");
        });
    });

    describe("swapExactOutput", function () {
        const POOL_FEE = 500;
    
        beforeEach(async function () {
            const amount0ToMint = ethers.utils.parseUnits("10", 18);
            const amount1ToMint = ethers.utils.parseUnits("10", 18);
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt("1", 18)

            await adapter.createPool(
                token0.address,
                token1.address,
                POOL_FEE,
                sqrtPriceX96
            )

            await token0.connect(owner).approve(adapter.address, MAX_INTEGER);
            await token1.connect(owner).approve(adapter.address, MAX_INTEGER);

            const mintTx = await adapter.connect(owner)
                .mintNewPosition(token0.address, token1.address, POOL_FEE, amount0ToMint, amount1ToMint, minTick, maxTick);

            const mintReceipt = await mintTx.wait();

            if (!mintReceipt.events) throw new Error("Events are undefined");

            const mintEvent = mintReceipt.events.find(event => event.event === 'NewPositionMinted');

            expect(mintEvent).to.exist;

            tokenId = mintEvent?.args?.tokenId;
        });
    
        it("should execute swapExactOutput successfully", async function () {
            const amountOut = ethers.utils.parseUnits("1", 18);
            const amountInMaximum = ethers.utils.parseUnits("5", 18);
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [token1.address, POOL_FEE, token0.address]);

            const ownerBalance = await token0.balanceOf(owner.address);
            expect(ownerBalance.gte(amountInMaximum)).to.be.true;

            await token0.connect(owner).approve(adapter.address, amountInMaximum);

            await expect(adapter.connect(owner).swapExactOutput(token0.address, amountOut, amountInMaximum, path))
                .to.emit(adapter, "SwapExactOutputExecuted");
        });
    
        it("should revert on zero token input", async function () {
            const amountOut = ethers.utils.parseUnits("1", 18);
            const amountInMaximum = ethers.utils.parseUnits("5", 18);
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [token1.address, POOL_FEE, token0.address]);
    
            await expect(adapter.connect(owner).swapExactOutput(ethers.constants.AddressZero, amountOut, amountInMaximum, path))
                .to.be.revertedWithCustomError(adapter, "InvalidTokenInput");
        });
    
        it("should revert on invalid amount", async function () {
            const amountOut = ethers.utils.parseUnits("1", 18);
            const invalidAmountInMaximum = ethers.constants.Zero;
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [token1.address, POOL_FEE, token0.address]);
    
            await expect(adapter.connect(owner).swapExactOutput(token0.address, amountOut, invalidAmountInMaximum, path))
                .to.be.revertedWithCustomError(adapter, "InvalidMaximumAmountIn");
        });
    
        it("should revert on zero amount out", async function () {
            const zeroAmountOut = ethers.constants.Zero;
            const amountInMaximum = ethers.utils.parseUnits("5", 18);
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [token1.address, POOL_FEE, token0.address]);
    
            await expect(adapter.connect(owner).swapExactOutput(token0.address, zeroAmountOut, amountInMaximum, path))
                .to.be.revertedWithCustomError(adapter, "InvalidAmountOut");
        });
    
        it("should revert on invalid path", async function () {
            const amountOut = ethers.utils.parseUnits("1", 18);
            const amountInMaximum = ethers.utils.parseUnits("5", 18);
            const invalidPath = "0x";
    
            await expect(adapter.connect(owner).swapExactOutput(token0.address, amountOut, amountInMaximum, invalidPath))
                .to.be.revertedWithCustomError(adapter, "InvalidPath");
        });
    
        it("should revert if amount in maximum is not sufficient", async function () {
            const amountOut = ethers.utils.parseUnits("10", 18);
            const insufficientAmountInMaximum = ethers.utils.parseUnits("1", 18);
            const path = ethers.utils.solidityPack(["address", "uint24", "address"], [token1.address, POOL_FEE, token0.address]);
    
            await expect(adapter.connect(owner).swapExactOutput(token0.address, amountOut, insufficientAmountInMaximum, path))
                .to.be.reverted;
        });
    });
})
