import Dal from '../dal'
import LondonCitizen from '../londonCitizen'


//List of the typeOrm functions dal is using
//All function is default mocked to return the object, we change in differents tests.
const typeormMocked = {

    getRepository: jest.fn(function (call) {
        if (call === LondonCitizen) {
            return typeormMocked
        }
        throw "Wrong Repository Called !"
    }),

    createQueryBuilder: jest.fn().mockReturnThis(typeormMocked),
    update: jest.fn().mockReturnThis(typeormMocked),

    where: jest.fn().mockReturnThis(typeormMocked),
    andWhere: jest.fn().mockReturnThis(typeormMocked),

    query: jest.fn().mockReturnThis(typeormMocked),
    set: jest.fn().mockReturnThis(typeormMocked),


    execute: jest.fn().mockReturnThis(typeormMocked),
    getOne: jest.fn().mockReturnThis(typeormMocked),
    getMany: jest.fn().mockReturnThis(typeormMocked),

    close: jest.fn().mockReturnThis(typeormMocked),
}


describe('Data Access Layer', () => {
    let dal

    beforeEach(() => {

        //mocking connection :
        dal = new Dal()
        dal.connect = jest.fn().mockReturnValue(typeormMocked)
    })


    it('Testing example', async () => {
        //We mock the getOne (last call to db to return our value)
        typeormMocked.getOne = jest.fn().mockReturnValue(42)

        //dal.FunctionToBeTested

        //example of the inside of one dal.function:
        try {
            const connection = await dal.connect()
            const result = connection
                .getRepository(LondonCitizen)
                .createQueryBuilder("londonCitizen")
                .where("TODO")
                .getOne();
            connection.close()

            expect(result).toBe(42)
        } catch (error) {
            expect(error).toBeNull()
        }

        expect(typeormMocked.close).toHaveBeenCalledTimes(1)
    });


    it('create(newCitizen)', async () => {

        const testingCitizen = new LondonCitizen(null, name, posX, posY, false)

        //We mock the getOne (last call to db to return our value)
        typeormMocked.getOne = jest.fn().mockReturnValue(42)

        //dal.FunctionToBeTested

        //example of the inside of one dal.function:
        try {
            const connection = await dal.connect()
            const result = connection
                .getRepository(LondonCitizen)
                .createQueryBuilder("londonCitizen")
                .where("Whatever")
                .getOne();
            connection.close()



            expect(result).toBe(42)
        } catch (error) {
            expect(error).toBeNull()
        }

        expect(typeormMocked.close).toHaveBeenCalledTimes(1)
    });



})
