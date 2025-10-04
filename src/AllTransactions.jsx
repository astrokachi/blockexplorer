import React, { useEffect, useState } from "react";
import { alchemy } from "./Home";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";
import './Home.css'

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      const latestBlock = await alchemy.core.getBlock("latest");
      const recentTransactions = latestBlock.transactions.slice(0, 50);

      setTransactions(recentTransactions);
      setLoading(false);
    }

    fetchTransactions();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="frames">
        <div className="frame">
          <header>All Transactions</header>
          {loading ? (
            <div className="loading" style={{ padding: '2rem', textAlign: 'center' }}>
              Loading transactions...
            </div>
          ) : (
            <>
              {transactions.map((txn, index) => <Card key={index} txn={txn} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}