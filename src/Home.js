import { Alchemy, Network } from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import './Home.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
}

export const alchemy = new Alchemy(settings);

export default function Home() {
  const [blocks, setBlocks] = useState([])
  const [latestTxn, setLatestTxn] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlocks() {
      setLoading(true);
      const latestBlockNumber = await alchemy.core.getBlockNumber();

      const blockPromises = [];
      for (let i = 0; i < 10; i++) {
        blockPromises.push(alchemy.core.getBlock(latestBlockNumber - i));
      }

      const recentBlocks = await Promise.all(blockPromises);

      setBlocks(recentBlocks);
      setLatestTxn(recentBlocks[0].transactions.filter((el, i) => i < 10))
      setLoading(false);
    }

    fetchBlocks();
  }, []);

  return (
    <div className="">
      <Navbar />

      <div className="frames">
        <div className="frame">
          <header>Latest Blocks</header>
          {loading ? (
            <div className="loading" style={{ padding: '2rem', textAlign: 'center' }}>
              Loading blocks...
            </div>
          ) : (
            <>
              {blocks.map(block => <Card key={block.number} block={block} />)}
              <Link to="/blocks" className="view-all-button">
                View All Blocks
              </Link>
            </>
          )}
        </div>

        <div className="frame">
          <header>Latest Transactions</header>
          {loading ? (
            <div className="loading" style={{ padding: '2rem', textAlign: 'center' }}>
              Loading transactions...
            </div>
          ) : (
            <>
              {latestTxn.map((txn, index) => <Card key={index} txn={txn} />)}
              <Link to="/transactions" className="view-all-button">
                View All Transactions
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}