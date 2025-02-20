const mongoose = require("mongoose");
const app = require("../server");
const request = require("supertest");
require("dotenv").config({ path: ".env.testing" });
//console.log(process.env.MONGO_URL)
/// before starting the test, I need to connect to mongo

let token;
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  await request(app).post("/users/register").send({ username: "test", password: "test123" });
  let res = await request(app).post("/users/login").send({ username: "test", password: "test123" });
  token = res.body.token;
});

afterAll(async () => {
    const collections = mongoose.connection.collections;

    for (const collection in collections) {
      await collections[collection].deleteMany({});
    }
    
  await mongoose.connection.close();
});

describe("User Test Routes", () => {
  test("Register Route", async () => {
    const res = await request(app).post("/users/register").send({ username: "venu", password: "123" });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  test("Add A Todo", async () => {
    // console.log("token", token)
    let res = await request(app).post("/todos/add").set("authorization", `Bearer ${token}`).send({ text: "Learn Testing" });
    expect(res.statusCode).toBe(201)
  });
});
