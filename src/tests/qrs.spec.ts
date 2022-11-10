import {describe, expect, test} from '@jest/globals';
import app from "../index"
import request from 'supertest'

describe("GET/qrs", () => {
        test("Debe retornar estados success y todos los qrs.",  async() => {
                const response = await request(app).get("/qrs");
                const data = await response.body
                expect(data.status).toEqual("success")
        });
});

describe("POST/qrs", () => {
        test("Debe retornar estados success y todos los qrs.",  async() => {
                const response = await request(app).get("/qrs");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/qrs", () => {
        test("Debe retornar estados success y todos los qrs.",  async() => {
                const response = await request(app).get("/qrs");
                expect(response.statusCode).toBe(200);
        });
});

describe("PUT/qrs", () => {
        test("Debe retornar estados success y todos los qrs.",  async() => {
                const response = await request(app).get("/qrs");
                expect(response.statusCode).toBe(200);
        });
});