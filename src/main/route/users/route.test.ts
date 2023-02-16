import request from 'supertest';
import app from '../../config/app';
import assert from 'assert';

describe("Users Route", () => {
  it("Should return 200 on success", async () => {
    await request(app)
      .get('/api/users/')
      .send()
      .expect(200)
  })

  it("Should return the correct value on success", async () => {
    const response = await request(app)
      .get('/api/users/')
      .send();
    expect(response.status).toEqual(200);
    expect(response.body).toContainEqual({
      "id": 1,
      "name": "cvRhuZicvV",
      "tax": 79
    });
  })
})