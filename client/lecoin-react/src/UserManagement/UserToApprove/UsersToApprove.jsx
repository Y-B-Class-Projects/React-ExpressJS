import './UserToApprove.css'
import {useState} from "react";
import {useEffect} from "react";
import Title from "../../Title/Title";

function UserRow(props) {
    const [amount, setAmount] = useState(0);

    return (
        <tr>
            <td className="align-middle">{props.username}</td>
            <td className="align-middle">{props.email}</td>
            <td className="align-middle my-cell">
                <div className="input-group-custom">
                    <input type="number" className="form-control rounded-pill input-custom" onChange={e => setAmount(e.target.value)}/>
                    <span className="input-group-text rounded-pill dollar-custom">$</span>
                </div>
            </td>
            <td className="align-middle">
                <button className="btn rounded-pill me-3 btn-success" onClick={() => props.handleApprove(props.email, amount)}>Yes</button>
                <button className="btn rounded-pill btn-danger" onClick={() => props.handleDelete(props.email)}>No</button>
            </td>
        </tr>
    );
}


function UsersToApprove() {
    const [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {
        refreshData();
    }, []);

    const getRows = () => {
        return data.map(row_data => <UserRow handleDelete={handleDelete} handleApprove={handleApprove} key={row_data.email}
                                            username={row_data.username} email={row_data.email}/>);
    }

    const getData = () => {
        if (data.length === 0) {
            return (
                <div className="m-4">
                    <h3>There are no users waiting for approval</h3>
                </div>
            )
        }
        else{
            return (
                <table className='table borderless'>
                    <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Amount ($)</th>
                        <th scope="col">Approve?</th>
                    </tr>
                    </thead>
                    <tbody>{getRows()}</tbody>
                </table>
            );
        }
    }

    const handleDelete = email => {
        fetch('/users/deleteUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        }).then(() => refreshData())
    }

    const refreshData = () => {
        fetch('/users/notApprovedUsers').then(data => data.json()).then(data => setData(data));
    }
    
    const handleApprove = (email, amount) => {
        fetch('/users/userApprove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, amount: amount})
        }).then(data => data.json())
            .then(data => console.log(data));

        refreshData();
    }


    return (
        <div className="container MainCard">
            <Title refreshHandler={refreshData}>
                <h1>Waiting List</h1>
            </Title>
            {getData()}
        </div>
    );
}

export default UsersToApprove;