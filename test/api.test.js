// //fetching single product
const request = require('supertest');
const app = require('../index')



describe("API Endpoints Testing", () => {
  it('/GET/api/product/getProduct| Response should be json', async () =>{
    const response = await request (app)
    .get('/api/product/getProduct/')
})

it('/DELETE/api/product/deleteProduct/:productId | Response should be json', async () =>{
  const response = await request (app)
  .delete('/api/product/deleteProduct/65cafe8442a4cbefa7c3c57e')
})

it('/DELETE/api/cart/delete/:id | Response should be json', async () =>{
  const response = await request (app)
  .delete('api/cart/delete/65e238d2d6382127185fc8f5')
})





    // Register User
    it("POST /api/user/create | Response with success message", async () => {
      const response = await request(app).post("/api/user/create").send({
        firstName: "fff",
        lastName: "sgbvfs",
        email: "prasffhfant@gmail.com ",
        password: "dgbvfsdg", 
      });
      if (response.body.success) {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("User created successfully");
      } else {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual("User already exists");
      }
    });

    it("POST /api/user/create | Response with success message", async () => {
      const response = await request(app).post("/api/user/create").send({
        firstName: "fff",
        lastName: "sgbvfs",
        email: "prasffhfant@gmail.com ",
         
      });
      if (response.body.success) {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("User created successfully");
      } else {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual("User already exists");
      }
    });
  
    // Login User
    it("POST /api/user/login |  Response with valid JSON", async () => {
      const response = await request(app).post("/api/user/login").send({
        email: "prashantbist64@gmail.com",
        password: "uuuuuu",
      });
      expect(response.statusCode).toBe(200);
    }, 40000);

    it("/GET /api/product/getUsers/:id | Response should be json", async () => {
      const response = await request(app).get(
        "/api/user/getUsers/65a92027165b61690f262ae2"
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("user");
    });
  
    it("POST /api/product/createProduct | Response with success message", async () => {
      const response = await request(app).post("/api/product/createProduct").send({
        productName: "fff",
        productPrice: "2424",
        productCategory: "shoes",
        productDescription: "dgbvfsdg", 
      });
      if (response.body.success) {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Product created successfully");
      } else {
        expect(response.body.success).toBe(false);
      
      }
    });







  



});