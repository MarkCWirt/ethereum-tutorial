An Ethereum Development Tutorial
================================

This repository is a short tutorial on smart contract development on the
`Ethereum block chain <https://ethereum.org/>`__. It is not intended to teach
the `solidity programming  language <https://solidity.readthedocs.io/en/develop/>`__
(which is the *de facto* standard for developing smart contracts); moreover, it is
intended to show you how to create
a development environment incorporating what are becoming best-of-breed components
in the ethereum ecosystem. As such it's a snapshot in time: the domain is growing,
changing, and developing quickly. What functions today as the best choices
for a development environment may become obsolete in the future, and what I've
included here is just my own opinion. Regardless, if you're interested in
ethereum development, what I've outlined here is at least reasonable.

To use the tutorial you'll want to clone this repository to your computer, but
you'll probably want to read the text on GitHub proper, as it should render and
display all the elements of the text in a reasonable way. I've made every attempt
to keep the instructions as generic as possible, but I'm currently on Linux
platforms (and occasionally MacOS),
so I don't have specific information about Windows platforms, and there could be
minor differences in the operation of the component software.

Before you Begin
----------------

Before we begin the tutorial proper, you'll want to ensure you have some requisite
software installed.

Node.js and NPM
...............

The solidity development environment is largely ECMAScript- based, so you'll want to
have a recent version of `Node.js <https://nodejs.org/en/>`__ installed, along with
a recent version of the node package manager. This is important: some of the
package dependencies will not install properly with older versions. So, if you're
using an operating system that tends to be a little "stale" (like Ubuntu LTS),
you'll probably want to install more recent versions than those that are provided
by your OS's standard repository. This tutorial was created with v8.7.0, which
at the time of writing was the most recent version available. Likewise the ``npm``
used was 5.5.1, which is very current.

(If, in running the tests in the tutorial, you receive an error message about a
missing ``bignum``, chances are you have an older ``npm``. You should delete
your ``node_modules`` directory, upgrade npm, and reinstall the javascript
dependencies.)

Note that when you install the javascript dependencies for this project some
C extensions will need to be built, so you will need to have a valid
build environment. This includes a working C compiler, of course, but it also
includes some cryptographic libraries. Unfortunately those kinds of
dependencies are not managed by ``npm``, so if you run into issues you may
have to a little sleuthing. I'm currently sitting at an Ubuntu 16.04 LTS VM
which is working, and the installed cryptographic libraries include:

.. code::

  i A libcryptopp-dev                 - General purpose cryptographic library - C+
  i   libcryptsetup4                  - disk encryption support - shared library
  i   libgcrypt20                     - LGPL Crypto library - runtime library
  i A libhcrypto4-heimdal             - Heimdal Kerberos - crypto library
  i A libk5crypto3                    - MIT Kerberos runtime libraries - Crypto Li
  i A libssh-gcrypt-4                 - tiny C SSH library (gcrypt flavor)
  i   libgnutls-openssl27             - GNU TLS library - OpenSSL wrapper
  i   libssl-dev                      - Secure Sockets Layer toolkit - development
  i   libssl1.0.0                     - Secure Sockets Layer toolkit - shared libr
  i   openssl                         - Secure Sockets Layer toolkit - cryptograph

If you run into problems, you may want to examine your libraries and add some of the
above.

Parity
......

I have found the `parity client <https://parity.io/>`__ to me the most reliable
right now. It can run natively under MacOS (installable with ``homebrew``) and
Linux. It can also be run in a ``docker`` container, if you prefer working that
way.

------

The above is really all you need. But there are a few more dependencies that you can
install that will be useful for publishing any code you develop to the block
chain.

The Solidity Compiler
.....................

A command-line compiler, ``solcjs``, will be installed when you install the
node dependencies. However, there is also a binary/compiled version of the
compiler, ``solc``, which you can `install
<http://solidity.readthedocs.io/en/develop/installing-solidity.html>`__. The
``solc`` compiler works with a code flattener (below), which you can
use to publish byte-verified source code to go with your smart contracts.

The Solidity Flattener
......................

There is an open-source `flattener <https://github.com/BlockCatIO/solidity-flattener>`__
that you can use to combine all of your source files into a single file. This file
can be submitted to `ethscan.io <https://ethscan.io>`__ (and perhaps other
places) so that people can read the source associated with the smart contracts
you deploy.

Next Steps
----------

* Installing the Software
