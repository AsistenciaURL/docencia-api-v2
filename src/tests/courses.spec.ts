import {describe, expect, test} from '@jest/globals';
import app from "../index"
import request from 'supertest'


describe("GET/courses", () => {
        test("Debe retornar estados success y todos los cursos.",  async() => {
                const response = await request(app).get("/courses");
                const data = await response.body
                console.log(data);
                expect(data.status).toEqual("success")
        });
});

describe("POST/courses", () => {
        test("Debe retornar estados success y todos los cursos",  async() => {
                const response = await request(app).get("/courses");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/courses", () => {
        test("Debe retornar estados success y todos los cursos",  async() => {
                const response = await request(app).get("/courses");
                expect(response.statusCode).toBe(200);
        });
});

describe("PUT/courses", () => {
        test("Debe retornar estados success y todos los cursos",  async() => {
                const response = await request(app).get("/courses");
                expect(response.statusCode).toBe(200);
        });
});