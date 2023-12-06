/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  FailingReceiver,
  FailingReceiverInterface,
} from "../../../contracts/lesson5/FailingReceiver";

const _abi = [
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060f38061001f6000396000f3fe6080604052366041576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401603890609f565b60405180910390fd5b600080fd5b600082825260208201905092915050565b7f4661696c206f6e20707572706f73650000000000000000000000000000000000600082015250565b6000608b600f836046565b91506094826057565b602082019050919050565b6000602082019050818103600083015260b6816080565b905091905056fea2646970667358221220bfc1fa7b185c0207b888331c2a701e74132976e6f40831c37cdc34ff1b4b16ac64736f6c63430008140033";

type FailingReceiverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FailingReceiverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FailingReceiver__factory extends ContractFactory {
  constructor(...args: FailingReceiverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FailingReceiver> {
    return super.deploy(overrides || {}) as Promise<FailingReceiver>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FailingReceiver {
    return super.attach(address) as FailingReceiver;
  }
  override connect(signer: Signer): FailingReceiver__factory {
    return super.connect(signer) as FailingReceiver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FailingReceiverInterface {
    return new utils.Interface(_abi) as FailingReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FailingReceiver {
    return new Contract(address, _abi, signerOrProvider) as FailingReceiver;
  }
}