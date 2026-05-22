import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:4000/api/v1/users/login",
                user
            );

            alert(response.data.message);

            localStorage.setItem("isLoggedIn", true);

            navigate("/create-post");

        } catch (error) {
            
            console.log(error.response.data);
            alert(error.response.data.message);

        }
    };

    return (
        <div>

            <h1> Login </h1>

            <form onSubmit={handleSubmit}>

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

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    );
};

export default Login;