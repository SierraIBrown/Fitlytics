import { Router } from "express";
import { queryWorkouts } from "../store/workoutStore";
import type { WorkoutType } from "../types";

export const workoutsRouter = Router();

workoutsRouter.get("/", (req, res) => {
    const { type, from, to } = req.query;

    const q: { type?: WorkoutType; from?: string; to?: string } = {};

    if(typeof type === "string") q.type = type as WorkoutType;
    if(typeof from === "string") q.from = from;
    if(typeof to === "string") q.to = to;

    const results = queryWorkouts(q);
    res.status(200).json(results);
});