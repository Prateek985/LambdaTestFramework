
import { test, expect } from '../../src/fixtures/apifixtures';
import process from "process";


const TOKEN = process.env.SECOND_API_TOKEN!;
let AUTH_HEADER = {
    Authorization: `${TOKEN}`,
};

//helper - generic function - create a fresh user
async function createUser(contactsApiHelper: any) {
    let userData = {
        "firstName": "mike",
        "lastName": "duke",
        "birthdate": "1974-01-01",
        "email": `automation_${Date.now()}@open.com`,
        "phone": "8541269787",
        "street1": "Electronic city",
        "street2": "Apartment A",
        "city": "Banglore",
        "stateProvince": "KS",
        "postalCode": "485961",
        "country": "IND"
    };

    let response = await contactsApiHelper.post('/contacts', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}

//Test 1: Create a user test + verify: AAA
//POST ---> userId --> GET /userId -- verify
test('@regression POST - create a Contact user', async ({ contactsApiHelper }) => {

    //create a user:
    let userResponse = await createUser(contactsApiHelper);

    //get the user:
    let response = await contactsApiHelper.get(`/contacts/${userResponse._id}`, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe("mike");

});

//Test 2: Update a user test + verify: AAA
//POST ---> userId --> PUT --> GET /userId -- verify
test('@regression PUT - update a Contact user', async ({ contactsApiHelper }) => {
    //create a user: POST
    let userResponse = await createUser(contactsApiHelper);
    let userUpdatedData = {
        "firstName": "Disha",
        "lastName": "sharma",
        "birthdate": "1974-01-01",
        "phone": "8541269787",
        "street1": "Raipur",
        "street2": "chhattishgarh",
        "city": "Raipur",
        "stateProvince": "RAI",
        "postalCode": "485961",
        "country": "IND"
    };

    //update the user:
    let response = await contactsApiHelper.put(`/contacts/${userResponse._id}`, userUpdatedData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe(userUpdatedData.firstName);

    //get the user:
    let getResponse = await contactsApiHelper.get(`/contacts/${userResponse._id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.firstName).toBe(userUpdatedData.firstName);

});


//Test 3: Patch a user test + verify: AAA
//POST ---> userId --> PATCH(200) --> GET /userId -- verify(200)
test('@regression PATCH - update a user', async ({ contactsApiHelper }) => {
    //create a user: POST
    let userResponse = await createUser(contactsApiHelper);
    let contactPatchData = {
        "phone": "9652140389",
        "street1": "Gudhiyari",
        "street2": "chhattishgarh",
        "city": "Raipur",
        "stateProvince": "RAI",
        "postalCode": "492001",
        "country": "IND"
    };

    //update the user:
    let response = await contactsApiHelper.Patch(`/contacts/${userResponse._id}`,contactPatchData, AUTH_HEADER);
    expect(response.status).toBe(200);

    //get the user:
    let getResponse = await contactsApiHelper.get(`/contacts/${userResponse._id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
   // expect(getResponse.body.message).toBe('Resource not found');
});

//Test 4: Delete a user test + verify: AAA
//POST ---> userId --> DELETE(204) --> GET /userId -- verify(404)
test('@regression DELETE - delete a Contact User', async ({ contactsApiHelper }) => {
    //create a Contact User: POST
    let userResponse = await createUser(contactsApiHelper);

    //Delete a  Contact User:
    let response = await contactsApiHelper.delete(`/contacts/${userResponse._id}`, AUTH_HEADER);
    expect(response.status).toBe(200);
    

    //get a Contact User:
    let getResponse = await contactsApiHelper.get(`/contacts/${userResponse._id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    
});
