# ♻️ Waste Management and Pickup Request System

A full-stack web application that allows users to report waste pickup requests and enables admin to manage and assign those requests efficiently.

## 🚀 Features

### 👤 User
- Register and login securely (passwords hashed with bcrypt)
- Submit waste pickup requests with image and address
- Track status of submitted requests (Pending, In Progress, Completed)

### 🛠️ Admin
- View all reported waste submissions
- Update the status of requests
- Assign pickups to staff (optional extension)

## 🧠 Tech Stack

| Technology | Description |
|------------|-------------|
| **MongoDB** | NoSQL database for storing users and waste reports |
| **Express.js** | Backend server and API |
| **React** | Frontend interface |
| **Node.js** | JavaScript runtime for server-side logic |
| **Mongoose** | ODM to interact with MongoDB |
| **bcrypt** | Password hashing |
| **JWT** | JSON Web Token for user authentication |
| **Multer / Cloudinary** | (Optional) For image uploads |

## 📁 Folder Structure

