import React, { useEffect, useState } from "react";
import { alchemy } from "./Home";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";
import './Home.css'

export default function AllBlocks() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlocks() {
      setLoading(true);
      const latestBlockNumber = await alchemy.core.getBlockNumber();

      const blockPromises = [];
      for (let i = 0; i < 50; i++) {
        blockPromises.push(alchemy.core.getBlock(latestBlockNumber - i));
      }

      const recentBlocks = await Promise.all(blockPromises);
      setBlocks(recentBlocks);
      setLoading(false);
    }

    fetchBlocks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="frames">
        <div className="frame">
          <header>All Blocks</header>
          {loading ? (
            <div className="loading" style={{ padding: '2rem', textAlign: 'center' }}>
              Loading blocks...
            </div>
          ) : (
            <>
              {blocks.map(block => <Card key={block.number} block={block} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}