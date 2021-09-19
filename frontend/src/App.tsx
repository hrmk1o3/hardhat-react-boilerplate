import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Symfoni } from "./hardhat/SymfoniContext";
import { Greeter } from './components/Greeter';
import { SendEth } from './components/SendEth';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true} >
          <SendEth />
        </Symfoni>
      </header>
    </div>
  );
}

export default App;
