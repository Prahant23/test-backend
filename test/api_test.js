//fetching single product

it('/GET/spi/product/get_product/:id | Response should be json', async () =>{
    const response = await request (app)
    .get('/api/product/get_product/')
} )