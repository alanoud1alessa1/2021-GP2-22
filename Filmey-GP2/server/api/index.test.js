const app = require("../app");
const supertest = require("supertest");
const { sign } = require("jsonwebtoken");
const auth = require("../auth");
describe("GET /api/v1", () => {
  it("should return unauthrized when no token is present or invalid token", async () => {
    await supertest(app).get("/api/v1").expect(403);
    await supertest(app)
      .get("/api/v1")
      .set({ authorization: "Bearer lksajflksdf  " })
      .expect(403);
  });
  test('should return "here!" when a correct token is present', async () => {
    let token = auth.createAccessToken({ id: 1 });
    let res = await supertest(app)
      .get("/api/v1")
      .set({ authorization: `Bearer ${token}` })
      .expect(200);
    expect(res.body).toEqual("here!");
  });
});
