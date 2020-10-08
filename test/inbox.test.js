const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

beforeEach(() => {
    // Get a list of all ganache test-purpose provided accounts
    // ASYNC REMEMBER
    web3.eth.getAccounts()
    .then(fetchedAccounts => {
        console.log(fetchedAccounts);
    });

    // Use onee of those accounts to deploy contract

});

describe('Inbox', () => {
    it('deploys a contract', () => {});
});