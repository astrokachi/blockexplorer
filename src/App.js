import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';

import './App.css';
import { Switch, Route } from "react-router-dom"
import Home from './Home';
import AllBlocks from './AllBlocks';
import AllTransactions from './AllTransactions';
import BlockDetails from './BlockDetails';
import TransactionDetails from './TransactionDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blocks" component={AllBlocks} />
        <Route exact path="/transactions" component={AllTransactions} />
        <Route path="/block/:blockNumber" component={BlockDetails} />
        <Route path="/transaction/:txnHash" component={TransactionDetails} />
      </Switch>
    </div>
  )
}

export default App;