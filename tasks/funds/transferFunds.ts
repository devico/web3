import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { Funds } from "../../typechain"

task("transferFunds", "Transfers funds to a foundation receiver")
  .addParam("contract", "The contract's address")
  .addParam("foundation", "The foundation's address")
  .addParam("amount", "The amount to send")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const { contract, foundation, amount } = taskArgs;
    const fundsContract: Funds = <Funds>(
      await hre.ethers.getContractAt("Funds", contract)
    )

    const tx = await fundsContract.transferFundsToReceiver(foundation, hre.ethers.utils.parseEther(amount));
    await tx.wait();
    console.log(`Transferred ${amount} ether to the foundation`);
  });