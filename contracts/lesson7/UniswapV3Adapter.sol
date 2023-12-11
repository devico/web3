// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

contract UniswapV3Adapter {
    INonfungiblePositionManager public nonfungiblePositionManager;
    ISwapRouter public swapRouter;

    struct PositionInfo {
        address owner;
        address token0;
        address token1;
        uint128 liquidity;
    }

    mapping(uint256 => PositionInfo) public positions;

    event PoolCreated(
        address indexed pair,
        address indexed token0,
        address indexed token1,
        uint24 fee,
        uint160 sqrtPriceX96
    );

    event NewPositionMinted(
        uint256 indexed tokenId,
        address indexed owner,
        address token0,
        address token1,
        uint128 liquidity,
        uint256 amount0,
        uint256 amount1
    );

    event FeesCollected(
        uint256 indexed tokenId,
        address indexed owner,
        uint256 amount0,
        uint256 amount1
    );

    event LiquidityDecreased(
        uint256 indexed tokenId,
        address indexed owner,
        uint256 amount0,
        uint256 amount1,
        uint128 liquidity
    );

    event LiquidityIncreased(
        uint256 indexed tokenId,
        address indexed owner,
        uint128 liquidity,
        uint256 amount0,
        uint256 amount1
    );

    event SwapExecuted(address indexed tokenIn, uint256 amountIn, uint256 amountOut, bytes path);

    event SwapExactOutputExecuted(
        address indexed tokenIn,
        uint256 amountOut,
        uint256 amountIn,
        bytes path
    );

    error IdenticalAddresses();
    error ZeroAddress();
    error InvalidTokenOrder(address token0, address token1);
    error InvalidFee(uint24 fee);
    error InvalidSqrtPriceX96(uint160 sqrtPriceX96);
    error InvalidReserveValue(uint256 reserve0, uint256 reserve1);
    error OverflowRisk(uint256 reserve0, uint256 reserve1);
    error InvalidTicks(int24 minTick, int24 maxTick);
    error InsufficientAmount(uint256 amount0, uint256 amount1);
    error PositionDoesNotExist(uint256 tokenId);
    error Unauthorized(uint256 tokenId, address caller);
    error InvalidLiquidity(uint128 liquidity);
    error InvalidLiquidityAmounts(uint256 amount0, uint256 amount1);
    error InvalidTokenInput(address token);
    error InvalidAmount(uint256 amount);
    error InvalidPath(bytes path);
    error InvalidAmountOut(uint256 amount);
    error InvalidMaximumAmountIn(uint256 amount);

    /**
     * @dev Constructor for creating Uniswap V3 Adapter.
     * @param _nonfungiblePositionManager Address of the NonfungiblePositionManager contract.
     * @param _swapRouter Address of the Uniswap V3 Swap Router.
     */
    constructor(address _nonfungiblePositionManager, address _swapRouter) {
        nonfungiblePositionManager = INonfungiblePositionManager(_nonfungiblePositionManager);
        swapRouter = ISwapRouter(_swapRouter);
    }

    /**
     * @dev Creates a new pool in Uniswap V3 if it does not exist.
     * @param token0 Address of the first token in the pair.
     * @param token1 Address of the second token in the pair.
     * @param fee Pool fee.
     * @param sqrtPriceX96 Initial pool price encoded as sqrtPriceX96.
     * @return pair Address of the created pool.
     */
    function createPool(
        address token0,
        address token1,
        uint24 fee,
        uint160 sqrtPriceX96
    ) external returns (address pair) {
        if (token0 == token1) {
            revert IdenticalAddresses();
        }

        (token0, token1) = sortTokens(token0, token1);

        if (token0 == address(0)) {
            revert ZeroAddress();
        }

        if (fee != 500 && fee != 3000 && fee != 10000) {
            revert InvalidFee(fee);
        }

        if (sqrtPriceX96 <= 0) {
            revert InvalidSqrtPriceX96(sqrtPriceX96);
        }

        (pair) = nonfungiblePositionManager.createAndInitializePoolIfNecessary(
            token0,
            token1,
            fee,
            sqrtPriceX96
        );

        emit PoolCreated(pair, token0, token1, fee, sqrtPriceX96);

        return pair;
    }

    /**
     * @dev Sorts two token addresses to maintain a consistent order.
     * @param tokenA The address of the first token.
     * @param tokenB The address of the second token.
     * @return token0 The address of the token with the lower address.
     * @return token1 The address of the token with the higher address.
     */
    function sortTokens(
        address tokenA,
        address tokenB
    ) public pure returns (address token0, address token1) {
        return tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
    }

    /**
     * @dev Encodes price for Uniswap V3 in sqrtPriceX96 format.
     * @param reserve0 Amount of reserves for token 0.
     * @param reserve1 Amount of reserves for token 1.
     * @return sqrtPriceX96 Encoded price in sqrtPriceX96 format.
     */
    function encodePriceSqrt(
        uint256 reserve0,
        uint256 reserve1
    ) public pure returns (uint160 sqrtPriceX96) {
        if (reserve0 <= 0 || reserve1 <= 0) {
            revert InvalidReserveValue(reserve0, reserve1);
        }

        if (reserve0 > (type(uint256).max >> 96)) {
            revert OverflowRisk(reserve0, reserve1);
        }

        sqrtPriceX96 = uint160(sqrt((reserve0 << 96) / reserve1));
        return sqrtPriceX96;
    }

    /**
     * @dev Calculates the square root of number y.
     * This function is used for calculating square roots in the context of Uniswap V3 pricing,
     * which are represented in the sqrtPriceX96 format.
     * @param y The number from which to extract the square root.
     * @return z The square root of number y.
     */
    function sqrt(uint256 y) internal pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function testSqrt(uint256 y) external pure returns (uint256) {
        return sqrt(y);
    }

    /**
     * @dev Mints a new position in Uniswap V3 and adds liquidity to the pool.
     * @param token0 Address of the first token in the pair.
     * @param token1 Address of the second token in the pair.
     * @param poolFee Fee of the pool.
     * @param amount0ToMint Amount of token 0 to be added to the liquidity.
     * @param amount1ToMint Amount of token 1 to be added to the liquidity.
     * @param minTick Lower tick bound for the position.
     * @param maxTick Upper tick bound for the position.
     * @return tokenId Token ID of the position.
     * @return liquidity Amount of liquidity added.
     * @return amount0 Actual amount of token 0 added to the liquidity.
     * @return amount1 Actual amount of token 1 added to the liquidity.
     */
    function mintNewPosition(
        address token0,
        address token1,
        uint24 poolFee,
        uint256 amount0ToMint,
        uint256 amount1ToMint,
        int24 minTick,
        int24 maxTick
    ) external returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) {
        if (token0 == token1) {
            revert IdenticalAddresses();
        }

        (token0, token1) = sortTokens(token0, token1);

        if (token0 == address(0)) {
            revert ZeroAddress();
        }

        if (poolFee != 500 && poolFee != 3000 && poolFee != 10000) {
            revert InvalidFee(poolFee);
        }

        if (minTick >= maxTick) {
            revert InvalidTicks(minTick, maxTick);
        }

        if (amount0ToMint <= 0 || amount1ToMint <= 0) {
            revert InsufficientAmount(amount0ToMint, amount1ToMint);
        }

        IERC20(token0).transferFrom(msg.sender, address(this), amount0ToMint);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1ToMint);

        IERC20(token0).approve(address(nonfungiblePositionManager), amount0ToMint);
        IERC20(token1).approve(address(nonfungiblePositionManager), amount1ToMint);

        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager
            .MintParams({
                token0: token0,
                token1: token1,
                fee: poolFee,
                tickLower: minTick,
                tickUpper: maxTick,
                amount0Desired: amount0ToMint,
                amount1Desired: amount1ToMint,
                amount0Min: 0,
                amount1Min: 0,
                recipient: address(this),
                deadline: block.timestamp
            });

        (tokenId, liquidity, amount0, amount1) = nonfungiblePositionManager.mint(params);

        positions[tokenId] = PositionInfo({
            owner: msg.sender,
            token0: token0,
            token1: token1,
            liquidity: liquidity
        });

        emit NewPositionMinted(tokenId, msg.sender, token0, token1, liquidity, amount0, amount1);

        return (tokenId, liquidity, amount0, amount1);
    }

    /**
     * @dev Collects all fees accumulated from swaps based on the position.
     * @param tokenId Token ID of the position.
     * @return amount0 Amount of token 0 collected as fees.
     * @return amount1 Amount of token 1 collected as fees.
     */
    function collectAllFees(uint256 tokenId) external returns (uint256 amount0, uint256 amount1) {
        if (positions[tokenId].owner == address(0)) {
            revert PositionDoesNotExist(tokenId);
        }

        if (positions[tokenId].owner != msg.sender) {
            revert Unauthorized(tokenId, msg.sender);
        }

        INonfungiblePositionManager.CollectParams memory params = INonfungiblePositionManager
            .CollectParams({
                tokenId: tokenId,
                recipient: msg.sender,
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        (amount0, amount1) = nonfungiblePositionManager.collect(params);

        emit FeesCollected(tokenId, msg.sender, amount0, amount1);

        return (amount0, amount1);
    }

    /**
     * @dev Decreases liquidity of the position and returns funds.
     * @param tokenId Token ID of the position.
     * @param liquidity Amount of liquidity to decrease.
     * @return amount0 Amount of token 0 returned after decreasing liquidity.
     * @return amount1 Amount of token 1 returned after decreasing liquidity.
     */
    function decreaseLiquidity(
        uint256 tokenId,
        uint128 liquidity
    ) external returns (uint256 amount0, uint256 amount1) {
        if (positions[tokenId].owner == address(0)) {
            revert PositionDoesNotExist(tokenId);
        }

        if (positions[tokenId].owner != msg.sender) {
            revert Unauthorized(tokenId, msg.sender);
        }

        if (liquidity == 0 || positions[tokenId].liquidity < liquidity) {
            revert InvalidLiquidity(liquidity);
        }

        INonfungiblePositionManager.DecreaseLiquidityParams
            memory params = INonfungiblePositionManager.DecreaseLiquidityParams({
                tokenId: tokenId,
                liquidity: liquidity,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            });

        (amount0, amount1) = nonfungiblePositionManager.decreaseLiquidity(params);

        emit LiquidityDecreased(tokenId, msg.sender, amount0, amount1, liquidity);

        return (amount0, amount1);
    }

    /**
     * @dev Increases liquidity of an existing position.
     * @param tokenId Token ID of the position.
     * @param amountAdd0 Amount of token 0 to be added.
     * @param amountAdd1 Amount of token 1 to be added.
     * @return liquidity New amount of liquidity.
     * @return amount0 Actual amount of token 0 added to the liquidity.
     * @return amount1 Actual amount of token 1 added to the liquidity.
     */
    function increaseLiquidity(
        uint256 tokenId,
        uint256 amountAdd0,
        uint256 amountAdd1
    ) external returns (uint128 liquidity, uint256 amount0, uint256 amount1) {
        if (positions[tokenId].owner == address(0)) {
            revert PositionDoesNotExist(tokenId);
        }

        if (positions[tokenId].owner != msg.sender) {
            revert Unauthorized(tokenId, msg.sender);
        }

        if (amountAdd0 <= 0 || amountAdd1 <= 0) {
            revert InvalidLiquidityAmounts(amountAdd0, amountAdd1);
        }

        IERC20(positions[tokenId].token0).transferFrom(msg.sender, address(this), amountAdd0);
        IERC20(positions[tokenId].token1).transferFrom(msg.sender, address(this), amountAdd1);

        IERC20(positions[tokenId].token0).approve(address(nonfungiblePositionManager), amountAdd0);
        IERC20(positions[tokenId].token1).approve(address(nonfungiblePositionManager), amountAdd1);

        INonfungiblePositionManager.IncreaseLiquidityParams
            memory params = INonfungiblePositionManager.IncreaseLiquidityParams({
                tokenId: tokenId,
                amount0Desired: amountAdd0,
                amount1Desired: amountAdd1,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            });

        (liquidity, amount0, amount1) = nonfungiblePositionManager.increaseLiquidity(params);

        emit LiquidityIncreased(tokenId, msg.sender, liquidity, amount0, amount1);

        return (liquidity, amount0, amount1);
    }

    /**
     * @dev Performs a swap with a fixed amount of input tokens.
     * @param tokenIn Address of the input token.
     * @param amountIn Amount of input tokens.
     * @param amountOutMinimum Minimum amount of output tokens.
     * @param path Path of the swap.
     * @return amountOut Amount of tokens received.
     */
    function swapExactInput(
        address tokenIn,
        uint256 amountIn,
        uint256 amountOutMinimum,
        bytes memory path
    ) external returns (uint256 amountOut) {
        if (tokenIn == address(0)) {
            revert InvalidTokenInput(tokenIn);
        }

        if (amountIn == 0) {
            revert InvalidAmount(amountIn);
        }

        if (path.length == 0) {
            revert InvalidPath(path);
        }

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);

        IERC20(tokenIn).approve(address(swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams({
            path: path,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: amountOutMinimum
        });

        amountOut = swapRouter.exactInput(params);

        emit SwapExecuted(tokenIn, amountIn, amountOut, path);

        return amountOut;
    }

    /**
     * @dev Performs a swap with a fixed amount of output tokens.
     * @param tokenIn Address of the input token.
     * @param amountOut Amount of output tokens.
     * @param amountInMaximum Maximum amount of input tokens.
     * @param path Path of the swap.
     * @return amountIn Amount of tokens used.
     */
    function swapExactOutput(
        address tokenIn,
        uint256 amountOut,
        uint256 amountInMaximum,
        bytes memory path
    ) external returns (uint256 amountIn) {
        if (tokenIn == address(0)) {
            revert InvalidTokenInput(tokenIn);
        }

        if (amountOut == 0) {
            revert InvalidAmountOut(amountOut);
        }

        if (amountInMaximum == 0) {
            revert InvalidMaximumAmountIn(amountInMaximum);
        }

        if (path.length == 0) {
            revert InvalidPath(path);
        }

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountInMaximum);

        IERC20(tokenIn).approve(address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputParams memory params = ISwapRouter.ExactOutputParams({
            path: path,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut: amountOut,
            amountInMaximum: amountInMaximum
        });

        amountIn = swapRouter.exactOutput(params);

        if (amountIn < amountInMaximum) {
            IERC20(tokenIn).transfer(msg.sender, amountInMaximum - amountIn);
        }

        emit SwapExactOutputExecuted(tokenIn, amountOut, amountIn, path);

        return amountIn;
    }
}
