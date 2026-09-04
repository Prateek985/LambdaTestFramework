import { test as baseTest } from '@playwright/test';
import { ApiHelper } from '../api/ApiHelper';
import { ContactsApiHelper } from '../api/secondApiHelper';
import process from 'process';


//define types for API fixtures:
type ApiFixtures = {
    apiHelper: ApiHelper;
    contactsApiHelper: ContactsApiHelper; // or SecondApiHelper
}


export let test = baseTest.extend<ApiFixtures>({

    apiHelper: async ({ request }, use) => {
        let apiHelper = new ApiHelper(
            request,
            process.env.API_BASE_URL!
        );
        await use(apiHelper);
    },
 
    // Second API fixture using a different base URL environment variable
  contactsApiHelper: async ({ request }, use) => {
    let contactsApiHelper = new ContactsApiHelper(
      request,
      process.env.SECOND_API_BASE_URL!
    );
    await use(contactsApiHelper);
  },


});

export { expect } from '@playwright/test';