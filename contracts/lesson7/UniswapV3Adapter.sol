// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";

contract UniswapV3Adapter {
    INonfungiblePositionManager public nonfungiblePositionManager;
    IUniswapV3Factory public uniswapV3Factory;

    constructor(
        address _nonfungiblePositionManager,
        address _uniswapV3Factory,
    ) {
        nonfungiblePositionManager = INonfungiblePositionManager(_nonfungiblePositionManager);
        uniswapV3Factory = IUniswapV3Factory(_uniswapV3Factory);
    }

    function createPool(
        address token0,
        address token1,
        uint24 fee,
        uint160 sqrtPriceX96
    ) external returns (address pair) {
        require(token0 < token1, "Token0 must be less than Token1");

        (pair, , ) = nonfungiblePositionManager.createAndInitializePoolIfNecessary(
            token0,
            token1,
            fee,
            sqrtPriceX96
        );

        return pair;
    }

    function encodePriceSqrt(
        uint256 reserve0,
        uint256 reserve1
    ) public pure returns (uint160 sqrtPriceX96) {
        require(reserve0 > 0 && reserve1 > 0, "Reserves must be greater than zero");
        sqrtPriceX96 = uint160(sqrt((reserve0 << 96) / reserve1));
        return sqrtPriceX96;
    }

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
}
