import './transaction.css';
import Title from "../../Title/Title";
import React from 'react';
import {useState} from 'react';

function Transaction(props) {
  const [toEmail, setToEmail] = React.useState('');
  const [amount, setAmount] = React.useState(0);

  const makeTransaction = () => {
    fetch('/users/makeTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: toEmail,
        amount: amount
      })
    }).then(r => r.json()).then(r => {
      alert(r.msg);
    })
  }

  return (
      <div className="container MainCard">
        <Title isNoRefresh={true}>
          <h1>Make transaction</h1>
        </Title>
        <form className="p-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label" >To</label>
            <input className="form-control" onChange={e => setToEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" >Amount</label>
            <input className="form-control" onChange={e => setAmount(e.target.value)}/>
          </div>
          <button onClick={makeTransaction} className="btn btn-warning">Send</button>
        </form>
      </div>
  )
}

export default Transaction;
