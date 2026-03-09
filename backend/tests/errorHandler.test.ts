import request from "supertest";
import { createApp } from "../src/app";

describe("Error handler middleware", () => {
    const originalEnv = process.env.NODE_ENV;

    beforeAll(() => {
        process.env.NODE_ENV = "test";
    });

    afterAll(() => {
        process.env.NODE_ENV = originalEnv;
    });

    it("returns 500 for unhandled errors", async() => {
        const app = createApp();
        const res = await request(app).get("/error-test");

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error" });
    });
});