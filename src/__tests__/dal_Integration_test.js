import Dal from '../dal'
import LondonCitizen from '../londonCitizen'

/*
    This file is for integration test

    By default all tests are disable, you can switch on all tests or specific one
    When dal function are working dal_test.js to freeze dal function

    If all tests are enable the db should reset at the end (table truncated)
*/

const {
    AllTests = false,

    testConnection = false,
    testCreateCitizen = false,
    testGetCitizenData = false, //need to have testCreateCitizen true

    //variables for testing purpose :
    dal = new Dal(),
}

let {
    testingCitizen = new LondonCitizen(null, "John Smith", 34, 15, false),
    testingVictim = new LondonCitizen(null, "Jean-Kévin G@m3rz", 12, 23, true),
}


if (AllTests || testConnection) {
    test('Testing Connection', async () => {
        try {
            await dal.connect()
        } catch (error) {
            expect(error).toBeNull()
        }
    });
}

if (AllTests || testCreateCitizen) {
    test('Testing create citizen', async () => {

        try {
            expect(await dal.create(testingCitizen)).toReturnWith(testingCitizen) //True if we exclude id
        } catch (error) {
            expect(error).toBeNull()
        }
    });
}

if (AllTests || testGetCitizenData) {
    test('Testing example', async () => {

        try {
            const testingCitizen = new LondonCitizen(null, "toto", 12, 15, false)

            expect(await dal.create(testingCitizen)).toReturnWith(testingCitizen)
        } catch (error) {
            expect(error).toBeNull()
        }
    });
}
