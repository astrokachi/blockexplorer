import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./Home";
import Navbar from "./components/Navbar";
import './Home.css'

export default function BlockDetails() {
  const { blockNumber } = useParams();
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlock() {
      setLoading(true);
      try {
        const blockData = await alchemy.core.getBlock(parseInt(blockNumber));
        setBlock(blockData);
      } catch (error) {
        console.error("Error fetching block:", error);
      }
      setLoading(false);
    }

    fetchBlock();
  }, [blockNumber]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="frames">
          <div className="frame">
            <header>Block Details</header>
            <div className="loading" style={{ padding: '2rem', textAlign: 'center' }}>
              Loading block details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!block) {
    return (
      <div>
        <Navbar />
        <div className="frames">
          <div className="frame">
            <header>Block Details</header>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              Block not found
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="frames">
        <div className="frame">
          <header>Block #{block.number}</header>
          <div className="card-details" style={{ gap: '1rem' }}>
            <div className="detail-row">
              <span className="detail-label">Block Number:</span>
              <span className="detail-value">{block.number}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Hash:</span>
              <span className="detail-value card-mono">{block.hash}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Parent Hash:</span>
              <span className="detail-value card-mono">{block.parentHash}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Timestamp:</span>
              <span className="detail-value">{new Date(block.timestamp * 1000).toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Miner:</span>
              <span className="detail-value card-mono">{block.miner}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Gas Used:</span>
              <span className="detail-value">{block.gasUsed?.toString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Gas Limit:</span>
              <span className="detail-value">{block.gasLimit?.toString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Transactions:</span>
              <span className="detail-value">{block.transactions?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}