import {describe, expect, test} from '@jest/globals';
import app from "../index"
import request from 'supertest'

describe("GET/students", () => {
        test("Debe retornar estados success y todos los estudiantes.",  async() => {
                const response = await request(app).get("/students");
                const data = await response.body
                expect(data.status).toEqual("success")
        });
});

describe("POST/students", () => {
        test("Debe retornar estados success y todos los estudiantes.",  async() => {
                const response = await request(app).get("/students");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/students", () => {
        test("Debe retornar estados success y todos los estudiantes.",  async() => {
                const response = await request(app).get("/students");
                expect(response.statusCode).toBe(200);
        });
});

describe("PUT/students", () => {
        test("Debe retornar estados success y todos los estudiantes.",  async() => {
                const response = await request(app).get("/students");
                expect(response.statusCode).toBe(200);
        });
});