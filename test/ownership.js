const mock = require('./mocks');

contract('Ownable Contract', accounts => {

    let campaign;
    let initial = 100;
    before(async () => {
     coin = await mock.deployCoin({initialize: initial});
    });

    it("should have an owner set", async () => {
      // The mock creates the contract from account 0
      let owner = await coin.owner.call();
      assert.equal(owner.valueOf(), accounts[0], "Coins contract should have an owner.");
    });

    it("should allow the tranfer of ownership", async () => {
      // The mock creates the contract from account 0
      await coin.transferOwnership(accounts[1])
      let owner = await coin.owner.call();
      assert.equal(owner.valueOf(), accounts[1], "Coins contract should have a new owner.");
    });

    it("should not allow the tranfer of ownership by some rando person", async () => {
      // The owner is now account 1. Truffle default to account 0 as message sender,
      // but we'll make it explicit anyway
      await mock.expectInvalidOperation(async () => {
           await coin.transferOwnership(accounts[1], {from: accounts[0]});
       });
    });

});
