import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Head from 'next/head';
import Link from 'next/link';

import { Account } from '@ursa/components/account';
import { Balance } from '@ursa/components/balance';
import { useEagerConnect, usePersonalSign } from '@ursa/hooks';
import { Greeter__factory } from '@ursa/shared/contracts';
import { Contract } from 'ethers';

const greeter_address = '0x5FB7a460e0e3561570FeC87B6527e1264530e01c';

export default function Home() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState<string>();
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === 'string' && !!library;

  const fetchGreeting = async () => {
    if (isConnected) {
      const signer = library.getSigner(account).connectUnchecked();
      const greeter = Greeter__factory.connect(greeter_address, signer);
      try {
        const data = await greeter.greet();
        console.log('data: ', data);
      } catch (err) {
        console.log('Error: ', err);
      }
    }
  };
  const setGreeting = async () => {
    if (!greeting) return;
    if (isConnected) {
      const signer = library.getSigner(account).connectUnchecked();
      const greeter = Greeter__factory.connect(greeter_address, signer);
      const transaction = await greeter.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  };

  return (
    <div>
      <Head>
        <title>Next Web3 Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>Next Web3 Boilerplate</a>
          </Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          Welcome to{' '}
          <a href="https://github.com/mirshko/next-web3-boilerplate">
            Next Web3 Boilerplate
          </a>
        </h1>

        {isConnected && (
          <section>
            <Balance />
          </section>
        )}
      </main>
      {isConnected && (
        <div className="App">
          <header className="App-header">
            <button onClick={fetchGreeting}>Fetch Greeting</button>
            <button onClick={setGreeting}>Set Greeting</button>
            <input
              onChange={(e) => setGreetingValue(e.target.value)}
              placeholder="Set greeting"
            />
          </header>
        </div>
      )}

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
        }

        html {
          font-family: sans-serif, Apple Color Emoji, Segoe UI Emoji,
            Segoe UI Symbol, Noto Color Emoji;
          line-height: 1.5;
        }

        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
