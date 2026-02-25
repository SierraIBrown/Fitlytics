import request from "supertest";
import { createApp } from "../src/app";
import { clearWorkouts, addWorkout } from "../src/store/workoutStore";

describe("GET /workouts", () => {
    const app = createApp();

    beforeEach(() => {
        clearWorkouts();
        addWorkout({ date: "2026-02-10", type: "run", durationMin: 30, distanceMi: 3 });
        addWorkout({ date: "2026-02-11", type: "strength", durationMin: 45, sets: 5, reps: 5});
        addWorkout({ date: "2026-03-01", type: "run", durationMin: 25, distanceMi: 2.5 });
    });

    it("returns all workouts", async () => {
        const res = await request(app).get("/workouts");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
    });

    it("filters by type", async () => {
        const res = await request(app).get("/workouts?type=run");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body.every((w: any) => w.type === "run")).toBe(true);
    });

    it("filters by date range", async () => {
        const res = await request(app).get("/workouts?from=2026-02-01&to=2026-02-28");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });
});