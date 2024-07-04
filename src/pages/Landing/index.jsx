import React from "react";

import s from "./index.module.css";

const Landing = ({ open }) => (
  <div className="app">
    <div className="flex between">
      <h1>mybucks.online</h1>
      <button onClick={open}>My wallet</button>
    </div>
    <p>crypto wallet, safe and easy to use</p>
    <ul>
      <li>No seed, your password is your account</li>
      <p>Your account is generated by your password and hashing functions.</p>
      <li>No recover, no reset, no update password</li>
      <p>
        Do not forget your password! There is no way to reset or recover your
        account
      </p>
      <li>Multi chains supported</li>
      <li>No custodial, fully decentralized</li>
      <li>No censorship, no admin, no backend API</li>
      <li>No email, no setup, no install</li>
      <li>Open-source, mobile friendly, PWA enabled, listing portfolios</li>
    </ul>

    <h2>Formula: how to generate your account?</h2>
    <p>
      We use&nbsp;
      <a
        href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#scrypt"
        target="_blank"
      >
        <strong>scrypt</strong>
      </a>
      ,&nbsp;
      <a href="https://keccak.team/keccak.html" target="_blank">
        <strong>keccak256</strong>
      </a>
      &nbsp; hash functions to generate your private key and account.
    </p>
    <pre className={s.formula}>
      key = scrypt(password1, password2, N, r, p, keyLen); <br />
      N: 2^15 <br />
      r: 8 <br />
      p: 5 <br />
      keyLen: 64 <br />
      <br />
      privateKey = keccak256(abi.encode(["string"], [key]))
    </pre>
    <p>
      This will protect your account for more than centuries from brute-force
      attacks. :) Each account is unique because it is made using &nbsp;
      <a href="https://en.wikipedia.org/wiki/Pseudorandom_number_generator">
        PRNG
      </a>
      .
      <br /> You can find the codebase &nbsp;
      <a
        href="https://github.com/koko37/mybucks.online/blob/master/src/lib/conf.js"
        target="_blank"
      >
        here
      </a>
      .
    </p>

    <h2>Share password and wallet</h2>
    <p>Transfer all holding assets entirely with ease.</p>
    <pre className={s.formula}>
      <h3>mybucks.online</h3>
      deeBump9025#
      <br />
      beeDump3327&**
      <br />
      <br />
      <a
        href="https://etherscan.io/address/0xBAE1323dC408337Adc155FAD50c677Dfc33f8b80"
        target="_blank"
      >
        See it
      </a>
    </pre>

    <div>
      <a href="https://discord.com" target="_blank">
        Discord
      </a>
      &nbsp;/&nbsp;
      <a href="https://medium.com" target="_blank">
        Medium
      </a>
      &nbsp;/&nbsp;
      <a href="https://github.com/koko37/mybucks.online" target="_blank">
        Github
      </a>
    </div>
  </div>
);

export default Landing;