var TutorialCoin = artifacts.require("./TutorialCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(TutorialCoin);
};
