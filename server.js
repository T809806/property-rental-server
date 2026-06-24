import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import propertyRoutes from "./routes/propertyRoutes.js"; // ✅ MUST

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROUTES ATTACH
app.use("/api/properties", propertyRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});