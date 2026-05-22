import { useState, useEffect} from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


const ViewPosts = () => {

    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    
    const [posts, setPosts] = useState([]);

    // GET posts
    const fetchPosts = async () => {

        try {

            const response = await axios.get(
                "http://localhost:4000/api/v1/posts/getPosts"
            );

            setPosts(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    // DELETE POST
    const deletePost = async (id) => {

        try {

            await axios.delete(`http://localhost:4000/api/v1/posts/delete/${id}`);

            alert("Post Deleted");

            fetchPosts();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchPosts();

    }, []);

    return (
        <div>

            <h1> All posts </h1>

            {
                posts.map((post) => (

                    <div
                        key={post._id}
                        style={{
                            border: "1px solid black",
                            marginBottom: "10px",
                            padding: "10px"
                        }}
                    >

                        <h3>{post.name}</h3>
                        <p>{post.description}</p>
                        <p>{post.age}</p>

                        <button
                            onClick={() => navigate(`/update-post/${post._id}`)}
                        >
                            Modify
                        </button>

                        <button
                            onClick={() => deletePost(post._id)}
                        >
                            Delete
                        </button>
                    </div>

                ))
            }

        </div>
    );
};

export default ViewPosts;