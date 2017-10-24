/**
 * Copyright (C) 2017, Mark Conway Wirt
 * Distributed under an MIT-style license. See
 * LICENSE.txt for details.
 */

pragma solidity ^0.4.13;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

/**
 * @title Standard ERC20 Token for Tutorial
 *
 * @dev This is an implementation of an ERC20 compliant token.
 */
contract TutorialCoin is Ownable, StandardToken {
  using SafeMath for uint256;

  // Expected of ERC20
  string public constant name     = "TutorialCoin";
  string public constant symbol   = "TUT";
  uint8  public constant decimals = 18;

  function TutorialCoin () {
  }

  function mintTokens (uint256 _value) onlyOwner {
    balances[msg.sender] = balances[msg.sender].add(_value);
    Transfer(0x0, owner, _value);
    totalSupply = totalSupply + _value;

  }
}
