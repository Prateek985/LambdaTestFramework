
import { test, expect } from '../../src/fixtures/apifixtures';


//helper - generic function - create a fresh user
async function createUser(reqresApiHelper: any) {
    let userData = 
       {
           "name": "oppo k15 pro",
           "data": {
                "year": 2024,
                "price": 20000.99,
                "CPU model": "media teck chip set",
                "Hard disk size": "2 TB"
            }
        }
    

    let response = await reqresApiHelper.post('/objects', userData);
    expect(response.status).toBe(200);
    return response.body;
}

//Test 1: Create a Product test + verify: AAA
//POST ---> productId --> GET /productId -- verify
test('@regression POST - create a Product', async ({ reqresApiHelper }) => {

    //create a user:
    let productResponse = await createUser(reqresApiHelper);

    //get the user:
    let response = await reqresApiHelper.get(`/objects/${productResponse.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("oppo k15 pro");

});

//Test 2: Update a product test + verify: AAA
//POST ---> productId --> PUT --> GET /productId -- verify
test('@regression PUT - update a product', async ({ reqresApiHelper }) => {
    //create a user: POST
    let productResponse = await createUser(reqresApiHelper);
    let productUpdatedData =   {
           "name": "oppo k15 pro",
           "data": {
                "year": 2024,
                "price": 16000.00,
                "CPU model": "media teck chip set",
                "Hard disk size": "5 TB"
            }
        }

    //update the user:
    let response = await reqresApiHelper.put(`/objects/${productResponse.id}`, productUpdatedData);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(productUpdatedData.name);
    expect(response.body.data.price).toBe(productUpdatedData.data.price);

    //get the user:
    let getResponse = await reqresApiHelper.get(`/objects/${productResponse.id}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(productUpdatedData.name);
    expect(getResponse.body.data.price).toBe(productUpdatedData.data.price);

});


//Test 3: Delete a product test + verify: AAA
//POST ---> productId --> DELETE(200) --> GET /productId -- verify(404)
test('@regression DELETE - delete a product', async ({ reqresApiHelper }) => {
    //create a user: POST
    let productResponse = await createUser(reqresApiHelper);

    //delete the product:
    let response = await reqresApiHelper.delete(`/objects/${productResponse.id}`);
    expect(response.status).toBe(200);

    //get the product:
    let getResponse = await reqresApiHelper.get(`/objects/${productResponse.id}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.error).toBe(`Object with id=${productResponse.id} was not found.`);
    
});


//Test 4: Patch a product test + verify: AAA
//POST ---> productId --> PATCH(200) --> GET /productId -- verify(200)
test('@regression PATCH - update a product', async ({ reqresApiHelper }) => {
    //create a user: POST
    let productResponse = await createUser(reqresApiHelper);
    let productPatchUpdated = {
   "name": "oppo k15 pro",
   "data": {
      "year": 2024,
      "price": 16000.00,
      "CPU model": "media teck chip set",
      "Hard disk size": "5 TB"
   }
}

    //update the user:
    let response = await reqresApiHelper.Patch(`/objects/${productResponse.id}`, productPatchUpdated);
    expect(response.status).toBe(200);

    //get the user:
    let getResponse = await reqresApiHelper.get(`/objects/${productResponse.id}`);
    expect(getResponse.status).toBe(200);
   
});