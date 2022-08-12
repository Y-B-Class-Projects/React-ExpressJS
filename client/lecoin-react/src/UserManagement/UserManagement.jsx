import './UserManagement.css'
import Title from "../Title/Title";
import UsersToApprove from "./UserToApprove/UsersToApprove";
import UsersList from "./UsersList/UsersList";

function UserManagement() {

  return (
    <div>
        <UsersList />
        <UsersToApprove/>
    </div>
  );
}

export default UserManagement;