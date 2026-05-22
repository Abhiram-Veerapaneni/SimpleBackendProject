import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import ViewPosts from "./pages/ViewPosts";
import UpdatePost from "./pages/UpdatePost";

const App = () => {
    return (
        
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/getPosts" element={<ViewPosts />} />
            <Route path="/update-post/:id" element={<UpdatePost />} />

        </Routes>
    );
};

export default App;