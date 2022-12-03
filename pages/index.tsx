import { ConnectWallet, useContract, useAddress, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import { useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const { contract, isLoading, error } = useContract("0xcA736CAFF84FbeCF3B94FbFDEC2F5F7CD15Daa94");
  const { data: getAmountOfTokens } = useContractRead(contract, "getAmountOfTokens");
  const address = useAddress();

  // @dev is it swapping to ETH?
  const [isToEth, setToEth] = useState(false);
  const [balance, setBalance] = useState(0);
  const [converted, setConverted] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    
  }, [isToEth]);

  /*
   * @dev get conversion value 
   */
  const fetch = (amount: number) => {
    setConverted(111);
  };

  const updateAmount = () => {
    if (!inputRef.current) return;

    setInputAmount(parseFloat(inputRef.current.value));
  };

  return (
    <main className={styles.swapContainer}>
      <div>
        <header className={styles.maxWidth}>
          <h1>thirdweb Swap</h1>
        </header>
        
        {/* from */}
        <div>
          <div className={`${styles.maxWidth} ${styles.flexRow}`}>
            <span>From</span>
            <span>Balance:</span>
          </div>
          <div className={`${styles.maxWidth} ${styles.flexRow}`}>
            <input ref={inputRef} onChange={updateAmount} type="text" placeholder="Amount" />
            <span>ETH</span>
          </div>
        </div>

        <button onClick={() => fetch(inputAmount)}>V</button>

        {/* to */}
        <div>
          <div className={`${styles.maxWidth} ${styles.flexRow}`}>
            <span>To</span>
          </div>
          <div className={`${styles.maxWidth} ${styles.flexRow}`}>
            <input type="text" placeholder="Amount" value={converted} />
            <span>Tokens</span>
          </div>
        </div>

        {/* initiate swap */}
        <ConnectWallet />
        {address &&
          <button>Confirm</button>
        }
      </div>
    </main>
  );
};

export default Home;


// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.7;
//
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//
// contract DEX is ERC20 {
//     
//     address public token;
//     address immutable owner;
//
//     constructor (address _token) ERC20(name(), symbol()) {}
//
//     function getTokensInContract() public view returns (uint256) {}
//
//     function addLiquidity(uint256 _amount) public payable returns (uint256) {}
//
//     function removeLiquidity(uint256 _amount) public returns (uint256, uint256) {}
//
//     function getAmountOfTokens(
//         uint256 inputAmount,
//         uint256 inputReserve,
//         uint256 outputReserve
//     ) public pure returns (uint256) {}
//
//     function swapEthTotoken(uint256 _tokensSold, uint256 _minEth) public {}
//
//     function swapTokenToEth(uint256 _tokensSold, uint256 _minEth) public {}
// }
