import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verify } from "../scripts/helpers/verify"

const deployERC20: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const initialSupply = "1000";

  const token = await deploy("ERC20", {
    from: deployer,
    args: [initialSupply],
    log: true,
    waitConfirmations: 6,
  });

  await verify(token.address, [initialSupply]);
};

export default deployERC20;
deployERC20.tags = ["ERC20"];