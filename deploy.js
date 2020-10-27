const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "tourist extra barrel stable depend boat stone need busy solution grape express",
  "https://rinkeby.infura.io/v3/8578c3180ec543099d52f10a44fd1e28"
);
const web3 = new Web3(provider);

(async function() {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const instancedContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["This is the initial message"] })
    .send({ from: accounts[0], gas: 1000000 });

  console.log("Contract deployed to ", instancedContract.options.address);
}());

// const deploy = async () => {
//   const accounts = await Web3.eth.getAccounts();

//   console.log("Attempting to deploy from account", accounts[0]);

//   const instancedContract = await new web3.eth.Contract(JSON.parse(interface))
//     .deploy({ data: bytecode, arguments: ["This is the initial message"] })
//     .sendTransaction({ from: accounts[0] });

//   console.log("Contract deployed to ", instancedContract.options.address);
// }
// deploy();