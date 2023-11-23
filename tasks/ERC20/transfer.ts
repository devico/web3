import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { ERC20 } from "../../typechain"

task("transfer", "Transfers tokens to a specified address")
    .addParam("to", "The address to transfer tokens to")
    .addParam("amount", "The amount of tokens to transfer")
    .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
        const [sender] = await hre.ethers.getSigners();

        const token: ERC20 = <ERC20>(
            await hre.ethers.getContractAt("ERC20", "0xb2371A6b319098B7B150f57040209c91e4943537")
          )
        
        await token.connect(sender).transfer(taskArgs.to, taskArgs.amount);
        
        console.log(`Transferred ${taskArgs.amount} tokens to ${taskArgs.to}`);
    });