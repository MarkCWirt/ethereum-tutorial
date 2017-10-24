Creating a Project
==================

In this tutorial we'll be using the ``truffle`` framework for managing the
project we have created. Normally a project is begun with the command::

  truffle init

**Note that this has already been done for this tutorial.**

This will create severl directories and files:

* ``contracts``: The contracts directory is where you will place the
  Solidity code that you write. Truffle itself will populate this directory with
  some sample code::

    vagrant@crypto:$ cd contracts/
    vagrant@crypto:$ ls
    ConvertLib.sol  MetaCoin.sol  Migrations.sol

  If you're creating your own project, you can delete the ``ConvertLib.sol`` and
  ``MetaCoin.sol`` files, but you'll want to keep ``Migrations.sol``, as that
  code is needed for truffle to function correctly.

* ``migrations``: The migrations directory will be auto-populated with two
  files, ``1_initial_migration.js`` and ``2_deploy_contracts.js``.
  ``1_initial_migration.js`` can be used as is.

  You'll need to edit ``2_deploy_contracts.js`` for your own purposes. In this
  tutorial the code we created is called ``TutorialCoin``, so the file
  looks like:

  .. code:: javascript

    var TutorialCoin = artifacts.require("./TutorialCoin.sol");

    module.exports = function(deployer) {
      deployer.deploy(TutorialCoin);
    };

  If your project contains multiple contacts, there would be multiple
  ``deployer.deploy()`` lines, one for each contract.

* ``test``: This is the directory in which the tests are placed.

  In truffle the tests can be written either in Javaccript or Solidity
  (the sample data that truffle pre-populates contains both, ``metacoin.js``
  and ``TestMetacoin.sol``). In this tutorial the tests are written in Javascript.

So, to briefly recapitulate, when you are creating your own projects, you
would begin with something like:

* ``truffle init`` the directory.
* Remove the sample code from ``contracts``, leaving ``Migrations.sol``.
* Create your code in ``contracts``.
* Modify ``2_deploy_contracts.js`` is ``migrations`` to reference the code
  you've developed.
* Remove the pre-populated tests that truffle creates and place your
  tests in the ``test`` directory.

Next
----

* The TutorialCoin `contract <../contract>`__.
