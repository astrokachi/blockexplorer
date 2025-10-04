import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './Card.css'

export function Card({ block, txn }) {
  const [miner, setMiner] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [txnDetails, setTxnDetails] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (block?.miner) {
      fetchMinerDetails();
    }
  }, [block]);

  useEffect(() => {
    if (expanded && txn && !txnDetails) {
      fetchTransactionDetails();
    }
  }, [expanded, txn]);

  function differenceFromNow() {
    if (!block?.timestamp) return "";
    const now = Math.floor(Date.now() / 1000);
    const difference = now - block.timestamp;

    if (difference < 60) {
      return `${difference} secs ago`;
    }
    return `${Math.floor(difference / 60)} min ago`;
  }

  async function fetchMinerDetails() {
    try {
      setMiner(truncateAddress(block.miner));
    } catch (error) {
      console.error("Error fetching miner:", error);
      setMiner(truncateAddress(block.miner));
    }
  }

  async function fetchTransactionDetails() {
    try {
      // For now, we'll just set basic details
      // In a real app, you'd fetch full transaction details from Alchemy
      setTxnDetails({
        hash: txn,
        status: "Confirmed",
        blockNumber: "Latest",
        from: "0x...",
        to: "0x...",
        value: "0 ETH"
      });
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  }

  function truncateAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  function truncateHash(hash) {
    if (!hash) return "";
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  }

  const handleCardClick = () => {
    if (block) {
      history.push(`/block/${block.number}`);
    } else if (txn) {
      history.push(`/transaction/${txn}`);
    }
  };

  if (block) {
    return (
      <div className={`card ${expanded ? 'card-expanded' : ''}`} onClick={handleCardClick} >
        <div className="card-row">
          <div className="card-left">
            <div className="card-badge">
              {block.number}
            </div>
            <div className="card-time">
              {differenceFromNow()}
            </div>
          </div>


          <div className="card-right">
            <div className="card-info-row">
              <span className="card-label">Miner:</span>
              <span className="card-value card-accent">{miner}</span>
            </div>
            <div className="card-info-row">
              <span className="card-label">Txns:</span>
              <span className="card-value">{block.transactions?.length || 0}</span>
            </div>
          </div>
        </div>

        {
          expanded && (
            <div className="card-expanded-content">
              <div className="card-details">
                <div className="detail-row">
                  <span className="detail-label">Hash:</span>
                  <span className="detail-value">{block.hash}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Parent Hash:</span>
                  <span className="detail-value">{block.parentHash}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Gas Used:</span>
                  <span className="detail-value">{block.gasUsed?.toString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Gas Limit:</span>
                  <span className="detail-value">{block.gasLimit?.toString()}</span>
                </div>
              </div>
            </div>
          )
        }
      </div >
    );
  }

  if (txn) {
    return (
      <div className={`card ${expanded ? 'card-expanded' : ''}`} onClick={handleCardClick} >
        <div className="card-row">
          <div className="card-left">
            <div className="card-badge">
              TX
            </div>
            <div className="card-time">
              Transaction
            </div>
          </div>

          <div className="card-right">
            <div className="card-info-row">
              <span className="card-label">Hash:</span>
              <span className="card-value card-accent card-mono">{truncateHash(txn)}</span>
            </div>
            <div className="card-info-row">
              <span className="card-label">Status:</span>
              <span className="card-value">Pending</span>
            </div>
          </div>
        </div>

        {
          expanded && txnDetails && (
            <div className="card-expanded-content">
              <div className="card-details">
                <div className="detail-row">
                  <span className="detail-label">Full Hash:</span>
                  <span className="detail-value card-mono">{txnDetails.hash}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{txnDetails.status}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">From:</span>
                  <span className="detail-value card-mono">{txnDetails.from}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">To:</span>
                  <span className="detail-value card-mono">{txnDetails.to}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Value:</span>
                  <span className="detail-value">{txnDetails.value}</span>
                </div>
              </div>
            </div>
          )
        }
      </div >
    );
  }

  return null;
}