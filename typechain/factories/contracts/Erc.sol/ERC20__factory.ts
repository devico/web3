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
    inputs: [],
    name: "InsufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientFundsAllowance",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        internalType: "address",
        name: "account",
        type: "address",
      },
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
        internalType: "address",
        name: "account",
        type: "address",
      },
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
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
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620029f7380380620029f7833981810160405281019062000037919062000533565b620000576200004b620000c460201b60201c565b620000cc60201b60201c565b6200007367bc75809634a8b7f660c01b6200019060201b60201c565b6200008f6763a38d9a7bd0484960c01b6200019060201b60201c565b620000ab67b59852307fbcfbbb60c01b6200019060201b60201c565b620000bd33826200019360201b60201c565b5062000680565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b50565b620001af67da43341289b8a91260c01b6200019060201b60201c565b620001bf6200043960201b60201c565b620001db6754a99050afd56e7160c01b6200019060201b60201c565b620001f7675fb26fb13a61326060c01b6200019060201b60201c565b62000213671848d17d376302ea60c01b6200019060201b60201c565b6200022f67cfe61780811d615960c01b6200019060201b60201c565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620002ce57620002806753d6fa6e765a5e2960c01b6200019060201b60201c565b6200029c67cd12b6e2e49b7fae60c01b6200019060201b60201c565b6040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b620002ea67e3e41acfeb0ce99660c01b6200019060201b60201c565b6200030667d423d2beab8a020060c01b6200019060201b60201c565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825462000357919062000594565b925050819055506200037a67d8d673d1997374a860c01b6200019060201b60201c565b80600160008282546200038e919062000594565b92505081905550620003b167c88a41d75f4e21e660c01b6200019060201b60201c565b620003cd67eb7811f73589916e60c01b6200019060201b60201c565b8173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200042d9190620005e0565b60405180910390a35050565b62000449620000c460201b60201c565b73ffffffffffffffffffffffffffffffffffffffff166200046f620004ca60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff1614620004c8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620004bf906200065e565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080fd5b6000819050919050565b6200050d81620004f8565b81146200051957600080fd5b50565b6000815190506200052d8162000502565b92915050565b6000602082840312156200054c576200054b620004f3565b5b60006200055c848285016200051c565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620005a182620004f8565b9150620005ae83620004f8565b9250828201905080821115620005c957620005c862000565565b5b92915050565b620005da81620004f8565b82525050565b6000602082019050620005f76000830184620005cf565b92915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600062000646602083620005fd565b915062000653826200060e565b602082019050919050565b60006020820190508181036000830152620006798162000637565b9050919050565b61236780620006906000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063715018a611610097578063a457c2d711610066578063a457c2d714610289578063a9059cbb146102a5578063dd62ed3e146102d5578063f2fde38b1461030557610100565b8063715018a6146102275780638da5cb5b1461023157806395d89b411461024f5780639dc29fac1461026d57610100565b8063313ce567116100d3578063313ce567146101a157806339509351146101bf57806340c10f19146101db57806370a08231146101f757610100565b806306fdde0314610105578063095ea7b31461012357806318160ddd1461015357806323b872dd14610171575b600080fd5b61010d610321565b60405161011a9190611eb4565b60405180910390f35b61013d60048036038101906101389190611f6f565b61039a565b60405161014a9190611fca565b60405180910390f35b61015b6105ce565b6040516101689190611ff4565b60405180910390f35b61018b6004803603810190610186919061200f565b610614565b6040516101989190611fca565b60405180910390f35b6101a9610b38565b6040516101b6919061207e565b60405180910390f35b6101d960048036038101906101d49190611f6f565b610b7d565b005b6101f560048036038101906101f09190611f6f565b610e0f565b005b610211600480360381019061020c9190612099565b611046565b60405161021e9190611ff4565b60405180910390f35b61022f6110cb565b005b6102396110df565b60405161024691906120d5565b60405180910390f35b610257611108565b6040516102649190611eb4565b60405180910390f35b61028760048036038101906102829190611f6f565b611181565b005b6102a3600480360381019061029e9190611f6f565b611495565b005b6102bf60048036038101906102ba9190611f6f565b611841565b6040516102cc9190611fca565b60405180910390f35b6102ef60048036038101906102ea91906120f0565b611b91565b6040516102fc9190611ff4565b60405180910390f35b61031f600480360381019061031a9190612099565b611c54565b005b60606103376735ec812dbcc879ec60c01b611cd7565b61034b672b04ccd30c3170a560c01b611cd7565b61035f671af2cc513deb7e8c60c01b611cd7565b6040518060400160405280600881526020017f44736e546f6b656e000000000000000000000000000000000000000000000000815250905090565b60006103b067247a1549b430e76860c01b611cd7565b6103c467d80aaee18c55168460c01b611cd7565b6103d867a8ffab695618f1ed60c01b611cd7565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610466576104206735ff4cac7825558a60c01b611cd7565b610434672117a42402d73e0360c01b611cd7565b6040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61047a679140007814b99d0360c01b611cd7565b61048e67346d824f64081ad560c01b611cd7565b81600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610523676f035d6634e910ac60c01b611cd7565b610537678eca09b15bd20a7c60c01b611cd7565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516105949190611ff4565b60405180910390a36105b06745a058d4cd4791f860c01b611cd7565b6105c4673e5b200e8584381060c01b611cd7565b6001905092915050565b60006105e467a776154636803a3d60c01b611cd7565b6105f86747defd50994f35dd60c01b611cd7565b61060c67544c6be74af0520760c01b611cd7565b600154905090565b600061062a67a068263d993e0b3b60c01b611cd7565b83826106406792a1f2499c7da86c60c01b611cd7565b61065467d73ce37d94ac9deb60c01b611cd7565b61066867c7be44f4c3c2a8d860c01b611cd7565b61067c676805f1f4d1cab08e60c01b611cd7565b8061068683611046565b10156106c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106be9061217c565b60405180910390fd5b6106db673914480c64640e7960c01b611cd7565b6106ef67a0fe4841f56478e860c01b611cd7565b61070367b5c7b30c25d95de760c01b611cd7565b610717678be5edf64ca0a92b60c01b611cd7565b61072b67c2b4bf074eee877660c01b611cd7565b61073f679930f7a9cf92c6ae60c01b611cd7565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036107cd5761078767438a6611d7ec005c60c01b611cd7565b61079b67a4f3a0fdc3e6dda860c01b611cd7565b6040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6107e16740c6c31d666d5b7a60c01b611cd7565b6107f567c42d9f03118e43a160c01b611cd7565b61080967ba8a03f343063e1060c01b611cd7565b83600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156108e7576108a167fa9d5dfb147111e860c01b611cd7565b6108b56773b972835646e07a60c01b611cd7565b6040517f3e334be700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108fb67389070c3b999211860c01b611cd7565b61090f670ba378b584c7826f60c01b611cd7565b83600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461099b91906121cb565b925050819055506109b6677de8d55af192f4a960c01b611cd7565b83600260008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a0591906121cb565b92505081905550610a20676fefaa48e4d335d960c01b611cd7565b83600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a6f91906121ff565b92505081905550610a8a673df4902cf2ad473560c01b611cd7565b610a9e6759cab7f86cc18ead60c01b611cd7565b8473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef86604051610afb9190611ff4565b60405180910390a3610b176758bbe09e92e1ce1960c01b611cd7565b610b2b67642e79be2d797e2260c01b611cd7565b6001925050509392505050565b6000610b4e6769a31b12b75010ae60c01b611cd7565b610b6267b5cc5f440c793a6260c01b611cd7565b610b7667aecfbc6091afac2b60c01b611cd7565b6012905090565b610b91673524a5e69397612b60c01b611cd7565b610ba5672049d7ed4e5c4b8360c01b611cd7565b610bb9674ff289e4558462d260c01b611cd7565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c4757610c0167af0c87b90730057760c01b611cd7565b610c1567f665a2732a0be7ff60c01b611cd7565b6040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c5b67f0ee4e20ee04fd7f60c01b611cd7565b610c6f67ff278776446f419f60c01b611cd7565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610cfb91906121ff565b92505081905550610d1667c0bca5a869ea6d8260c01b611cd7565b610d2a6746115c925f92cb1460c01b611cd7565b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051610e039190611ff4565b60405180910390a35050565b610e2367da43341289b8a91260c01b611cd7565b610e2b611cda565b610e3f6754a99050afd56e7160c01b611cd7565b610e53675fb26fb13a61326060c01b611cd7565b610e67671848d17d376302ea60c01b611cd7565b610e7b67cfe61780811d615960c01b611cd7565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610f0957610ec36753d6fa6e765a5e2960c01b611cd7565b610ed767cd12b6e2e49b7fae60c01b611cd7565b6040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610f1d67e3e41acfeb0ce99660c01b611cd7565b610f3167d423d2beab8a020060c01b611cd7565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f8091906121ff565b92505081905550610f9b67d8d673d1997374a860c01b611cd7565b8060016000828254610fad91906121ff565b92505081905550610fc867c88a41d75f4e21e660c01b611cd7565b610fdc67eb7811f73589916e60c01b611cd7565b8173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161103a9190611ff4565b60405180910390a35050565b600061105c678029311fb5243ed060c01b611cd7565b61107067350cd3681f87cac460c01b611cd7565b61108467ab42463dfbb6160d60c01b611cd7565b600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6110d3611cda565b6110dd6000611d58565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606061111e67584c1cd4a76fc4e860c01b611cd7565b61113267029c9defa0f7edac60c01b611cd7565b6111466753f2ed1b0eac5e6760c01b611cd7565b6040518060400160405280600381526020017f44534e0000000000000000000000000000000000000000000000000000000000815250905090565b61119567763d14e87ee5c12560c01b611cd7565b61119d611cda565b6111b16749080390c991a66460c01b611cd7565b6111c56769b0364654e01f6c60c01b611cd7565b6111d9677bc1c12de03797fd60c01b611cd7565b6111ed677d3db1fdf164c38760c01b611cd7565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361127b5761123567c81514529f76f84460c01b611cd7565b61124967153bcd2460c740f960c01b611cd7565b6040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61128f67eff30cda531ed5d260c01b611cd7565b6112a367e59b4291a62a483360c01b611cd7565b6112b7677d812de11cc5005160c01b611cd7565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156113585761131267f84726646eaf0dff60c01b611cd7565b61132667e60668da1d5619f160c01b611cd7565b6040517f356680b700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61136c67548d2fa8af6e992e60c01b611cd7565b61138067960c1ab636d05d7e60c01b611cd7565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546113cf91906121cb565b925050819055506113ea67402b7b9e4ed201a460c01b611cd7565b80600160008282546113fc91906121cb565b9250508190555061141767baa99ee10af6918960c01b611cd7565b61142b67d3f9b786b624b7df60c01b611cd7565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516114899190611ff4565b60405180910390a35050565b6114a96779f53a34502dcd7960c01b611cd7565b6114bd67fd57d5d595f3c51e60c01b611cd7565b6114d1679db6e02ab5ae261560c01b611cd7565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361155f5761151967b0ccfafcb694241960c01b611cd7565b61152d677c969241ca2e102d60c01b611cd7565b6040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61157367911102e4639da43a60c01b611cd7565b61158767fa66c602a4a9d6b560c01b611cd7565b61159b67aae05f7f7eb7028e60c01b611cd7565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015611679576116336717b4ed4c11fac41b60c01b611cd7565b61164767db729828d109dceb60c01b611cd7565b6040517f3e334be700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61168d67c89735b50a9e0f0460c01b611cd7565b6116a167b1258c8902bc3c0860c01b611cd7565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461172d91906121cb565b9250508190555061174867406f864af21fdc9960c01b611cd7565b61175c67a5e19a6b1a76be8160c01b611cd7565b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040516118359190611ff4565b60405180910390a35050565b600061185767859e462cd668f33460c01b611cd7565b61186b67e0a781ebf330bb9b60c01b611cd7565b61187f673fc521b5d7584f3560c01b611cd7565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361190d576118c76725a1f911624e135760c01b611cd7565b6118db678cd75d185411dc4d60c01b611cd7565b6040517fd92e233d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611921672688a58a5d9e3fbf60c01b611cd7565b61193567a159bf0f6c4957f360c01b611cd7565b61194967f3bf815a131c7c2560c01b611cd7565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211156119ea576119a467235f4d8efaeaf68360c01b611cd7565b6119b8673af3914f718c037d60c01b611cd7565b6040517f356680b700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6119fe67b374a688bd044bca60c01b611cd7565b611a1267549f828c4973b3f460c01b611cd7565b81600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611a6191906121cb565b92505081905550611a7c67d7ce4fa6d668c8bb60c01b611cd7565b81600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611acb91906121ff565b92505081905550611ae667154aef020951b91b60c01b611cd7565b611afa67ab9ac775898498c760c01b611cd7565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051611b579190611ff4565b60405180910390a3611b73674af4af8a464ad7ab60c01b611cd7565b611b8767b4db15fa7b49a75060c01b611cd7565b6001905092915050565b6000611ba7672fa2b3fda3b2d55160c01b611cd7565b611bbb67530d9d0e9a56586760c01b611cd7565b611bcf673373ee593253714760c01b611cd7565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b611c5c611cda565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611ccb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cc2906122a5565b60405180910390fd5b611cd481611d58565b50565b50565b611ce2611e1c565b73ffffffffffffffffffffffffffffffffffffffff16611d006110df565b73ffffffffffffffffffffffffffffffffffffffff1614611d56576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d4d90612311565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600081519050919050565b600082825260208201905092915050565b60005b83811015611e5e578082015181840152602081019050611e43565b60008484015250505050565b6000601f19601f8301169050919050565b6000611e8682611e24565b611e908185611e2f565b9350611ea0818560208601611e40565b611ea981611e6a565b840191505092915050565b60006020820190508181036000830152611ece8184611e7b565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611f0682611edb565b9050919050565b611f1681611efb565b8114611f2157600080fd5b50565b600081359050611f3381611f0d565b92915050565b6000819050919050565b611f4c81611f39565b8114611f5757600080fd5b50565b600081359050611f6981611f43565b92915050565b60008060408385031215611f8657611f85611ed6565b5b6000611f9485828601611f24565b9250506020611fa585828601611f5a565b9150509250929050565b60008115159050919050565b611fc481611faf565b82525050565b6000602082019050611fdf6000830184611fbb565b92915050565b611fee81611f39565b82525050565b60006020820190506120096000830184611fe5565b92915050565b60008060006060848603121561202857612027611ed6565b5b600061203686828701611f24565b935050602061204786828701611f24565b925050604061205886828701611f5a565b9150509250925092565b600060ff82169050919050565b61207881612062565b82525050565b6000602082019050612093600083018461206f565b92915050565b6000602082840312156120af576120ae611ed6565b5b60006120bd84828501611f24565b91505092915050565b6120cf81611efb565b82525050565b60006020820190506120ea60008301846120c6565b92915050565b6000806040838503121561210757612106611ed6565b5b600061211585828601611f24565b925050602061212685828601611f24565b9150509250929050565b7f4e6f7420656e6f75676820746f6b656e732e0000000000000000000000000000600082015250565b6000612166601283611e2f565b915061217182612130565b602082019050919050565b6000602082019050818103600083015261219581612159565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006121d682611f39565b91506121e183611f39565b92508282039050818111156121f9576121f861219c565b5b92915050565b600061220a82611f39565b915061221583611f39565b925082820190508082111561222d5761222c61219c565b5b92915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061228f602683611e2f565b915061229a82612233565b604082019050919050565b600060208201905081810360008301526122be81612282565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006122fb602083611e2f565b9150612306826122c5565b602082019050919050565b6000602082019050818103600083015261232a816122ee565b905091905056fea2646970667358221220042427b48c1808b1fc2b28def8d3d58899f52ac141ca78c80ca4ba41f253f12f64736f6c63430008120033";

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
