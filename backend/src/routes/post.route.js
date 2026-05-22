import { Router } from "express";
import { createPost, deletePost, getPosts, updatePost,  getPostById} from "../controllers/post.controller.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/getPosts').get(getPosts);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);
router.get("/get/:id", getPostById);

export default router;