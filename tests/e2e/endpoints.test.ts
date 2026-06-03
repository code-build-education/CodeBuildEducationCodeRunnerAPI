import request, { SuperTest, Test } from "supertest";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { Server } from "http";
import { Express } from "express";
import { createApp } from "../../src/app";

// Test end points api
describe("Test end point Index", () => {
    // Vars for the server
    let app: Express | null = null;
    let server: Server | null = null;
    let api: SuperTest<Test> | null = null;
    const port = 6000;

    // Start the server
    beforeAll(() => {
        // Ensure the server is started before any tests run
        app = createApp();
        if (app) {
            server = app.listen(port);
            api = request(app) as unknown as SuperTest<Test>;
        }
    });

    // Test the end points
    test("GET /", async () => {
        if (api) {
            const response = await api.get("/");
            expect(response.status).toBe(200);
            expect(response.text).toBe("Hello World!");
        }
    });
    
    test("GET /api/v1/compilation-code-python", async () => {
        if (api) {
            const response = await api.get("/api/v1/compilation-code-python");
            expect(response.status).toBe(200);
        }
    });

    test("POST /api/v1/compilation-code-python", async () => {
        if (api) {
            const response = await api.post("/api/v1/compilation-code-python").send({ code: "print('Hello World!')" });
            expect(response.text).toBe("{\"compilationCodePythonResult\":[\"Hello World!\"]}");
            expect(response.status).toBe(200);
        }
    });

    test("POST /api/v1/compilation-code-python", async () => {
        if (api) {
            const response = await api.post("/api/v1/compilation-code-python").send({ code: "@@@@a0000as131" });
            expect(response.text).toBe("{\"compilationCodePythonResult\":{\"error\":\"  File \\\"/tmp/code.py\\\", line 1\\n    @@@@a0000as131\\n     ^\\nSyntaxError: invalid syntax\\n\"}}");
            expect(response.status).toBe(200);
        }
    });

    // Close the server
    afterAll((done) => {
        // Close the server and perform cleanup after all tests are done
        if (server) {
            server.close(done);
        }
    });
});


