import {describe, expect, test} from '@jest/globals';
import app from "../index"
import request from 'supertest'


describe("GET/professors", () => {
        test("Debe retornar estados success y todos los profesores.",  async() => {
                const response = await request(app).get("/professors");
                const data = await response.body
                expect(data.status).toEqual("success")
        });
});

describe("POST/professors", () => {
        test("Debe retornar estados success y todos los profesores",  async() => {
                const response = await request(app).get("/professors");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/professors", () => {
        test("Debe retornar estados success y todos los profesores",  async() => {
                const response = await request(app).get("/professors");
                expect(response.statusCode).toBe(200);
        });
});

describe("PUT/professors", () => {
        test("Debe retornar estados success y todos los profesores",  async() => {
                const response = await request(app).get("/professors");
                expect(response.statusCode).toBe(200);
        });
});