import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health";
import { workoutsRouter } from "./routes/workouts";
import { errorHandler } from "./middleware/errorHandling"

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/health", healthRouter);
    app.use("/workouts", workoutsRouter);
    app.use(errorHandler);

    return app;
}