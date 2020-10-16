const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig")
const randomstring = require('randomstring');

const username = randomstring.generate(14);

describe("server.js", () => {
  describe("sanity check", () => {
    test("get of index route should return ok status", async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get("/");

      expect(response.status).toEqual(expectedStatusCode);
    });
    test("index route response type should be JSON", async () => {
      const response = await request(server).get("/");

      expect(response.type).toEqual("application/json");
    });
    test("index route should return a JSON object", async () => {
      const expectedBody = { api: "running" };

      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });
  });
  describe("register", () => {
    test("if res.body lacks username or password, error code is 500", async () => {
      const expectedStatusCode = 500;
      const responseNoPass = await request(server).post("/api/auth/register").send({ password: "pass" });
      expect(responseNoPass.status).toEqual(expectedStatusCode);
      const responseNoUsername = await request(server).post("/api/auth/register").send({ username: "name" });
      expect(responseNoUsername.status).toEqual(expectedStatusCode);
    });
    test("if res.body is correct, status code 201", async () => {
      const expectedStatusCode = 201;

      const response = await request(server).post("/api/auth/register").send({ username: username, password: "pass" });
      expect(response.status).toEqual(expectedStatusCode);
    });
  });
  describe("login", () => {
    test("if res.body has incorrect password, error code 401", async () => {
      const expectedStatusCode = 401;

      const loginRes = await request(server).post("/api/auth/login").send({ username: username, password: "wrong pass" });
      expect(loginRes.status).toEqual(expectedStatusCode);
    });
    test("if login is correct, 200", async () => {
      const expectedStatusCode = 200;

      const loginRes = await request(server).post("/api/auth/login").send({ username: username, password: "pass" });
      expect(loginRes.status).toEqual(expectedStatusCode);
    })
  });
});