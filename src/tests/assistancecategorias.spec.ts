import {describe, expect, test} from '@jest/globals';
import app from "../index"
import request from 'supertest'

describe("GET/assistancecategoriaas", () => {
        test("Debe retornar estados success y todos los assistancecategoriaas.",  async() => {
                const response = await request(app).get("/assistancecategoriaas");
                const data = await response.body
                console.log(data);
                expect(data.status).toEqual("success")
        });
});

describe("POST/assistancecategoriaas", () => {
        test("Debe retornar estados success y todos los assistancecategoriaas.",  async() => {
                const response = await request(app).get("/assistancecategoriaas");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/assistancecategoriaas", () => {
        test("Debe retornar estados success y todos los assistancecategoriaas.",  async() => {
                const response = await request(app).get("/assistancecategoriaas");
                expect(response.statusCode).toBe(200);
        });
});

describe("PUT/assistancecategoriaas", () => {
        test("Debe retornar estados success y todos los assistancecategoriaas.",  async() => {
                const response = await request(app).get("/assistancecategoriaas");
                expect(response.statusCode).toBe(200);
        });
});