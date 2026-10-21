const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CloudPilot AWS DevSecOps API is running!",
  });
});

// Health check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "CloudPilot Backend",
    timestamp: new Date().toISOString(),
  });
});

// Dashboard API
app.get("/api/dashboard", (req, res) => {
  res.json({
    project: "CloudPilot",
    platform: "AWS",
    environment: "Development",
    services: [
      "Terraform",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
    ],
    security: {
      enabled: true,
      mode: "Demo",
    },
  });
});

app.listen(PORT, () => {
  console.log(`CloudPilot backend running at http://localhost:${PORT}`);
});