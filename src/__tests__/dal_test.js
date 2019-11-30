import Dal from '../dal'
import LondonCitizen from '../londonCitizen'

describe('Data Access Layer', () => {
    let dal
    let typeormMocked

    beforeEach(() => {

        /*
            List of the typeOrm functions dal is using
            All function is default mocked to return the object, we change in differents tests.
        */
        typeormMocked = {

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
            save: jest.fn().mockReturnThis(typeormMocked),
            getOne: jest.fn().mockReturnThis(typeormMocked),
            getMany: jest.fn().mockReturnThis(typeormMocked),

            close: jest.fn().mockReturnThis(typeormMocked),
        }


        //mocking connection :
        dal = new Dal()
        dal.connect = jest.fn().mockReturnValue(typeormMocked)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('create(newCitizen)', async () => {

        //we check that last function called is save :
        typeormMocked.save = jest.fn().mockReturnValue(42)

        try {

            const result = await dal.create({ dummy: "test" })

            expect(result).toBe(42)
        } catch (error) {
            expect(error).toBeNull()
        }
        
        expect(typeormMocked.save).toHaveBeenCalledWith({ dummy: "test" })
        expect(typeormMocked.close).toHaveBeenCalledTimes(1)
    });



})
