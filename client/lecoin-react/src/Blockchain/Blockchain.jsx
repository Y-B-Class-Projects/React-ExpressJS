import React from "react";
import {useEffect} from "react";
import Title from "../Title/Title";
import './Blockchain.css';

function Blockchain() {
    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState(false);
    const [statusColor, setStatusColor] = React.useState("red");

    const getData = () => {
        fetch('/blockchain/data').then(data => data.json()).then(data => setData(data));
    }

    const refreshData = () => {
        getData()
        getStatus()
    }

    const getStatus = () => {
        fetch('/blockchain/status').then(data => data.json())
            .then(data => {
                setStatus(data.msg ? "Valid" : "Invalid");
                setStatusColor(data.msg ? "green" : "red");
            })
    }

    useEffect(() => {
        refreshData();
    }, []);

    const row = (row_data) => {
        return (
            <tr key={row_data.hash}>
                <td>{row_data.date}</td>
                <td>{row_data.hash}</td>
                <td>{row_data.amount}</td>
            </tr>
        )
    }

    const getRows = () => {
        return data.map(row_data => row(row_data));
    }

    const getTable = () => {
        if (data.length === 0) {
            return (
                <div className="m-4">
                    <h3>There are no transactions</h3>
                </div>
            )
        } else {
            return (
                <table className='table borderless'>
                    <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Hash</th>
                        <th scope="col">Amount</th>
                    </tr>
                    </thead>
                    <tbody>{getRows()}</tbody>
                </table>
            );
        }
    }

    return (
        <div>

            <br/>
            <table>
                <tbody className="statusTable">
                <tr>
                    <td><h1>Blockchain status: </h1></td>
                    <td><h1 style={{color: statusColor}}>{status}</h1></td>
                </tr>
                </tbody>
            </table>

            <div className="container MainCard">
                <Title refreshHandler={refreshData}>
                    <h1>Blockchain Data</h1>
                </Title>
                {getTable()}
            </div>
        </div>
    );
}

export default Blockchain;