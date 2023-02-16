import request from 'supertest';
import app from '../../config/app';

describe("Products Route", () => {
  it("Should return 200 on success", async () => {
    await request(app)
      .get('/api/products/')
      .send()
      .expect(200)
  })

  it("Should return the correct value on success", async () => {
    const response = await request(app)
      .get('/api/products/')
      .send();
    expect(response.status).toEqual(200);
    expect(response.body).toContainEqual({
      "id": 1,
      "name": "explicabo alias hic reprehenderit deleniti quos id reprehenderit consequuntur ipsam iure voluptatem ea culpa excepturi ducimus repudiandae ab",
      "price": 6945
    });
  })
})