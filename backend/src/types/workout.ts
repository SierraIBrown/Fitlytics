export type WorkoutType = "run" | "strength" | "other";

export interface Workout {
    id: string;
    date: string;
    type: WorkoutType;
    durationMin: number;
    distanceMi?: number; //Runs
    sets?: number; //strength
    reps?: number; //strength
    weightLb?: number; //strength
    insensity?: 1 | 2 | 3 | 4 | 5; //Simple scale
    notes?: string;
}