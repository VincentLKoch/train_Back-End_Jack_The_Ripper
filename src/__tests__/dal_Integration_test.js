import Dal from '../dal'
import LondonCitizen from '../londonCitizen'

/*
    This file is for integration test

    By default all tests are disable, you can switch on all tests or specific one
    When dal function are working dal_test.js to freeze dal function

    If all tests are enable the db should reset at the end (table truncated)
*/


const AllTests = false

const testConnection = true
const testCreateCitizen = false
const testGetCitizenData = false //need to have testCreateCitizen true

//variables for testing purpose :
const dal = new Dal()


let testingCitizen = new LondonCitizen(null, "John Smith", 34, 15, false)
let testingVictim = new LondonCitizen(null, "Jean-Kévin G@m3rz", 12, 23, true)



if (AllTests || testConnection) {
    test('Testing Connection', async () => {
        let connection
        try {
            connection = await dal.connect()
        } catch (error) {
            expect(error).toBeNull()
        } finally {
            connection.close()
        }
    });
}

if (AllTests || testCreateCitizen) {
    test('Testing create citizen', async () => {
        try {
            //Test only if db return correctly, testingCitizen is automaticly update while saving (adding the id number)
            expect(await dal.create(testingCitizen)).toEqual(testingCitizen)
        } catch (error) {
            expect(error).toBeNull()
        }
    });
}

if (AllTests || testGetCitizenData) {
    test('Testing example', async () => {
        let result
        try {
            result = await dal.create(testingCitizen)
            expect().toReturnWith(testingCitizen)
        } catch (error) {
            expect(error).toBeNull()
        }
    });
}
