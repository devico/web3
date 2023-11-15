import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { Donation } from "../../typechain"

task("getSumOfDonations", "Prints the total sum of donations")
  .addParam("contract", "The contract's address")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const donationContract: Donation = <Donation>(
      await hre.ethers.getContractAt("Donation", taskArgs.contract)
    )
    
    const total = await donationContract.getSumOfDonations();

    console.log("Total Donations:", total.toString());
  });
  