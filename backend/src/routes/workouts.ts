import { Router } from "express";
import { queryWorkouts, addWorkout, updateWorkout, deleteWorkout } from "../store/workoutStore";
import { validateWorkoutCreate } from "../validation/workoutValidation";
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

workoutsRouter.post("/", (req, res) => {
    const validation = validateWorkoutCreate(req.body);

    if(!validation.ok){
        return res.status(400).json({ error: validation.error });
    }

    const created = addWorkout(validation.value);
    return res.status(201).json(created);
});

workoutsRouter.put("/:id", (req, res) => {
    const { id } = req.params;

    const validation = validateWorkoutCreate(req.body);
    if(!validation.ok){
        return res.status(400).json({ error: validation.error });
    }

    const updated = updateWorkout(id, validation.value);
    if(!updated){
        return res.status(404).json({ error: "Workout not found" });
    }

    return res.status(200).json(updated);
});

workoutsRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    const deleted = deleteWorkout(id);
    if(!deleted){
        return res.status(404).json({ error: "Workout not found" });
    }

    return res.status(204).send();
});