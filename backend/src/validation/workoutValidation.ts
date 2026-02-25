import type { Workout, WorkoutType } from "../types";

const allowedTypes: WorkoutType[] = ["run", "strength", "other"];

export function validateWorkoutCreate(body: any): { ok: true; value: Omit<Workout, "id"> } | { ok: false; error: string }{
    if(!body || typeof body !== "object") return { ok: false, error: "Body must be an object" };

    const { date, type, durationMin } = body;

    if(typeof date !== "string" || date.trim() === "") return { ok: false, error: "date is required" };
    if(typeof type !== "string" || !allowedTypes.includes(type as WorkoutType)) return { ok: false, error: "type is invalid" };
    if(typeof durationMin !== "number" || !Number.isFinite(durationMin) || durationMin <= 0){
        return { ok: false, error: "durationMin must be a positive, finite number" };
    }

    const optionalNumbers = ["distanceMi", "sets", "reps", "weightLb"] as const;
    for(const key of optionalNumbers){
        if(body[key] != null && (typeof body[key] !== "number" || !Number.isFinite(body[key]))){
            return { ok: false, error: `${key} must be a number` };
        }
    }

    if(body.notes != null && typeof body.notes !== "string"){
        return { ok: false, error: "notes must be a string" };
    }

    return { ok: true, value: body as Omit<Workout, "id"> };
}