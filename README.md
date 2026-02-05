# GDGC VNRVJIET

**Google Developer Groups on Campus** - VNR Vignana Jyothi Institute of Engineering and Technology

A full-stack web application for managing GDGC VNRVJIET events, registrations, blogs, and campus activities.

## 🏗️ Project Structure

```
gdsc-vnrvjiet/
├── client/              # React frontend application
├── server/              # NestJS backend server
├── server_node/         # Node.js/Express backend server
├── src/                 # Additional source files
└── package.json         # Root package.json
```

## 🚀 Tech Stack

### Frontend (Client)
- **Framework:** React 18.2.0 with TypeScript
- **Styling:** TailwindCSS, Material-UI, Bootstrap
- **State Management:** Redux
- **Routing:** React Router v6
- **UI Libraries:** 
  - Material-UI (@mui/material, @mui/icons-material)
  - Headless UI, Heroicons
  - Framer Motion for animations
  - Lottie React for animations
- **Forms:** React Hook Form
- **Other Tools:** 
  - Axios for API calls
  - QR Code scanning (html5-qrcode)
  - Excel export (xlsx)
  - Rich text editor (react-quill)
  - Payment integration (Razorpay)

### Backend - NestJS (Server)
- **Framework:** NestJS 10.4.20
- **Database:** MySQL with TypeORM and Sequelize
- **Authentication:** Passport.js with Google OAuth 2.0
- **File Storage:** Google Cloud Storage
- **API Documentation:** Swagger/OpenAPI
- **Security:** bcryptjs for password hashing

### Backend - Node.js (Server_node)
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (jsonwebtoken)
- **Email:** Nodemailer
- **File Upload:** express-fileupload
- **Payment:** Razorpay
- **API Documentation:** Swagger

## 📋 Prerequisites

- **Node.js:** v22.x
- **MySQL:** For NestJS server
- **MongoDB:** For Node.js server
- **Google Cloud Storage:** Account and credentials (for file uploads)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/akhil-varsh/gdsc-vnrvjiet.git
cd gdsc-vnrvjiet
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Frontend Setup (Client)

```bash
cd client
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `client` directory:

```env
REACT_APP_BACK_URL=http://localhost:4000
ENCRYPTION_KEY=gdgc.vnrvjiet_gdgc.vnrvjiet
REACT_APP_ADMIN_ROLE=8391
REACT_APP_JURY_ROLE=9184
```

#### Run Development Server

```bash
npm start
```

The client will run on `http://localhost:3000`

#### Build for Production

```bash
npm run build
```

### 4. NestJS Backend Setup (Server)

```bash
cd server
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
DB_HOST=your_mysql_host
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
PORT=8000
```

#### Run Development Server

```bash
npm run start:dev
```

The server will run on `http://localhost:8000`

#### Build for Production

```bash
npm run build
npm run start:prod
```

### 5. Node.js Backend Setup (Server_node)

```bash
cd server_node
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `server_node` directory with your MongoDB connection string and other required variables.

#### Run Server

```bash
npm start
```

The server will run on `http://localhost:4000`

## 📜 Available Scripts

### Client

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Server (NestJS)

- `npm run start` - Start server
- `npm run start:dev` - Start in development mode with watch
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start production build
- `npm run build` - Build the application
- `npm run lint` - Lint code
- `npm run test` - Run tests

### Server_node (Express)

- `npm start` - Start the server

## 🌐 API Documentation

### NestJS Server
Once the NestJS server is running, access Swagger documentation at:
```
http://localhost:8000/api-docs
```

### Node.js Server
Once the Node.js server is running, access Swagger documentation at:
```
http://localhost:4000/api-docs
```

## 🔑 Key Features

- **Event Management:** Create, update, and manage GDGC events
- **User Registration:** Event registration with QR code generation
- **Blog System:** Create and manage blog posts
- **Campus Activities:** Track and manage campus activities
- **Discord Integration:** Connect with Discord community
- **Google OAuth:** Secure authentication
- **Payment Integration:** Razorpay for event payments
- **Email Notifications:** Automated email system
- **File Uploads:** Image and document uploads via Google Cloud Storage
- **Scoring System:** Track participant scores and achievements
- **Team Management:** Organize and manage teams

## 🚢 Deployment

Both servers are configured for Vercel deployment with `vercel.json` files.

### Deploy Frontend

```bash
cd client
vercel
```

### Deploy NestJS Backend

```bash
cd server
vercel
```

### Deploy Node.js Backend

```bash
cd server_node
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED license.

## 👥 Authors

GDGC VNRVJIET Team

## 📧 Contact

Email: gdsc.vnrvjiet@gmail.com

## 🙏 Acknowledgments

- Google Developer Groups
- VNR Vignana Jyothi Institute of Engineering and Technology
- All contributors and maintainers

---

Made with ❤️ by GDGC VNRVJIET