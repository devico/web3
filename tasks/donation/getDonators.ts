import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { Donation } from "../../typechain"

task("getDonators", "Prints the list of donators")
  .addParam("contract", "The contract's address")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const donationContract: Donation = <Donation>(
      await hre.ethers.getContractAt("Donation", taskArgs.contract)
    )
    
    const donators = await donationContract.getDonators();
    
    console.log("Donators:", donators);
  });
