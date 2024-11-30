"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const cerificate_1 = require("./routes/cerificate");
const get_certificates_1 = require("./utils/get-certificates");
const delete_1 = require("./utils/delete");
const app = (0, express_1.default)();
const port = 8000;
// Middleware
app.use(express_1.default.json());
// Add Access-Control-Allow-Credentials header to all responses
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header({
        "Access-Control-Allow-Credentials": true,
    });
    next();
});
// CORS Configuration
app.use((0, cors_1.default)({
    // origin: (origin, callback) => {
    //   // Allow specific origins
    //   const allowedOrigins = [
    //     "https://asr-technologies.vercel.app",
    //     "http://localhost:3000",
    //     "https://asr.aokura.site",
    //   ];
    //   // if (origin && allowedOrigins.includes(origin)) {
    //   //   callback(null, true);
    //   // } else if (!origin) {
    //   //   callback(null, true);
    //   // } else {
    //   //   callback(new Error("Not allowed by CORS"));
    //   // }
    //   callback(null, true); // Allow all origins for now
    // },
    origin: [
        "https://asr-technologies.vercel.app",
        "http://localhost:3000",
        "https://asr.aokura.site",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "X-Amz-Date",
        "Authorization",
        "X-Api-Key",
        "X-Amz-Security-Token",
    ],
}));
// Routes
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express and Mongoose!");
});
(0, db_1.default)().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
app.get("/certificate", get_certificates_1.GETCertificates);
app.post("/certificate", cerificate_1.POSTCertificate);
app.delete("/certificate/:id", delete_1.DELETECertificate);
//!------------------------------------------------------------>
// import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
// import connectDB from "./db";
// import { POSTCertificate } from "./routes/cerificate";
// import { GETCertificates } from "./utils/get-certificates";
// import { DELETECertificate } from "./utils/delete";
// const app = express();
// const port = process.env.PORT || 8000;
// // Middleware
// app.use(express.json());
// // Comprehensive CORS Configuration
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow specific origins with broader support for deployment
//       const allowedOrigins = [
//         "https://asr-technologies.vercel.app",
//         "http://localhost:3000",
//         "https://asr.aokura.site",
//         // Add your EC2 instance domain/IP if needed
//         `http://${process.env.EC2_INSTANCE_IP}`,
//         `https://${process.env.EC2_INSTANCE_DOMAIN}`,
//       ].filter(Boolean); // Remove any undefined origins
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "X-Amz-Date",
//       "Authorization",
//       "X-Api-Key",
//       "X-Amz-Security-Token",
//       "Origin",
//       "Accept",
//       "X-Requested-With",
//     ],
//     credentials: true,
//     optionsSuccessStatus: 200
//   })
// );
// // Explicit CORS and Headers Middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const origin = req.headers.origin as string;
//   // Dynamic origin handling
//   if (origin) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   // Comprehensive headers for API Gateway compatibility
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Expose-Headers", "Content-Length");
//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     res.setHeader("Access-Control-Max-Age", "86400"); // Cache preflight for 24 hours
//     return res.sendStatus(200);
//   }
//   next();
// });
// // Routes with explicit type annotations
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, TypeScript with Express and Mongoose!");
// });
// // Update route handlers to include NextFunction
// app.get("/certificate", (req: Request, res: Response, next: NextFunction) =>
//   GETCertificates(req, res ));
// app.post("/certificate", (req: Request, res: Response, next: NextFunction) =>
//   POSTCertificate(req, res ));
// app.delete("/certificate/:id", (req: Request, res: Response, next: NextFunction) =>
//   DELETECertificate(req, res, next));
// // Database Connection and Server Start
// connectDB().then(() => {
//   app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });
// }).catch((error) => {
//   console.error("Failed to connect to database:", error);
//   process.exit(1);
// });
// export default app; // For potential serverless/lambda deployment
