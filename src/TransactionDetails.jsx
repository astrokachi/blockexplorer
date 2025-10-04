import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./Home";
import { ethers } from 'ethers';
import Navbar from "./components/Navbar";
import './Home.css'

export default function TransactionDetails() {
  const { txnHash } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchTransaction() {
      setLoading(true);
      try {
        const txnData = await alchemy.core.getTransaction(txnHash);
        setTransaction(txnData);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
      setLoading(false);
    }

    fetchTransaction();
  }, [txnHash]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="frames">
          <div className="frame">
            <header>Transaction Details</header>
            <div className="loading" style={{ padding: '2rem', textAlign: 'center' }}>
              Loading transaction details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div>
        <Navbar />
        <div className="frames">
          <div className="frame">
            <header>Transaction Details</header>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              Transaction not found
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
          <header>Transaction Details</header>
          <div className="card-details" style={{ gap: '1rem' }}>
            <div className="detail-row">
              <span className="detail-label">Transaction Hash:</span>
              <span className="detail-value card-mono">{transaction.hash}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">From:</span>
              <span className="detail-value card-mono">{transaction.from}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">To:</span>
              <span className="detail-value card-mono">{transaction.to || 'Contract Creation'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Value:</span>
              <span className="detail-value">{transaction.value ? ethers.formatEther(transaction.value.toString()) + ' ETH' : '0 ETH'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Gas Price:</span>
              <span className="detail-value">{transaction.gasPrice ? ethers.formatUnits(transaction.gasPrice.toString(), 'gwei') + ' Gwei' : 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Gas Limit:</span>
              <span className="detail-value">{transaction.gasLimit?.toString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Nonce:</span>
              <span className="detail-value">{transaction.nonce}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}