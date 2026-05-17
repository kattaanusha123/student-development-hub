import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Mock Database (In-memory for demo)
  const db = {
    projects: [
      {
        id: "1",
        title: "AI Smart Irrigation System",
        description: "A system that uses soil moisture sensors and weather data to optimize water usage in farming.",
        student: "Alex Johnson",
        skills: ["IoT", "Python", "Machine Learning"],
        category: "Agriculture",
        likes: 12,
        feedback: [
          { user: "Sarah", comment: "Great idea! Maybe add a mobile app for remote monitoring?" }
        ]
      },
      {
        id: "2",
        title: "Eco-Friendly Waste Sorter",
        description: "An automated bin that uses computer vision to sort recyclables from trash.",
        student: "Maria Garcia",
        skills: ["Computer Vision", "Raspberry Pi", "Robotics"],
        category: "Environment",
        likes: 25,
        feedback: []
      }
    ],
    reviews: [
      {
        id: "1",
        college: "Tech University",
        rating: 4.5,
        comment: "Excellent research facilities and supportive faculty.",
        sentiment: "Positive"
      }
    ],
    trendingTech: [
      { name: "Generative AI", growth: "+150%", demand: "High" },
      { name: "Quantum Computing", growth: "+40%", demand: "Medium" },
      { name: "Edge AI", growth: "+85%", demand: "High" }
    ]
  };

  // API Routes
  app.get("/api/projects", (req, res) => {
    res.json(db.projects);
  });

  app.post("/api/projects", (req, res) => {
    const newProject = {
      id: Math.random().toString(36).substr(2, 9),
      ...req.body,
      likes: 0,
      feedback: []
    };
    db.projects.push(newProject);
    res.status(201).json(newProject);
  });

  app.get("/api/reviews", (req, res) => {
    res.json(db.reviews);
  });

  app.get("/api/trending", (req, res) => {
    res.json(db.trendingTech);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
