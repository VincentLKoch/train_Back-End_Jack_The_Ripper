import Dal from '../dal'


//List of the typeOrm functions dal is using, by default all function return the list
// so connection.createQueryBuilder().where()... = MockedFunctions, We only change getOne / get Many in differents tests
const typeormMocked = {
    getRepository: jest.fn().mockReturnThis(typeormMocked),
    createQueryBuilder: jest.fn().mockReturnThis(typeormMocked),
    where: jest.fn().mockReturnThis(typeormMocked),
    andWhere: jest.fn().mockReturnThis(typeormMocked),

    getOne: jest.fn().mockReturnThis(typeormMocked),
    getMany: jest.fn().mockReturnThis(typeormMocked),
}




describe('DAL test', () => {
    let dal

    beforeEach(() => {
        dal = new Dal()
        dal.connect = jest.fn().mockReturnValue(typeormMocked)
    })


    it('Example', async () => {
        //We mock the getOne (last call to db to return our value)
        typeormMocked.getOne = jest.fn().mockReturnValue(42)

        //dal.FunctionToBeTested

        //example of the inside of one dal.function:
        try {
            const connection = await dal.connect()
            const result = connection
                .getRepository("Envelope")
                .createQueryBuilder("envelope")
                .where("envelope.idStack IS NULL")
                .getOne();


            expect(result).toBe(42)
        } catch (error) {
            expect(error).toBeNull()
        }
    });

})
