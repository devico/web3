import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verify } from "../scripts/helpers/verify"


const deployDonation: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const donation = await deploy("Donation", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 6,
  });

  await verify(donation.address, []);
};

export default deployDonation;
deployDonation.tags = ["Donation"];