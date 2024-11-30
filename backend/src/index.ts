import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./db";
import { POSTCertificate } from "./routes/cerificate";
import { GETCertificates } from "./utils/get-certificates";
import { DELETECertificate } from "./utils/delete";

const app = express();
const port = 8000;

// Middleware
app.use(express.json());

// Add Access-Control-Allow-Credentials header to all responses
app.use((req: Request, res: Response, next) => {
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
app.use(
  cors({
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
  })
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express and Mongoose!");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});

app.get("/certificate", GETCertificates);
app.post("/certificate", POSTCertificate);
app.delete("/certificate/:id", DELETECertificate);

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
