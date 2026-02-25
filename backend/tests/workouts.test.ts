import request from "supertest";
import { createApp } from "../src/app";
import { clearWorkouts, addWorkout, getAllWorkouts } from "../src/store/workoutStore";

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

describe("POST /workouts", () => {
    const app = createApp();

    beforeEach(() => {
        clearWorkouts();
    });

    it("creates a workoutand returns it", async () => {
        const payload = {
            date: "2026-02-24",
            type: "run",
            durationMin: 30,
            distanceMi: 3.1,
            notes: "Felt good"
        };

        const res = await request(app).post("/workouts").send(payload);

        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.type).toBe("run");

        expect(getAllWorkouts().length).toBe(1);
    });

    it("returns 400 on missing required fields", async () => {
        const res = await request(app).post("/workouts").send({ type: "run" });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it("returns 400 on invalid type", async () => {
        const res = await request(app).post("/workouts").send({
            date: "2026-02-24",
            type: "swimming",
            durationMin: 20
        });

        expect(res.status).toBe(400);
    });
});