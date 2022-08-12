import Title from "../../Title/Title";
import {useState} from "react";

function Welcome() {
    const [username, setUsername] = useState("");

    const getMessage = () => {
        const today = new Date();
        fetch("/users/username").then(r => r.json()).then(data => setUsername(data.msg));
        return  (today.getHours() < 12 ? 'Good Morning' : 'Good Afternoon') + ', ' +
            username.charAt(0).toUpperCase() + username.slice(1);
    }

  return (
    <div className="container">
        <br/>
        <h1>{getMessage()}</h1>
    </div>
  );
}

export default Welcome;