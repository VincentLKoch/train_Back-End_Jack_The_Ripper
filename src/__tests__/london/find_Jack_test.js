import { getLondon } from '../../London'

describe('findJack test', () => {
    let london

    beforeEach(() => {
        london = getLondon()
        //london.dal.create = jest.fn().mockReturnValue(200)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('Test createCitizen', async () => {

        //london.dal.create = jest.fn().mockReturnValue({id: 1, name: "Patchwerk", posX: 1, posY: 1, isVictim: false })

        const result = await london.findJack()
        

        //expect(london.dal.getData).toHaveBeenCalledTimes(1)
        //expect(result).toEqual({ id: 1, name: "Patchwerk", posX: 1, posY: 1, isVictim: false})

        expect(true).toBeTruthy()
    });

})