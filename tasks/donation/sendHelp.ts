import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { Donation } from "../../typechain"

task("sendHelp", "Sends help to a specified address")
  .addParam("contract", "The contract's address")
  .addParam("to", "The recipient's address")
  .addParam("amount", "The amount to send")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const { contract, to, amount } = taskArgs;
    const donationContract: Donation = <Donation>(
      await hre.ethers.getContractAt("Donation", contract)
    )

    const tx = await donationContract.sendHelp(to, hre.ethers.utils.parseEther(amount));
    await tx.wait();
    console.log(`Help sent: ${amount} ETH to ${to}`);
  });