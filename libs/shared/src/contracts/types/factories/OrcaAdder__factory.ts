/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { OrcaAdder, OrcaAdderInterface } from "../OrcaAdder";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pod",
        type: "address",
      },
      {
        internalType: "address",
        name: "_orca",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wavax",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdc",
        type: "address",
      },
      {
        internalType: "address",
        name: "_seafund",
        type: "address",
      },
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "_dev",
        type: "address",
      },
      {
        internalType: "address",
        name: "_orcaLP",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdcLP",
        type: "address",
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
    inputs: [
      {
        internalType: "address",
        name: "bank",
        type: "address",
      },
    ],
    name: "addBank",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lp",
        type: "address",
      },
    ],
    name: "addLPToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "lp",
        type: "address",
      },
    ],
    name: "addSwapLP",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "yak",
        type: "address",
      },
    ],
    name: "addYakStrat",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "allocate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "banks",
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
    inputs: [
      {
        internalType: "address",
        name: "_dev",
        type: "address",
      },
    ],
    name: "changeDev",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_treasuryAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_devAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_seafundAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_podAmount",
        type: "uint256",
      },
    ],
    name: "changeDistributionRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_seafund",
        type: "address",
      },
    ],
    name: "changeSeafund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
    ],
    name: "changeTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "dev",
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
    name: "devAmount",
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
    inputs: [],
    name: "getBankCount",
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
    inputs: [],
    name: "getLPTokens",
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
    inputs: [],
    name: "getTokens",
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
    inputs: [],
    name: "getYakCount",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "lpTokens",
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
    name: "pod",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "podAmount",
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
        name: "bankIndex",
        type: "uint256",
      },
    ],
    name: "removeBank",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "lpIndex",
        type: "uint256",
      },
    ],
    name: "removeLPToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "yakIndex",
        type: "uint256",
      },
    ],
    name: "removeYakStrat",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "lp",
        type: "address",
      },
    ],
    name: "replaceSwapLP",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "seafund",
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
    name: "seafundAmount",
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
        name: "",
        type: "address",
      },
    ],
    name: "swapLPs",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokens",
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
    inputs: [
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferAvax",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bank",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vault",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferBankVault",
    outputs: [],
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
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
    name: "treasuryAmount",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "yakStrats",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620034d8380380620034d8833981016040819052620000349162000480565b6200003f3362000413565b6001600160a01b0389166200009b5760405162461bcd60e51b815260206004820152601a60248201527f506f642063616e6e6f74206265207a65726f206164647265737300000000000060448201526064015b60405180910390fd5b6001600160a01b038816620000f35760405162461bcd60e51b815260206004820152601b60248201527f4f5243412063616e6e6f74206265207a65726f20616464726573730000000000604482015260640162000092565b6001600160a01b0387166200014b5760405162461bcd60e51b815260206004820152601c60248201527f57415641582063616e6e6f74206265207a65726f206164647265737300000000604482015260640162000092565b6001600160a01b038616620001a35760405162461bcd60e51b815260206004820152601b60248201527f555344432063616e6e6f74206265207a65726f20616464726573730000000000604482015260640162000092565b6001600160a01b038516620001fb5760405162461bcd60e51b815260206004820152601e60248201527f53656166756e642063616e6e6f74206265207a65726f20616464726573730000604482015260640162000092565b6001600160a01b038416620002535760405162461bcd60e51b815260206004820152601f60248201527f54726561737572792063616e6e6f74206265207a65726f206164647265737300604482015260640162000092565b6001600160a01b038316620002ab5760405162461bcd60e51b815260206004820152601a60248201527f4465762063616e6e6f74206265207a65726f2061646472657373000000000000604482015260640162000092565b6001600160a01b038216620003035760405162461bcd60e51b815260206004820152601e60248201527f4f524341204c502063616e6e6f74206265207a65726f20616464726573730000604482015260640162000092565b6001600160a01b0381166200035b5760405162461bcd60e51b815260206004820152601e60248201527f55534443204c502063616e6e6f74206265207a65726f20616464726573730000604482015260640162000092565b600180546001600160a01b03199081166001600160a01b039b8c1617909155600280548216998b1699909917909855600380548916978a169790971790965560048054881695891695909517909455600780548716938816939093179092556008805486169187169190911790556009805485169186169190911790556101f4600b556105dc600c55610fa0600a819055600d556005805484169185169190911790556006805490921692169190911790556200053a565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200047b57600080fd5b919050565b60008060008060008060008060006101208a8c0312156200049f578485fd5b620004aa8a62000463565b9850620004ba60208b0162000463565b9750620004ca60408b0162000463565b9650620004da60608b0162000463565b9550620004ea60808b0162000463565b9450620004fa60a08b0162000463565b93506200050a60c08b0162000463565b92506200051a60e08b0162000463565b91506200052b6101008b0162000463565b90509295985092959850929598565b612f8e806200054a6000396000f3fe6080604052600436106102525760003560e01c80638da5cb5b11610138578063bc1080bd116100b0578063eb1dd3041161007f578063f2fde38b11610064578063f2fde38b1461063b578063f5537ede1461065b578063f8d65fdb1461067b57600080fd5b8063eb1dd304146105fb578063ee9761691461061b57600080fd5b8063bc1080bd14610585578063cda3c5af146105a5578063d2aa23e0146105c5578063d9e7a836146105e557600080fd5b8063a88dbb3611610107578063abaa9916116100ec578063abaa991614610530578063b14f2a3914610545578063b214cc031461056557600080fd5b8063a88dbb36146104fb578063aa6ca8081461051b57600080fd5b80638da5cb5b1461047d57806391cca3db1461049b57806393c78673146104bb57806394722397146104db57600080fd5b80633fa68a35116101cb578063715018a61161019a5780637b1ef33b1161017f5780637b1ef33b1461041d57806388a8c95c1461043d578063895065541461045d57600080fd5b8063715018a6146103e857806377db2c17146103fd57600080fd5b80633fa68a35146103725780634f64b2be1461038857806352c84306146103a857806361d027b3146103c857600080fd5b80631bb5e2dc116102225780632e44715d116102075780632e44715d14610327578063368acb091461033c5780633ad3bfa81461035257600080fd5b80631bb5e2dc146102f15780632b3459641461031157600080fd5b806285ae2b1461025e578063042950161461029b5780631224abfb146102bd5780631595eb0b146102dc57600080fd5b3661025957005b600080fd5b34801561026a57600080fd5b5061027e610279366004612d10565b6106b1565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156102a757600080fd5b506102bb6102b6366004612d90565b6106db565b005b3480156102c957600080fd5b506010545b604051908152602001610292565b3480156102e857600080fd5b50600f546102ce565b3480156102fd57600080fd5b5061027e61030c366004612d10565b6107ac565b34801561031d57600080fd5b506102ce600b5481565b34801561033357600080fd5b50600e546102ce565b34801561034857600080fd5b506102ce600a5481565b34801561035e57600080fd5b506102bb61036d366004612d10565b6107bc565b34801561037e57600080fd5b506102ce600c5481565b34801561039457600080fd5b5061027e6103a3366004612d10565b610958565b3480156103b457600080fd5b506102bb6103c3366004612c2a565b610968565b3480156103d457600080fd5b5060085461027e906001600160a01b031681565b3480156103f457600080fd5b506102bb610af8565b34801561040957600080fd5b506102bb610418366004612be3565b610b4c565b34801561042957600080fd5b5061027e610438366004612d10565b610c4c565b34801561044957600080fd5b506102bb610458366004612be3565b610c5c565b34801561046957600080fd5b506102bb610478366004612c2a565b610d1c565b34801561048957600080fd5b506000546001600160a01b031661027e565b3480156104a757600080fd5b5060095461027e906001600160a01b031681565b3480156104c757600080fd5b506102bb6104d6366004612d10565b610e5f565b3480156104e757600080fd5b506102bb6104f6366004612be3565b610fd6565b34801561050757600080fd5b5060015461027e906001600160a01b031681565b34801561052757600080fd5b506011546102ce565b34801561053c57600080fd5b506102bb6110ec565b34801561055157600080fd5b506102bb610560366004612be3565b611c4d565b34801561057157600080fd5b506102bb610580366004612be3565b611d0d565b34801561059157600080fd5b506102bb6105a0366004612d63565b611e0d565b3480156105b157600080fd5b5060075461027e906001600160a01b031681565b3480156105d157600080fd5b506102bb6105e0366004612be3565b611faa565b3480156105f157600080fd5b506102ce600d5481565b34801561060757600080fd5b506102bb610616366004612bff565b61206a565b34801561062757600080fd5b506102bb610636366004612d10565b61215a565b34801561064757600080fd5b506102bb610656366004612be3565b6122d1565b34801561066757600080fd5b506102bb610676366004612c62565b6123a1565b34801561068757600080fd5b5061027e610696366004612be3565b6012602052600090815260409020546001600160a01b031681565b600e81815481106106c157600080fd5b6000918252602090912001546001600160a01b0316905081565b6000546001600160a01b031633146107285760405162461bcd60e51b81526020600482018190526024820152600080516020612f3983398151915260448201526064015b60405180910390fd5b80826107348587612e54565b61073e9190612e54565b6107489190612e54565b612710146107985760405162461bcd60e51b815260206004820152601460248201527f4d7573742061646420757020746f203130303030000000000000000000000000604482015260640161071f565b600a93909355600b91909155600c55600d55565b601081815481106106c157600080fd5b6000546001600160a01b031633146108045760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b600e5481106108555760405162461bcd60e51b815260206004820152601460248201527f496e64657820646f6573206e6f74206578697374000000000000000000000000604482015260640161071f565b805b6001610862600e5490565b61086c9190612eab565b81101561091357600e610880826001612e54565b8154811061089e57634e487b7160e01b600052603260045260246000fd5b600091825260209091200154600e80546001600160a01b0390921691839081106108d857634e487b7160e01b600052603260045260246000fd5b600091825260209091200180546001600160a01b0319166001600160a01b03929092169190911790558061090b81612ef2565b915050610857565b50600e80548061093357634e487b7160e01b600052603160045260246000fd5b600082815260209020810160001990810180546001600160a01b031916905501905550565b601181815481106106c157600080fd5b6000546001600160a01b031633146109b05760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6001600160a01b038216610a2b5760405162461bcd60e51b8152602060048201526024808201527f43616e6e6f7420616464206120746f6b656e2077697468207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161071f565b6001600160a01b038116610a915760405162461bcd60e51b815260206004820152602760248201527f43616e6e6f74206164642061204c5020746f6b656e2077697468207a65726f206044820152666164647265737360c81b606482015260840161071f565b60118054600181019091557f31ecc21a745e3968a04e9570e4425bc18fa8019c68028196b546d1669c200c680180546001600160a01b039384166001600160a01b031991821681179092556000918252601260205260409091208054929093169116179055565b6000546001600160a01b03163314610b405760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b610b4a60006123fd565b565b6000546001600160a01b03163314610b945760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6001600160a01b038116610bfa5760405162461bcd60e51b815260206004820152602760248201527f43616e6e6f742061646420612079616b53747261742077697468207a65726f206044820152666164647265737360c81b606482015260840161071f565b600f80546001810182556000919091527f8d1108e10bcb7c27dddfc02ed9d693a074039d026cf4ea4240b40f7d581ac8020180546001600160a01b0319166001600160a01b0392909216919091179055565b600f81815481106106c157600080fd5b6000546001600160a01b03163314610ca45760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6001600160a01b038116610cfa5760405162461bcd60e51b815260206004820152601a60248201527f4465762063616e6e6f74206265207a65726f2061646472657373000000000000604482015260640161071f565b600980546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b03163314610d645760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6001600160a01b0382811660009081526012602052604090205416610dcb5760405162461bcd60e51b815260206004820152601360248201527f5377617020646f6573206e6f7420657869737400000000000000000000000000604482015260640161071f565b6001600160a01b038116610e315760405162461bcd60e51b815260206004820152602760248201527f43616e6e6f74206164642061204c5020746f6b656e2077697468207a65726f206044820152666164647265737360c81b606482015260840161071f565b6001600160a01b03918216600090815260126020526040902080546001600160a01b03191691909216179055565b6000546001600160a01b03163314610ea75760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6010548110610ef85760405162461bcd60e51b815260206004820152601460248201527f496e64657820646f6573206e6f74206578697374000000000000000000000000604482015260640161071f565b805b6001610f0560105490565b610f0f9190612eab565b811015610fb6576010610f23826001612e54565b81548110610f4157634e487b7160e01b600052603260045260246000fd5b600091825260209091200154601080546001600160a01b039092169183908110610f7b57634e487b7160e01b600052603260045260246000fd5b600091825260209091200180546001600160a01b0319166001600160a01b039290921691909117905580610fae81612ef2565b915050610efa565b50601080548061093357634e487b7160e01b600052603160045260246000fd5b6000546001600160a01b0316331461101e5760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6001600160a01b03811661109a5760405162461bcd60e51b815260206004820152602360248201527f43616e6e6f742061646420612062616e6b2077697468207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161071f565b600e80546001810182556000919091527fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fd0180546001600160a01b0319166001600160a01b0392909216919091179055565b33321461113b5760405162461bcd60e51b815260206004820152601760248201527f4f72636141646465723a206d7573742075736520454f41000000000000000000604482015260640161071f565b60005b600e548110156113bb576000600e828154811061116b57634e487b7160e01b600052603260045260246000fd5b60009182526020822001546040516370a0823160e01b81523060048201526001600160a01b03909116925082906370a082319060240160206040518083038186803b1580156111b957600080fd5b505afa1580156111cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111f19190612d28565b11156113a8576040517f2f745c59000000000000000000000000000000000000000000000000000000008152306004820152600060248201819052906001600160a01b03831690632f745c599060440160206040518083038186803b15801561125957600080fd5b505afa15801561126d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112919190612d28565b6040517fd4a9b2c5000000000000000000000000000000000000000000000000000000008152600481018290529091506000906001600160a01b0384169063d4a9b2c59060240160206040518083038186803b1580156112f057600080fd5b505afa158015611304573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113289190612d28565b6040517f767a7b0500000000000000000000000000000000000000000000000000000000815260048101849052602481018290529091506001600160a01b0384169063767a7b0590604401600060405180830381600087803b15801561138d57600080fd5b505af11580156113a1573d6000803e3d6000fd5b5050505050505b50806113b381612ef2565b91505061113e565b5060005b600f54811015611501576000600f82815481106113ec57634e487b7160e01b600052603260045260246000fd5b60009182526020822001546040516370a0823160e01b81523060048201526001600160a01b03909116925082906370a082319060240160206040518083038186803b15801561143a57600080fd5b505afa15801561144e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114729190612d28565b90506127108111156114ec576040517f2e1a7d4d000000000000000000000000000000000000000000000000000000008152600481018290526001600160a01b03831690632e1a7d4d90602401600060405180830381600087803b1580156114d957600080fd5b505af19250505080156114ea575060015b505b505080806114f990612ef2565b9150506113bf565b5060005b6010548110156116125760006010828154811061153257634e487b7160e01b600052603260045260246000fd5b60009182526020822001546040516370a0823160e01b81523060048201526001600160a01b03909116925082906370a082319060240160206040518083038186803b15801561158057600080fd5b505afa158015611594573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115b89190612d28565b11156115ff576115fc601083815481106115e257634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546001600160a01b031661244d565b50505b508061160a81612ef2565b915050611505565b5060005b60115481101561176f5760006011828154811061164357634e487b7160e01b600052603260045260246000fd5b6000918252602082200154601180546001600160a01b0390921693506012918391908690811061168357634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546001600160a01b039081168452908301939093526040909101902054169050801561175a576040516370a0823160e01b81523060048201526000906001600160a01b038416906370a082319060240160206040518083038186803b1580156116f857600080fd5b505afa15801561170c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117309190612d28565b90506127108111156117585760035461175690829085906001600160a01b0316856125f4565b505b505b5050808061176790612ef2565b915050611616565b50600480546040516370a0823160e01b815230928101929092526000916001600160a01b03909116906370a082319060240160206040518083038186803b1580156117b957600080fd5b505afa1580156117cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117f19190612d28565b111561189a57600480546040516370a0823160e01b81523092810192909252611898916001600160a01b03909116906370a082319060240160206040518083038186803b15801561184157600080fd5b505afa158015611855573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118799190612d28565b6004546003546006546001600160a01b039283169291821691166125f4565b505b600354604080517fd0e30db0000000000000000000000000000000000000000000000000000000008152905147926001600160a01b03169163d0e30db091849160048082019260009290919082900301818588803b1580156118fb57600080fd5b505af115801561190f573d6000803e3d6000fd5b50506003546040516370a0823160e01b8152306004820152600094506001600160a01b0390911692506370a08231915060240160206040518083038186803b15801561195a57600080fd5b505afa15801561196e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119929190612d28565b90506000612710600d54836119a79190612e8c565b6119b19190612e6c565b90506000612710600d546127106119c89190612eab565b6119d29085612e8c565b6119dc9190612e6c565b600354600254600554929350611a039285926001600160a01b0390811692811691166125f4565b50600354600454600654611a299284926001600160a01b039182169290821691166125f4565b506001546002546040516370a0823160e01b8152306004820152611ac1926001600160a01b039081169216906370a082319060240160206040518083038186803b158015611a7657600080fd5b505afa158015611a8a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611aae9190612d28565b6002546001600160a01b03169190612795565b600480546040516370a0823160e01b815230928101929092526000916001600160a01b03909116906370a082319060240160206040518083038186803b158015611b0a57600080fd5b505afa158015611b1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b429190612d28565b600754600d54919250611b91916001600160a01b0390911690611b6790612710612eab565b600c54611b749085612e8c565b611b7e9190612e6c565b6004546001600160a01b03169190612795565b600854600d54611bbe916001600160a01b031690611bb190612710612eab565b600a54611b749085612e8c565b600954600480546040516370a0823160e01b81523092810192909252611c46926001600160a01b03908116929116906370a082319060240160206040518083038186803b158015611c0e57600080fd5b505afa158015611c22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b7e9190612d28565b5050505050565b6000546001600160a01b03163314611c955760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6001600160a01b038116611ceb5760405162461bcd60e51b815260206004820152601f60248201527f54726561737572792063616e6e6f74206265207a65726f206164647265737300604482015260640161071f565b600880546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b03163314611d555760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6001600160a01b038116611dbb5760405162461bcd60e51b815260206004820152602760248201527f43616e6e6f74206164642061204c5020746f6b656e2077697468207a65726f206044820152666164647265737360c81b606482015260840161071f565b601080546001810182556000919091527f1b6847dc741a1b0cd08d278845f9d819d87b734759afb55fe2de5cb82a9ae6720180546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b03163314611e555760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b600e548310611ea65760405162461bcd60e51b815260206004820152601360248201527f42616e6b20646f6573206e6f7420657869737400000000000000000000000000604482015260640161071f565b6001600160a01b038116611efc5760405162461bcd60e51b815260206004820152601f60248201527f43616e6e6f74207472616e7366657220746f207a65726f206164647265737300604482015260640161071f565b600e8381548110611f1d57634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546040517f3e61facd000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b03838116602483015290911690633e61facd90604401600060405180830381600087803b158015611f8d57600080fd5b505af1158015611fa1573d6000803e3d6000fd5b50505050505050565b6000546001600160a01b03163314611ff25760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6001600160a01b0381166120485760405162461bcd60e51b815260206004820152601e60248201527f53656166756e642063616e6e6f74206265207a65726f20616464726573730000604482015260640161071f565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031633146120b25760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6000826001600160a01b03168260405160006040518083038185875af1925050503d80600081146120ff576040519150601f19603f3d011682016040523d82523d6000602084013e612104565b606091505b50509050806121555760405162461bcd60e51b815260206004820152601360248201527f6661696c656420746f2073656e64206176617800000000000000000000000000604482015260640161071f565b505050565b6000546001600160a01b031633146121a25760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b600f5481106121f35760405162461bcd60e51b815260206004820152601460248201527f496e64657820646f6573206e6f74206578697374000000000000000000000000604482015260640161071f565b805b6001612200600f5490565b61220a9190612eab565b8110156122b157600f61221e826001612e54565b8154811061223c57634e487b7160e01b600052603260045260246000fd5b600091825260209091200154600f80546001600160a01b03909216918390811061227657634e487b7160e01b600052603260045260246000fd5b600091825260209091200180546001600160a01b0319166001600160a01b0392909216919091179055806122a981612ef2565b9150506121f5565b50600f80548061093357634e487b7160e01b600052603160045260246000fd5b6000546001600160a01b031633146123195760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6001600160a01b0381166123955760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161071f565b61239e816123fd565b50565b6000546001600160a01b031633146123e95760405162461bcd60e51b81526020600482018190526024820152600080516020612f39833981519152604482015260640161071f565b6121556001600160a01b0383168483612795565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080826001600160a01b0381166124cd5760405162461bcd60e51b815260206004820152602260248201527f496e76616c6964207061697220666f722072656d6f76696e676c69717569646960448201527f7479000000000000000000000000000000000000000000000000000000000000606482015260840161071f565b6040516370a0823160e01b815230600482015261255190859081906001600160a01b038516906370a082319060240160206040518083038186803b15801561251457600080fd5b505afa158015612528573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061254c9190612d28565b6127fc565b6040517f89afcb4400000000000000000000000000000000000000000000000000000000815230600482015260009081906001600160a01b038416906389afcb44906024016040805180830381600087803b1580156125af57600080fd5b505af11580156125c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125e79190612d40565b9097909650945050505050565b60008061260185856128ca565b509050600080846001600160a01b0316630902f1ac6040518163ffffffff1660e01b815260040160606040518083038186803b15801561264057600080fd5b505afa158015612654573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126789190612cc2565b5091509150866001600160a01b0316836001600160a01b03161461269857905b6000806126c68a856dffffffffffffffffffffffffffff16856dffffffffffffffffffffffffffff166128fb565b9050886001600160a01b0316856001600160a01b0316146126e357905b6126ee89888c6127fc565b604080516000815260208101918290527f022c0d9f000000000000000000000000000000000000000000000000000000009091526001600160a01b0388169063022c0d9f906127469085908590309060248101612e1c565b600060405180830381600087803b15801561276057600080fd5b505af1158015612774573d6000803e3d6000fd5b505050508181116127855781612787565b805b9a9950505050505050505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1663a9059cbb60e01b17905261215590849061294c565b60405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284169063a9059cbb90604401602060405180830381600087803b15801561284657600080fd5b505af115801561285a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061287e9190612ca2565b6121555760405162461bcd60e51b815260206004820181905260248201527f4465784c6962726172793a3a5452414e534645525f46524f4d5f4641494c4544604482015260640161071f565b600080826001600160a01b0316846001600160a01b0316106128ed5782846128f0565b83835b915091509250929050565b60008061290a856103e5612e8c565b905060006129188483612e8c565b9050600082612929876103e8612e8c565b6129339190612e54565b905061293f8183612e6c565b93505050505b9392505050565b60006129a1826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316612a319092919063ffffffff16565b80519091501561215557808060200190518101906129bf9190612ca2565b6121555760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161071f565b6060612a408484600085612a48565b949350505050565b606082471015612ac05760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161071f565b843b612b0e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161071f565b600080866001600160a01b03168587604051612b2a9190612ded565b60006040518083038185875af1925050503d8060008114612b67576040519150601f19603f3d011682016040523d82523d6000602084013e612b6c565b606091505b5091509150612b7c828286612b87565b979650505050505050565b60608315612b96575081612945565b825115612ba65782518084602001fd5b8160405162461bcd60e51b815260040161071f9190612e09565b80516dffffffffffffffffffffffffffff81168114612bde57600080fd5b919050565b600060208284031215612bf4578081fd5b813561294581612f23565b60008060408385031215612c11578081fd5b8235612c1c81612f23565b946020939093013593505050565b60008060408385031215612c3c578182fd5b8235612c4781612f23565b91506020830135612c5781612f23565b809150509250929050565b600080600060608486031215612c76578081fd5b8335612c8181612f23565b92506020840135612c9181612f23565b929592945050506040919091013590565b600060208284031215612cb3578081fd5b81518015158114612945578182fd5b600080600060608486031215612cd6578283fd5b612cdf84612bc0565b9250612ced60208501612bc0565b9150604084015163ffffffff81168114612d05578182fd5b809150509250925092565b600060208284031215612d21578081fd5b5035919050565b600060208284031215612d39578081fd5b5051919050565b60008060408385031215612d52578182fd5b505080516020909101519092909150565b600080600060608486031215612d77578283fd5b83359250602084013591506040840135612d0581612f23565b60008060008060808587031215612da5578081fd5b5050823594602084013594506040840135936060013592509050565b60008151808452612dd9816020860160208601612ec2565b601f01601f19169290920160200192915050565b60008251612dff818460208701612ec2565b9190910192915050565b6020815260006129456020830184612dc1565b8481528360208201526001600160a01b0383166040820152608060608201526000612e4a6080830184612dc1565b9695505050505050565b60008219821115612e6757612e67612f0d565b500190565b600082612e8757634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615612ea657612ea6612f0d565b500290565b600082821015612ebd57612ebd612f0d565b500390565b60005b83811015612edd578181015183820152602001612ec5565b83811115612eec576000848401525b50505050565b6000600019821415612f0657612f06612f0d565b5060010190565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b038116811461239e57600080fdfe4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a26469706673582212207f10fdcf50cc19bc88564565427b3d5f8af1b92748d2ac4217d71b015836237f64736f6c63430008040033";

export class OrcaAdder__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _pod: string,
    _orca: string,
    _wavax: string,
    _usdc: string,
    _seafund: string,
    _treasury: string,
    _dev: string,
    _orcaLP: string,
    _usdcLP: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<OrcaAdder> {
    return super.deploy(
      _pod,
      _orca,
      _wavax,
      _usdc,
      _seafund,
      _treasury,
      _dev,
      _orcaLP,
      _usdcLP,
      overrides || {}
    ) as Promise<OrcaAdder>;
  }
  getDeployTransaction(
    _pod: string,
    _orca: string,
    _wavax: string,
    _usdc: string,
    _seafund: string,
    _treasury: string,
    _dev: string,
    _orcaLP: string,
    _usdcLP: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _pod,
      _orca,
      _wavax,
      _usdc,
      _seafund,
      _treasury,
      _dev,
      _orcaLP,
      _usdcLP,
      overrides || {}
    );
  }
  attach(address: string): OrcaAdder {
    return super.attach(address) as OrcaAdder;
  }
  connect(signer: Signer): OrcaAdder__factory {
    return super.connect(signer) as OrcaAdder__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrcaAdderInterface {
    return new utils.Interface(_abi) as OrcaAdderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OrcaAdder {
    return new Contract(address, _abi, signerOrProvider) as OrcaAdder;
  }
}
