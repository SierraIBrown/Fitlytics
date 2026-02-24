import { getAllWorkouts, addWorkout, deleteWorkout, clearWorkouts } from "../src/store/workoutStore";

describe("Workout Store", () => {
    beforeEach(() => {
        clearWorkouts();
    });

    it("adds a workout", () => {
        const workout = addWorkout({
            date: "2026-02-24",
            type: "run",
            durationMin: 25
        });

        expect(workout.id).toBeDefined();
        expect(getAllWorkouts().length).toBe(1);
    });

    it("deletes a workout", () => {
        const workout = addWorkout({
            date: "2026-02-24",
            type: "run",
            durationMin: 25
        });

        const deleted = deleteWorkout(workout.id);

        expect(deleted).toBe(true);
        expect(getAllWorkouts().length).toBe(0);
    });
});