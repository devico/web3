import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { Funds } from "../../typechain"

task("createFoundation", "Creates a new foundation")
  .addParam("contract", "The contract's address")
  .addParam("receiver", "The donation receiver's address")
  .addParam("description", "Description of the foundation")
  .addParam("value", "Amount of ether to send", "0")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const { contract, receiver, description, value } = taskArgs;
    const fundsContract: Funds = <Funds>(
      await hre.ethers.getContractAt("Funds", contract)
    )

    const tx = await fundsContract.createFoundation(receiver, description, { value: hre.ethers.utils.parseEther(value) });
    await tx.wait();
    console.log("Foundation created");
  });
