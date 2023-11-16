import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verify } from "../scripts/helpers/verify"

const deployFunds: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const funds = await deploy("Funds", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 6,
  });

  await verify(funds.address, []);
};

export default deployFunds;
deployFunds.tags = ["Funds"];