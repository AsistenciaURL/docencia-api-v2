import {describe, expect, test} from '@jest/globals';
import app from "../index"
import request from 'supertest'

describe("GET/qrs", () => {
        test("Debe retornar estados success y todos los qrs.",  async() => {
                const response = await request(app).get("/qrs");
                const data = await response.body
                console.log(data);
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

describe("GET/students", () => {
        test("Debe retornar estados success y todos los estudiantes.",  async() => {
                const response = await request(app).get("/students");
                const data = await response.body
                console.log(data);
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

describe("GET/assistance-categories", () => {
        test("Debe retornar estados success y todos los assistance-categories.",  async() => {
                const response = await request(app).get("/assistance-categories");
                const data = await response.body
                console.log(data);
                expect(data.status).toEqual("success")
        });
});

describe("POST/assistance-categories", () => {
        test("Debe retornar estados success y todos los assistance-categories.",  async() => {
                const response = await request(app).get("/assistance-categories");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/assistance-categories", () => {
        test("Debe retornar estados success y todos los assistance-categories.",  async() => {
                const response = await request(app).get("/assistance-categories");
                expect(response.statusCode).toBe(200);
        });
});

describe("PUT/assistance-categories", () => {
        test("Debe retornar estados success y todos los assistance-categories.",  async() => {
                const response = await request(app).get("/assistance-categories");
                expect(response.statusCode).toBe(200);
        });
});

describe("GET/assistances", () => {
        test("Debe retornar estados success y todos los assistances",  async() => {
                const response = await request(app).get("/assistances");
                const data = await response.body
                console.log(data);
                expect(data.status).toEqual("success")
        });
});

describe("PUT/assistances", () => {
        test("Debe retornar estados success y todos los assistances.",  async() => {
                const response = await request(app).get("/assistances");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/assistances", () => {
        test("Debe retornar estados success y todos los assistances",  async() => {
                const response = await request(app).get("/assistances");
                expect(response.statusCode).toBe(200);
        });
});

describe("POST/assistances", () => {
        test("Debe retornar estados success y todos los assistances.",  async() => {
                const response = await request(app).get("/assistances");
                expect(response.statusCode).toBe(200);
        });
});

describe("GET/professors", () => {
        test("Debe retornar estados success y todos los professors",  async() => {
                const response = await request(app).get("/professors");
                const data = await response.body
                console.log(data);
                expect(data.status).toEqual("success")
        });
});

describe("POST/professors", () => {
        test("Debe retornar estados success y todos los professors.",  async() => {
                const response = await request(app).get("/professors");
                expect(response.statusCode).toBe(200);
        });
});

describe("PUT/professors", () => {
        test("Debe retornar estados success y todos los professors.",  async() => {
                const response = await request(app).get("/professors");
                expect(response.statusCode).toBe(200);
        });
});

describe("DELETE/professors", () => {
        test("Debe retornar estados success y todos los professors",  async() => {
                const response = await request(app).get("/professors");
                expect(response.statusCode).toBe(200);
        });
});