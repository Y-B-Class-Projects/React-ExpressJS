import Welcome from "./Welcome/Welcome";
import './HomePage.css';
import React from "react";
import {useEffect} from "react";
import Transaction from "./transaction/transaction";
import CoinsInfo from "./coinsInfo/coinsInfo";

function HomePage() {
    return (
        <div>
            <Welcome />
            <br/>
            <CoinsInfo />
            <Transaction />
        </div>
    );
}

export default HomePage;