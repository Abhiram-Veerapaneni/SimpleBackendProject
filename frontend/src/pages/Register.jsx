import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PORT = import.meta.env.VITE_PORT;

const Register = () => {

    const navigate = useNavigate();

    const [user,setUser] = useState({
        username:"",
        email:"",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await axios.post(
                `http://localhost:${PORT}/api/v1/users/register`,
                user
            );
            alert("User Registered Successfully");
            navigate("/login");
        } catch (error) {
            
            console.log(error.response.data);
            alert(error.response.data.message);
        }
    };

    return (
        <div>

            <h1> Register </h1>

            <form onSubmit={handleSubmit}>

                <input 
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <br /><br />

                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type ="submit">
                    Register
                </button>

            </form>
        </div>
    );
};

export default Register;