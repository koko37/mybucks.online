import React, { useContext, useState, useMemo } from "react";
import { Buffer } from "buffer";
import { scrypt } from "scrypt-js";
import { HASH_OPTIONS } from "@mybucks/lib/conf";
import { StoreContext } from "@mybucks/contexts/Store";

import s from "./index.module.css";

const SignIn = () => {
  const [password, setPassword] = useState(
    import.meta.env.DEV ? "ranDommPassword***$%" : ""
  );
  const [salt, setSalt] = useState(import.meta.env.DEV ? "90901210" : "");
  const [disabled, setDisabled] = useState(false);
  const [progress, setProgress] = useState(0);

  const hasError = useMemo(() => !password || !salt, [password, salt]);

  const { setup } = useContext(StoreContext);

  async function onSubmit() {
    setDisabled(true);
    try {
      const passwordBuffer = Buffer.from(password);
      const saltBuffer = Buffer.from(salt);
      const hashBuffer = await scrypt(
        passwordBuffer,
        saltBuffer,
        HASH_OPTIONS.N,
        HASH_OPTIONS.r,
        HASH_OPTIONS.p,
        HASH_OPTIONS.keyLen,
        (p) => setProgress(Math.floor(p * 100))
      );
      const hashHex = Buffer.from(hashBuffer).toString("hex");
      setup(password, salt, hashHex);
    } catch (e) {
      console.error("Error while setting up account ...");
    } finally {
      setDisabled(false);
    }
  }

  return (
    <div className={s.content}>
      <div className={s.help}>
        <h1>mybucks.online</h1>
        <p>crypto wallet, safe and easy to use</p>
        <ul>
          <li>No seed, your password is your account</li>
          <p>
            Your account is generated by your password and hashing functions.
          </p>
          <li>No recover, no reset, no update password</li>
          <p>
            Do not forget your password! There is no way to reset or recover
            your account
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
          This will protect your account for more than centuries from
          brute-force attacks. :) Each account is unique because it is made
          using &nbsp;
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

      <div className={s.form}>
        <div>
          <h2>Open your account</h2>
          <p>Keep your password strong, and secure</p>
        </div>
        <div>
          <label htmlFor="password1">Password 1</label>
          <input
            id="password1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password 1"
            disabled={disabled}
          />
        </div>

        <div>
          <label htmlFor="password2">Password 2</label>
          <input
            id="password2"
            type="password"
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
            placeholder="Password 2"
            disabled={disabled}
          />
        </div>

        <div>
          <ul>
            <li className="disabled">Min length: 12</li>
            <li className="disabled">Uppercase (A~Z)</li>
            <li className="disabled">Lowercase (a~z)</li>
            <li className="disabled">Number (012~9)</li>
            <li className="disabled">Special characters(!@#..)</li>
            <li className="disabled">Don't forget!!!</li>
          </ul>
        </div>

        <div>
          <button onClick={onSubmit} disabled={disabled || hasError}>
            Open
          </button>
        </div>
        {!!progress && <div>progress: {progress}%</div>}
      </div>
    </div>
  );
};

export default SignIn;
