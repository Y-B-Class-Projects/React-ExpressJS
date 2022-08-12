import React from "react";
import {useEffect} from "react";
import './coinsInfo.css'

function CoinsInfo() {
    const [coinsAmount, setCoinsAmount] = React.useState(0);
    const [dollars, setDollars] = React.useState(0);
    const [ils, setIls] = React.useState(0);

    const getIls = () => {
        fetch('/users/getCoinsAmountInIls').then(data => data.json())
            .then(data => setIls(parseFloat(data.msg).toFixed(2)));
    }

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
        getIls();
    }, []);

    return (
        <div>
            <table className='table borderless coins-table'>
                <thead>
                </thead>
                <tbody>
                <tr>
                    <td className="my-td">
                        <div className="input-group-custom1 coins-visual">
                            <div className="coinsData" style={{outline: "1px solid orange"}}>
                                <p className="my-p">{coinsAmount}</p>
                                <span className="dollar-custom1"><img src="logo.png"/></span>
                            </div>
                        </div>
                    </td>
                    <td className="my-td">
                        <div className="input-group-custom1 coins-visual">
                            <div className="coinsData" style={{outline: "1px solid green"}}>
                                <p className="my-p">{dollars}</p>
                                <span className="dollar-custom1"><img src="dollar.jpg"/></span>
                            </div>
                        </div>
                    </td>
                    <td className="my-td">
                        <div className="input-group-custom1 coins-visual">
                            <div className="coinsData" style={{outline: "1px solid gray"}}>
                                <p className="my-p">{ils}</p>
                                <span className="dollar-custom1"><img src="ils.png"/></span>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CoinsInfo;