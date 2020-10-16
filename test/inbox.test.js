const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all ganache test-purpose provided accounts
  // ASYNC REMEMBER
  accounts = await web3.eth.getAccounts();

  // Use onee of those accounts to deploy contract
  inbox = await new web3.eth
    .Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["This is the initial message"] })
    .send({ from: accounts[0], gas: 1000000 });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});
