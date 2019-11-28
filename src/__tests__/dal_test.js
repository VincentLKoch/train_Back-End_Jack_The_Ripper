import Dal from '../dal'


//List of the typeOrm functions dal is using, by default all function return the list
// so connection.createQueryBuilder().where()... = MockedFunctions, We only change getOne / get Many in differents tests
const MockedFunctions = {

    getRepository: jest.fn().mockReturnThis(MockedFunctions),
    createQueryBuilder: jest.fn().mockReturnThis(MockedFunctions),
    where: jest.fn().mockReturnThis(MockedFunctions),
    andWhere: jest.fn().mockReturnThis(MockedFunctions),

    getOne: jest.fn().mockReturnThis(MockedFunctions),
    getMany: jest.fn().mockReturnThis(MockedFunctions),
}



describe('DAL test', () => {
    let dal

    beforeEach(() => {
        dal = new Dal()
        dal.connect = jest.fn().mockReturnValue(MockedFunctions)
    })


    it('should fetch users', async () => {
        //We mock the getOne (last call to db to return our value)
        MockedFunctions.getOne = jest.fn().mockReturnValue(42)

        //dal.FunctionToBeTested

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
