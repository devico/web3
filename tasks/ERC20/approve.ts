import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { ERC20 } from "../../typechain"

task("approve", "Approves a spender to spend a certain amount of tokens")
    .addParam("spender", "The address of the spender")
    .addParam("amount", "The amount of tokens to approve")
    .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
        const [owner] = await hre.ethers.getSigners();

        const token: ERC20 = <ERC20>(
          await hre.ethers.getContractAt("ERC20", "0xb2371A6b319098B7B150f57040209c91e4943537")
        )

        await token.connect(owner).approve(taskArgs.spender, taskArgs.amount);
        
        console.log(`Approved ${taskArgs.spender} to spend ${taskArgs.amount} tokens`);
    });