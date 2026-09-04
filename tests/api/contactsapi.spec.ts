
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
