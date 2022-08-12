import Title from "../../Title/Title";
import {useEffect} from "react";
import {useState} from "react";

function UserRow(props) {
    return (
        <tr>
            <td className="align-middle">{props.username}</td>
            <td className="align-middle">{props.email}</td>
            <td className="align-middle">{props.access_level}</td>
        </tr>
    );
}


function UsersList() {
    const [data, setData] = useState([]);

    const refreshData = () => {
        fetch('/users/approvedUsers').then(data => data.json()).then(data => setData(data));
    }

    useEffect(() => {
        refreshData();
        console.log(data);
    }, []);

    const getRows = () => {
        return data.map(row_data => <UserRow key={row_data.email} username={row_data.username}
                                             email={row_data.email} access_level={row_data.access_level}
        />);
    }

    const getData = () => {
        if (data.length === 0) {
            return (
                <div className="m-4">
                    <h3>There are no users</h3>
                </div>
            )
        } else {
            return (
                <table className='table borderless'>
                    <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Access level</th>
                    </tr>
                    </thead>
                    <tbody>{getRows()}</tbody>
                </table>
            );
        }
    }


  return (
      <div className="container MainCard">
          <Title refreshHandler={refreshData}>
              <h1>Approved Users</h1>
          </Title>
          {getData()}
      </div>
  );
}

export default UsersList;