import { Router } from "express";
import {
  register,
  login,
  getPost,
  getPosts,
  isAuthenticated,
  isAuthor,
  createPost,
  deletePost,
  updatePost,
  getCommentsByPost,
  createComment,
  deleteComment,
  getAuthorPost,
  togglePublished,
  authorRegister,
  getSinglePost,
  authDeleteComment,
  authorLogin,
} from "../controller/authController.js";
const router = Router();

router.post("/register", register);
router.post("/auth/author/register", authorRegister);
router.post("/login", login);
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.post("/posts/createNewPost", isAuthenticated, isAuthor, createPost);
router.delete("/posts/deletePost/:id", isAuthenticated, isAuthor, deletePost);
router.put("/posts/updatePost/:id", isAuthenticated, isAuthor, updatePost);
router.get("/posts/comments/:id", getCommentsByPost);
router.post("/posts/comments/createNew/:id", isAuthenticated, createComment);
router.delete("/posts/comments/delete/:id", isAuthenticated, deleteComment);
router.get("/myPosts", isAuthenticated, isAuthor, getAuthorPost);
router.post("/authorLogin", authorLogin);
router.put("/togglePublised", isAuthenticated, isAuthor, togglePublished);
router.get("/post/:id", isAuthenticated, isAuthor, getSinglePost);
router.delete(
  "/post/:id/deleteComment",
  isAuthenticated,
  isAuthor,
  authDeleteComment
);

export default router;
