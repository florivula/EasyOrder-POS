import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [users, setUsers] = useState([]);
    const [click, setClicked] = useState(false);
    const [numri, setNumri] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://localhost:44389/api/Users/get_users");
                setUsers(response.data); 
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers(); 
    }, []); 


    return (
        <>
            <div>Home page</div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Home;
