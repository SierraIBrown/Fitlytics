import { randomUUID } from "crypto";
import type { Workout } from "../types";

let workouts: Workout[] = [];

//Seed data
function seedWorkouts(){
    workouts = [
        {
            id: randomUUID(),
            date: "2026-02-20",
            type: "run",
            durationMin: 30,
            distanceMi: 3.2,
            notes: "Easy morning run"
        },
        {
            id: randomUUID(),
            date: "2026-02-21",
            type: "strength",
            durationMin: 45,
            sets: 5,
            reps: 5,
            weightLb: 135,
            notes: "Bench & squats"
        }
    ];
}

seedWorkouts();

export function getAllWorkouts(): Workout[]{
    return workouts;
}

export function addWorkout(input: Omit<Workout, "id">): Workout{
    const workout: Workout = {
        id: randomUUID(),
        ...input
    };

    workouts.push(workout);
    return workout;
}

export function deleteWorkout(id: string): boolean{
    const initialLength = workouts.length;
    workouts = workouts.filter(w => w.id !== id);
    return workouts.length < initialLength;
}

export function clearWorkouts(){
    workouts = [];
}