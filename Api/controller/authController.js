import prisma from "../model/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
          role: role,
        },
      });

      res.status(201).json({
        message: "User registered Successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (err) {
    console.log("Error :", err);
    res.sendStatus(500).json({ error: "Internal Error" });
  }
};

export const authorRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email: email, role: "Author" },
    });
    if (existingUser) {
      return res.status(401).json({
        error: "Email already registered as author",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
          role: "Author",
        },
      });
      res.status(200).json({
        user: user,
      });
    }
  } catch {
    res.status(500).json({
      error: "Internal Error",
    });
  }
};

export const authorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email: email, role: "Author" },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid Credential" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ error: "Invalid Credential" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "90h" }
    );

    res.json({
      token: token,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({
      error: "Internal err",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid Credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid Credential",
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "90h",
      }
    );

    res.json({
      token: token,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({
      error: "Internal err",
    });
  }
};

export const isAuthenticated = (req, res, next) => {
  const bearereHeader = req.headers["authorization"];

  if (typeof bearereHeader !== "undefined") {
    const bearer = bearereHeader.split(" ");
    const token = bearer[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } else {
    res.sendStatus(403);
  }
};

export const isAuthor = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  if (req.user.role !== "Author") {
    return res.status(403).json({
      error: "You are unauthorized to perform this action",
    });
  }
  next();
};

export const createPost = async (req, res) => {
  try {
    const { content, title, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required",
      });
    }

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: published ?? true,
        author: {
          connect: { id: req.user.id },
        },
      },
    });

    res.status(201).json({
      post: post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Error",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      include: { comments: true, author: true },
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({
      posts: post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Error",
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({
      include: { author: true },
      where: { id: id, published: true },
    });
    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    res.status(200).json({
      post: post,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const author = prisma.user.findUnique({ where: { id: req.user.id } });
    if (!author) {
      return res.status(403).json({
        error: "You are not authorized to do this pal",
      });
    }
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.json({
      message: "Post Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Error",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const updatedPostId = Number(req.params.id);

    await prisma.post.update({
      where: { id: updatedPostId },
      data: {
        title: title,
        content: content,
        published: published,
      },
    });
    res.status(200).json({
      message: "Post Updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Error",
    });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      include: { user: true },
    });
    if (!comments) {
      return res.json({
        error: "No comments Be the Number One to do this pal 😊",
      });
    }

    res.status(200).json({
      comments: comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Error",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const { content } = req.body;
    const comment = await prisma.comment.create({
      data: {
        content: content,
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: req.user.id },
        },
      },
    });

    res.status(200).json({
      message: "Comment Created",
      comment: comment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Error",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = Number(req.params.id);

    const author = prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (!author && req.user !== "Author") {
      return res.status(403).json({
        error: "You can't perform this action",
      });
    }
    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({
      message: "Comment Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Error",
    });
  }
};

export const getAuthorPost = async (req, res) => {
  try {
    const id = Number(req.user.id);
    const posts = await prisma.post.findMany({
      where: { authorId: id },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      posts: posts,
    });
  } catch (err) {
    res.status(500).json({
      error: "You're not Authorized",
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = await prisma.post.findFirst({
      where: { id: id },
      include: { comments: true },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found " });
    }

    res.status(200).json({ post: post });
  } catch (err) {
    res.status(500).json({ error: "Internal Error" });
  }
};
export const togglePublished = async (req, res) => {
  try {
    const { id, published } = req.body;
    const postId = parseInt(id);
    const publishedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        published: published,
      },
    });
    res.status(200).json({
      publishedPost: publishedPost,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      error: "Error updating post status",
    });
  }
};

export const authDeleteComment = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.comment.delete({
      where: { id: id },
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Error",
    }); 
  }
};
