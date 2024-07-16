const express = require("express");
const http = require("http");
const connectDB = require("./config/db.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://weblocator.vercel.app/", // frontend URL
    methods: ["GET", "POST"],
    credentials: true, 
  },
  cookie: {
    secure: process.env.SECURITY === 'true', // Set to true in production
    sameSite: 'None', // Ensure this is set for cross-site cookies
  }
});
const port = 5000;
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");

// Connecting to the database
connectDB();

// Middlewares
app.use(cors({
  origin: "https://weblocator.vercel.app/", // Frontend URL
  credentials: true, 
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.SECURITY === 'true', 
      sameSite: 'None',
    },
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello locator");
});
app.use("/auth", authRoute); // Auth routes
app.use("/user", userRoute); // User routes

// User data storage
const users = {};

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("New client connected");

  // Store user data on connection
  socket.on("registerUser", (user) => {
    users[socket.id] = user;
    console.log("User registered:", user);
  });

  // Handle connection requests
  socket.on("sendConnectionRequest", (toUserId) => {
    if (users[toUserId]) {
      io.to(toUserId).emit("connectionRequest", { fromUser: users[socket.id], fromSocketId: socket.id });
    }
  });

  // Handle acceptance of connection requests
  socket.on("acceptConnectionRequest", (fromSocketId) => {
    if (users[fromSocketId] && users[socket.id]) {
      users[socket.id].connectedUsers = users[socket.id].connectedUsers || [];
      users[fromSocketId].connectedUsers = users[fromSocketId].connectedUsers || [];
      
      users[socket.id].connectedUsers.push(fromSocketId);
      users[fromSocketId].connectedUsers.push(socket.id);

      io.to(fromSocketId).emit("connectionAccepted", { user: users[socket.id], socketId: socket.id });
      socket.emit("connectionAccepted", { user: users[fromSocketId], socketId: fromSocketId });
    }
  });

  // Update location
  socket.on("updateLocation", (data) => {
    if (users[socket.id]) {
      users[socket.id].lat = data.lat;

      users[socket.id].lng = data.lng;
      io.emit("locationUpdate", { ...users[socket.id], id: socket.id });
    }
  });
  // Disconnect user
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete users[socket.id];
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
