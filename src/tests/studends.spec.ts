import {describe, expect, test} from '@jest/globals';
import app from "../index"
import request from 'supertest'

describe("GET/students", () => {
        test("Debe retornal estados success y todos los estudiantes.",  async() => {
                const response = await request(app).get("/students");
                const data = await response.body
                console.log(data);
                expect(data.status).toEqual("success")
        });
});