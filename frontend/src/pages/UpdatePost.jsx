import { useEffect, useState } from "react";
import axios from "axios";

import {
    useNavigate,
    useParams
} from "react-router-dom";

const UpdatePost = () => {

    const navigate = useNavigate();
    
    const { id } = useParams();

    const [post, setPost] = useState({
        name: "",
        description: "",
        age: ""
    });

    // GET SINGLE POST
    const fetchPost = async () => {

        try {

            const response = await axios.get(
                `http://localhost:4000/api/v1/posts/get/${id}`
            );

            setPost(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchPost();

    }, []);

    // HANDLE CHANGE
    const handleChange = (e) => {

        setPost({
            ...post,
            [e.target.name]: e.target.value
        });

    };

    // UPDATE POST
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.patch(
                `http://localhost:4000/api/v1/posts/update/${id}`,
                post
            );

            alert("Post Updated");

            navigate("/getPosts");

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div>

            <h1>Update Post</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    value={post.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="age"
                    value={post.age}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Update
                </button>

            </form>

        </div>
    );
};

export default UpdatePost;