import { useNavigate } from "react-router-dom";

const Home = () => {
    
    const navigate = useNavigate();

    return (
        <div> 
            <h1> Home Page </h1>

            <button onClick={ () => navigate("/register")}>
                Register
            </button>

            <br /><br />

            <button onClick={ () => navigate("/login")}>
                Login
            </button>

        </div>
    );
};

export default Home;