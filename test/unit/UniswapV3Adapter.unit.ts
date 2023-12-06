import { expect } from "chai";
import { ethers } from "hardhat";
import { UniswapV3Adapter } from "../../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

describe("UniswapV3Adapter", function () {
    let adapter: UniswapV3Adapter;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const UniswapV3Adapter = await ethers.getContractFactory("UniswapV3Adapter");

        adapter = await UniswapV3Adapter.deploy("nonfungiblePositionManagerAddress", "uniswapV3FactoryAddress", "swapRouterAddress");
    });

    describe("createPool", function () {
        it("should create a pool correctly", async function () {
            const token0 = "0x...";
            const token1 = "0x...";
            const fee = 500; 
            const sqrtPriceX96 = ethers.utils.parseUnits("1", 18); 

            const tx = await adapter.createPool(token0, token1, fee, sqrtPriceX96);
            await expect(tx).to.emit(adapter, "PoolCreated");
        });

        it("should revert with invalid token order", async function () {
            const token0 = "0x...";
            const token1 = "0x...";
            const fee = 500;
            const sqrtPriceX96 = ethers.utils.parseUnits("1", 18);

            await expect(adapter.createPool(token1, token0, fee, sqrtPriceX96))
                .to.be.revertedWith("InvalidTokenOrder");
        });
    });
});
