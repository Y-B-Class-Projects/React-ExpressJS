import Welcome from "./Welcome/Welcome";
import './HomePage.css';
import React from "react";
import {useEffect} from "react";
import Transaction from "./transaction/transaction";

function HomePage() {
    const [coinsAmount, setCoinsAmount] = React.useState(0);
    const [dollars, setDollars] = React.useState(0);

    const getDollars = () => {
        fetch('/users/getCoinsAmountInDollars').then(data => data.json())
            .then(data => setDollars(parseFloat(data.msg).toFixed(2)));
    }

    const getCoinsAmount = () => {
        fetch('/users/getCoinsAmount').then(r => r.json())
            .then(r => setCoinsAmount(parseFloat(r.msg).toFixed(2)));
    }

    useEffect(() => {
        getDollars();
        getCoinsAmount();
    }, []);

    return (
        <div>
            <Welcome />
            <br/>
            <div className="two-divs">
                <h4 className="coins-title">You have </h4>
                <div className="input-group-custom1 coins-visual">
                    <div className="coinsData" style={{outline: "1px solid orange"}}>
                        <p className="my-p">{coinsAmount}</p>
                    </div>
                    <span className="dollar-custom1"><img src="logo.png"/></span>
                </div>
            </div>

            <br/>
            <br/>
            <br/>
            <div className="two-divs">
                <h4 className="coins-title">That equals to</h4>
                <div className="input-group-custom1 coins-visual">
                    <div className="coinsData" style={{outline: "1px solid green"}}>
                        <p className="my-p">{dollars}</p>
                    </div>
                    <span className="dollar-custom1"><img src="dollar.jpg"/></span>
                </div>
            </div>

            <br/>
            <br/>
            <Transaction />
        </div>
    );
}

export default HomePage;