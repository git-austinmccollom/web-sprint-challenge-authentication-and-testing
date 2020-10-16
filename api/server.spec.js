const request = require("supertest");
const server = require("./server.js");

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
});