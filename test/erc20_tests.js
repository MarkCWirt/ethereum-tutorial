const mock = require('./mocks');

contract('TutorialCoin Contract', accounts => {

    let campaign;
    let initial = 100;
    before(async () => {
     coin = await mock.deployCoin({initialize: initial});
    });

    it("should allow the owner to mint coins", async () => {
      // The minting happened in the deployCoin mock, so this is a little perfunctory.
      let ownersCoins = await coin.balanceOf.call(accounts[0]);
      assert.equal(ownersCoins.valueOf(), initial, "Coins should be mintable by owner.");
    });

    it("should not allow random people to mint coins", async () => {
      await mock.expectInvalidOperation(async () => {
           await coin.mintTokens(100, {from: accounts[1]})
      });
    });

    it("should allow the owner of a coin to transfer ownership", async () => {

      let coinsToTransfer = 50;

      await coin.transfer(accounts[1], coinsToTransfer, {from: accounts[0]});

      let ownersCoins = await coin.balanceOf.call(accounts[0]);
      let giftedCoins = await coin.balanceOf.call(accounts[1]);
      assert.equal(ownersCoins.valueOf(), 50, "Coins balance shoud be reduced appropriately on transfer");
      assert.equal(giftedCoins.valueOf(), 50, "Coins balance shoud be increased appropriately on transfer");
    });

    it("should not allow a user to transfer more coins than they have", async () => {

      // Account 0 now has 50 coins.

      let coinsToTransfer = 50;

      await coin.transfer(accounts[1], coinsToTransfer, {from: accounts[0]});
      let ownersCoins = await coin.balanceOf.call(accounts[0]);

      assert.equal(ownersCoins.valueOf(), 0, "Coins should be mintable by owner.");

      // If we do it again it should fail.

      await mock.expectInvalidOperation(async () => {
           await coin.transfer(accounts[1], coinsToTransfer, {from: accounts[0]});
       });
    });

    it("should allow third-party transfers", async () => {

      // Account 1 now has 100 coins. We will allow account 0 to transfer 50 of them,
      // but to make matters more interesting we'll do it in two transfers.

      let coinsToTransfer = 25;
      let approvalLimit   = 50;

      await coin.approve(accounts[0], approvalLimit, {from: accounts[1]});

      let allowance = await coin.allowance(accounts[1], accounts[0]);
      assert.equal(allowance.valueOf(), approvalLimit, "Allowance should correspond to approval limit");
      await coin.transferFrom(accounts[1], accounts[2], coinsToTransfer, {from: accounts[0]});
      let giftedCoins = await coin.balanceOf.call(accounts[2]);
      assert.equal(giftedCoins.valueOf(), coinsToTransfer, "Coins balance shoud be increased appropriately on third-party transfer");

      // It should fail if someone who is not approved attempt the transfer.

      await mock.expectInvalidOperation(async () => {
           await coin.transferFrom(accounts[1], accounts[2], coinsToTransfer, {from: accounts[4]});
       });

       // Still have 25 left in our limit.

       allowance = await coin.allowance(accounts[1], accounts[0]);
       assert.equal(allowance.valueOf(), coinsToTransfer, "Allowance should correspond to approval limit decremented by transfers");

       // Let's transfer them.

       coin.transferFrom(accounts[1], accounts[3], coinsToTransfer, {from: accounts[0]});
       giftedCoins = await coin.balanceOf.call(accounts[3]);
       assert.equal(giftedCoins.valueOf(), coinsToTransfer, "Coins balance shoud be increased appropriately on third-party transfer");

       // Account 1 should now have 50 coins.

       let payersCoins = await coin.balanceOf.call(accounts[1]);
       assert.equal(payersCoins.valueOf(), 50, "Coins balance shoud be appropriately set for payer in third-party transfer");

       // Account 1 should have a zero allowance now.

       allowance = await coin.allowance(accounts[1], accounts[0]);
       assert.equal(allowance.valueOf(), 0, "Allowance should correspond to approval limit decremented");

       // So trying it again should fail
       await mock.expectInvalidOperation(async () => {
            await coin.transferFrom(accounts[1], accounts[2], coinsToTransfer, {from: accounts[0]});
       });

    });

    it("should conserve coins", async () => {
      // 100 coins were minted, so

      let totalSupply = await coin.totalSupply.call();
      assert.equal(totalSupply.valueOf(), 100, "Coin number should be conserved");

      let bal0 = await coin.balanceOf.call(accounts[0]);
      let bal1 = await coin.balanceOf.call(accounts[1]);
      let bal2 = await coin.balanceOf.call(accounts[2]);
      let bal3 = await coin.balanceOf.call(accounts[3]);
      let bal4 = await coin.balanceOf.call(accounts[4]);
      let totalCoins = bal0.toNumber() + bal1.toNumber() + bal2.toNumber() + bal3.toNumber() + bal4.toNumber();

      assert.equal(totalCoins, 100, "Balances should total total");

    });

});
