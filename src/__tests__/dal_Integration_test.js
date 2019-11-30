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
const testCountVictim = true
const testCreateCitizen = false
const testCreateVictim = false
const testGetData = true
const testRemoveAll = false


//variables for testing purpose :
const dal = new Dal()

const testingCitizen = new LondonCitizen(null, "John Smith", 34, 15, false)
const testingVictim = new LondonCitizen(null, "Jean-Kevin G@m3rz", 12, 23, true)

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

if (AllTests || testCountVictim) {
    test('Testing create citizen', async () => {
        try {
            const count = await dal.countVictim()

            //expect(count).toEqual(1) //check number of victim in db before and change the number
            expect(typeof count).toBe('number')
        } catch (error) {
            expect(error).toBeNull()
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


if (AllTests || testCreateVictim) {
    test('Testing create victim', async () => {
        try {
            //Test only if db return correctly, testingCitizen is automaticly update while saving (adding the id number)
            expect(await dal.create(testingVictim)).toEqual(testingVictim)
        } catch (error) {
            expect(error).toBeNull()
        }
    });
}


//only test if there is an error
if (AllTests || testGetData) {
    test('Testing example', async () => {
        try {
            await dal.getData(true)
            await dal.getData(false)
        } catch (error) {
            expect(error).toBeNull()
        }
    });
}

if (AllTests || testRemoveAll) {
    test('Testing removeAll()', async () => {
        let result
        try {
            result = await dal.removeAll()
            expect(result['warningStatus']).toBe(0)
        } catch (error) {
            expect(error).toBeNull()
        }
    });
}