import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "@mybucks/contexts/Store";
import { NETWORKS } from "@mybucks/lib/conf";
import TokenRow from "@mybucks/components/TokenRow";
import copy from "clipboard-copy";
import { ethers } from "ethers";
import { explorerLinkOfAddress, truncate } from "@mybucks/lib/utils";
import { toast } from "react-toastify";

import RefreshIcon from "@mybucks/assets/refresh.svg";
import ShowIcon from "@mybucks/assets/show.svg";
import HideIcon from "@mybucks/assets/hide.svg";
import CopyIcon from "@mybucks/assets/copy.svg";

const EvmHome = () => {
  const {
    password,
    salt,
    account,
    chainId,
    updateChain,
    reset,
    loading,
    nativeTokenName,
    nativeBalance,
    tokenBalances,
    fetchBalances,
    selectToken,
  } = useContext(StoreContext);
  const [balancesVisible, setBalancesVisible] = useState(false);

  const changeChain = (e) => {
    updateChain(e.target.value);
  };
  const copyAddress = () => {
    copy(account.address);
    toast("Address copied into clipboard.");
  };
  const backupPrivateKey = () => {
    copy(account.signer);
    toast("Private key copied into clipboard.");
  };
  const backupPassword = () => {
    copy(`${password} / ${salt}`);
    toast("Password copied into clipboard.");
  };
  const toggleBalancesVisible = () => {
    setBalancesVisible(!balancesVisible);
  };
  const logout = () => {
    reset();
    copy("");
  };

  return (
    <div>
      <div className="flex">
        <select onChange={changeChain} value={chainId}>
          {Object.values(NETWORKS).map(({ chainId: cId, label }) => (
            <option key={cId} value={cId}>
              {label}
            </option>
          ))}
        </select>
        <button onClick={backupPrivateKey}>Backup private key</button>
        <button onClick={backupPassword}>Backup password</button>
        <button onClick={fetchBalances}>
          <img src={RefreshIcon} />
        </button>
        <button onClick={toggleBalancesVisible} className="img-button">
          <img src={balancesVisible ? HideIcon : ShowIcon} />
        </button>
        <button onClick={logout}>Logout</button>
      </div>

      <h2 className="text-center">
        <a
          href={explorerLinkOfAddress(chainId, account.address)}
          target="_blank"
        >
          {truncate(account.address)}
        </a>
        <button onClick={copyAddress} className="img-button">
          <img src={CopyIcon} />
        </button>
      </h2>

      <h1 className="text-center">
        {loading
          ? "???"
          : !balancesVisible
          ? "---"
          : Number(nativeBalance).toFixed(4)}
        &nbsp;
        {nativeTokenName}
      </h1>

      <div>
        {tokenBalances
          .filter((t) => !!t.nativeToken)
          .concat(tokenBalances.filter((t) => !t.nativeToken))
          .map((t) => (
            <TokenRow
              key={t.contractAddress}
              token={{
                symbol: t.contractTickerSymbol,
                name: t.contractName,
                logoURI: t.logoURI,
                contract: t.contractAddress,
              }}
              balance={ethers.formatUnits(t.balance, t.contractDecimals)}
              balanceVisible={balancesVisible}
              quote={t.quote}
              onClick={() => selectToken(t.contractAddress)}
            />
          ))}
      </div>
    </div>
  );
};

export default EvmHome;
