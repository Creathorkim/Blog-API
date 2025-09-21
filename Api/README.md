# Blog Api (Express + PostgressSql + Prisma)

A full-featured REST-API built with **Express**, **Postgress**, and **Prisma ORM**, designed for a blogging platform. This API powers both the Blog Frontend (user-facing) and the Admin Dashboard (author tools).

# Features


- Authentication & Authorization (JWT-based)
- Authors can create, update, delete, and publish/unpublish posts
- Users can comment on posts
- Comment deletion (author or admin only)
- Role-based access control (User, Author)
- CORS enabled for frontend + admin apps
- **Supabase Storage** (File storage for images)

# Tech Stack

- Backend: Node.js, Express.js
- Database: PostgreSQL
- ORM: Prisma
- Auth: JSON Web Tokens (JWT) + bcrypt

# API Endpoints (Main)
- Method Endpoint Description
- POST /register Register new user
- POST /login Login + receive JWT
- GET /posts Get all posts (published)
- GET /posts/:id Get single post
- POST /posts/create Create new post (Author)
- PUT /posts/:id Update post (Author)
- DELETE /posts/:id Delete post (Author)
- PUT /togglePublished Toggle publish/unpublish
- POST /posts/comments/createNew/:id Add comment
- DELETE /posts/comments/delete/:id Delete comment (Author)

# Roles
- User → Read posts, comment
- Author → Create, edit, delete, and manage posts + comments
