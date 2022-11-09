import {describe, expect, test} from '@jest/globals';
import app from "../index"
import request from 'supertest'

describe("GET/devices", () => {
        test("Debe retornar estados success y todos los devices.",  async() => {
                const response = await request(app).get("/devices");
                const data = await response.body
                console.log(data);
                expect(data.status).toEqual("success")
        });
});

describe("POST/devices", () => {
        test("Debe retornar estados success y todos los devices.",  async() => {
                const response = await request(app).get("/devices");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/devices", () => {
        test("Debe retornar estados success y todos los devices.",  async() => {
                const response = await request(app).get("/devices");
                expect(response.statusCode).toBe(200);
        });
});

describe("PUT/devices", () => {
        test("Debe retornar estados success y todos los devices.",  async() => {
                const response = await request(app).get("/devices");
                expect(response.statusCode).toBe(200);
        });
});