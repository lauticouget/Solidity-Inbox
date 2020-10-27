const { AssertionError } = require("assert");
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const ganacheProvider = ganache.provider();
const web3 = new Web3(ganacheProvider);
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all ganache test-purpose provided accounts
  // ASYNC REMEMBER
  accounts = await web3.eth.getAccounts();

  // Use onee of those accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["This is the initial message"] })
    .send({ from: accounts[0], gas: 1000000 });
  inbox.setProvider(ganacheProvider)
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, "This is the initial message");
  })
  
  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({from: accounts[0], gas: 1000000});
    const message = await inbox.methods.message().call()
    assert.equal(message, "bye");
  })
});
