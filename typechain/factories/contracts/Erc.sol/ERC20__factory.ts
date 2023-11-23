/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { ERC20, ERC20Interface } from "../../../contracts/Erc.sol/ERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620010f7380380620010f783398181016040528101906200003791906200016c565b62000048816200004f60201b60201c565b5062000236565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620000a09190620001cd565b9250508190555080600080828254620000ba9190620001cd565b925050819055503373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000121919062000219565b60405180910390a350565b600080fd5b6000819050919050565b620001468162000131565b81146200015257600080fd5b50565b60008151905062000166816200013b565b92915050565b6000602082840312156200018557620001846200012c565b5b6000620001958482850162000155565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620001da8262000131565b9150620001e78362000131565b92508282019050808211156200020257620002016200019e565b5b92915050565b620002138162000131565b82525050565b600060208201905062000230600083018462000208565b92915050565b610eb180620002466000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806342966c681161008c578063a0712d6811610066578063a0712d68146101ec578063a457c2d714610208578063a9059cbb14610224578063dd62ed3e14610240576100cf565b806342966c681461018257806370a082311461019e57806395d89b41146101ce576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461010e57806323b872dd1461012c578063313ce567146101485780633950935114610166575b600080fd5b6100dc610270565b6040516100e99190610b2f565b60405180910390f35b61010c60048036038101906101079190610bea565b6102ad565b005b610116610397565b6040516101239190610c39565b60405180910390f35b61014660048036038101906101419190610c54565b6103a0565b005b610150610598565b60405161015d9190610cc3565b60405180910390f35b610180600480360381019061017b9190610bea565b6105a1565b005b61019c60048036038101906101979190610cde565b610638565b005b6101b860048036038101906101b39190610d0b565b61070f565b6040516101c59190610c39565b60405180910390f35b6101d6610758565b6040516101e39190610b2f565b60405180910390f35b61020660048036038101906102019190610cde565b610795565b005b610222600480360381019061021d9190610bea565b61086c565b005b61023e60048036038101906102399190610bea565b610903565b005b61025a60048036038101906102559190610d38565b610a18565b6040516102679190610c39565b60405180910390f35b60606040518060400160405280600881526020017f44736e546f6b656e000000000000000000000000000000000000000000000000815250905090565b80600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405161038b9190610c39565b60405180910390a35050565b60008054905090565b8281806103ac8361070f565b10156103ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103e490610dc4565b60405180910390fd5b82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104799190610e13565b9250508190555082600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104cf9190610e13565b9250508190555082600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105259190610e47565b925050819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040516105899190610c39565b60405180910390a35050505050565b60006012905090565b80600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461062d9190610e47565b925050819055505050565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106879190610e13565b925050819055508060008082825461069f9190610e13565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516107049190610c39565b60405180910390a350565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606040518060400160405280600381526020017f44534e0000000000000000000000000000000000000000000000000000000000815250905090565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546107e49190610e47565b92505081905550806000808282546107fc9190610e47565b925050819055503373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516108619190610c39565b60405180910390a350565b80600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108f89190610e13565b925050819055505050565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109529190610e13565b9250508190555080600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109a89190610e47565b925050819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a0c9190610c39565b60405180910390a35050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610ad9578082015181840152602081019050610abe565b60008484015250505050565b6000601f19601f8301169050919050565b6000610b0182610a9f565b610b0b8185610aaa565b9350610b1b818560208601610abb565b610b2481610ae5565b840191505092915050565b60006020820190508181036000830152610b498184610af6565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b8182610b56565b9050919050565b610b9181610b76565b8114610b9c57600080fd5b50565b600081359050610bae81610b88565b92915050565b6000819050919050565b610bc781610bb4565b8114610bd257600080fd5b50565b600081359050610be481610bbe565b92915050565b60008060408385031215610c0157610c00610b51565b5b6000610c0f85828601610b9f565b9250506020610c2085828601610bd5565b9150509250929050565b610c3381610bb4565b82525050565b6000602082019050610c4e6000830184610c2a565b92915050565b600080600060608486031215610c6d57610c6c610b51565b5b6000610c7b86828701610b9f565b9350506020610c8c86828701610b9f565b9250506040610c9d86828701610bd5565b9150509250925092565b600060ff82169050919050565b610cbd81610ca7565b82525050565b6000602082019050610cd86000830184610cb4565b92915050565b600060208284031215610cf457610cf3610b51565b5b6000610d0284828501610bd5565b91505092915050565b600060208284031215610d2157610d20610b51565b5b6000610d2f84828501610b9f565b91505092915050565b60008060408385031215610d4f57610d4e610b51565b5b6000610d5d85828601610b9f565b9250506020610d6e85828601610b9f565b9150509250929050565b7f4e6f7420656e6f75676820746f6b656e732e0000000000000000000000000000600082015250565b6000610dae601283610aaa565b9150610db982610d78565b602082019050919050565b60006020820190508181036000830152610ddd81610da1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610e1e82610bb4565b9150610e2983610bb4565b9250828203905081811115610e4157610e40610de4565b5b92915050565b6000610e5282610bb4565b9150610e5d83610bb4565b9250828201905080821115610e7557610e74610de4565b5b9291505056fea2646970667358221220bc872cdd1da2f7de71d72c9919301b9f8132401ec5735d9da66cc81de4fe8ae264736f6c63430008120033";

type ERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20__factory extends ContractFactory {
  constructor(...args: ERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    initialSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC20> {
    return super.deploy(initialSupply, overrides || {}) as Promise<ERC20>;
  }
  override getDeployTransaction(
    initialSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(initialSupply, overrides || {});
  }
  override attach(address: string): ERC20 {
    return super.attach(address) as ERC20;
  }
  override connect(signer: Signer): ERC20__factory {
    return super.connect(signer) as ERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20Interface {
    return new utils.Interface(_abi) as ERC20Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20 {
    return new Contract(address, _abi, signerOrProvider) as ERC20;
  }
}
