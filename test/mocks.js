const TutorialCoin = artifacts.require("./TutorialCoin.sol");

var accounts = web3.eth.accounts;

// Recognized options:
//   initialize: If set, initialized the token campaign with this many
//               tokens in accounts[0]

async function deployCoin(options){
    var coin = await TutorialCoin.new();
    options = options || {};
    // initialize will give a certain number of tokens to the owner, for testing.
    if (options['initialize']) coin.mintTokens(options['initialize'], {from: accounts[0]});
    return coin
};

async function expectInvalidOperation(operation){
    try {
        await operation();
        assert.fail('Expected error is not thrown');
    } catch(error) {
        assert.equal(
            error.toString(),
            "Error: VM Exception while processing transaction: invalid opcode",
            "Expected error is not thrown."
        )
    }
}

module.exports = {
    deployCoin: deployCoin,
    expectInvalidOperation: expectInvalidOperation
};
