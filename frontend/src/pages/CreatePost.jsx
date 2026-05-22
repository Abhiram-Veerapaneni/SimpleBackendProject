import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


const CreatePost = () => {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }


    const [post, setPost] = useState({
        name: "",
        description: "",
        age: ""
    });

    const handleChange = (e) => {

        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:4000/api/v1/posts/create",
                post
            );

            alert(response.data.message);

        } catch (error) {

            alert(
                error.response?.data?.message || "Failed"
            );
        }
    };

    const logout = () => {

        localStorage.removeItem("isLoggedIn");

        navigate("/login");

    };

    return (
        <div>


            <button onClick={logout}>
                Logout
            </button>

            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Create Post
                </button>

                <br /><br />
                <button type="button" onClick={() => navigate("/getPosts")} >
                    View All Posts
                </button>
            </form>

        </div>
    );
};

export default CreatePost;