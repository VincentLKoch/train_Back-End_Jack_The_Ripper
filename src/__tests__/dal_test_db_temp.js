import Dal from '../dal'
import LondonCitizen from '../londonCitizen'

let dal

//Temps file to do integration test on dal function
test('Testing example', async () => {

    try {
        const testingCitizen = new LondonCitizen(null, "toto", 12, 15, false)

        dal = new Dal()
        //console.error(await dal.create(testingCitizen))

    } catch (error) {
        expect(error).toBeNull()
    }

});