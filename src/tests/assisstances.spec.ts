import {describe, expect, test} from '@jest/globals';
import app from "../index"
import request from 'supertest'


describe("GET/assisstances", () => {
        test("Debe retornar estados success y todos los asistencia.",  async() => {
                const response = await request(app).get("/assisstances");
                const data = await response.body
                expect(data.status).toEqual("success")
        });
});

describe("POST/assisstances", () => {
        test("Debe retornar estados success y todos los asistencia",  async() => {
                const response = await request(app).get("/assisstances");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/assisstances", () => {
        test("Debe retornar estados success y todos los asistencia",  async() => {
                const response = await request(app).get("/assisstances");
                expect(response.statusCode).toBe(200);
        });
});

describe("PUT/assisstances", () => {
        test("Debe retornar estados success y todos los asistencia",  async() => {
                const response = await request(app).get("/assisstances");
                expect(response.statusCode).toBe(200);
        });
});