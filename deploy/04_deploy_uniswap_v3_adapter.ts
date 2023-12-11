import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verify } from "../scripts/helpers/verify"

const deployUniswapV3Adapter: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const nonfungiblePositionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
  const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

  const uniswapV3Adapter = await deploy("UniswapV3Adapter", {
    from: deployer,
    args: [nonfungiblePositionManagerAddress, swapRouterAddress],
    log: true,
    waitConfirmations: 6,
  });

  await verify(uniswapV3Adapter.address, [nonfungiblePositionManagerAddress, swapRouterAddress]);
};

export default deployUniswapV3Adapter;
deployUniswapV3Adapter.tags = ["UniswapV3Adapter"];