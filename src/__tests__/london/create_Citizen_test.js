import { getLondon } from '../../London'

describe('createCitizen test', () => {
    let london

    beforeEach(() => {
        london = getLondon()
    })

    it('Test createCitizen', async () => {
        
        london.dal.create = jest.fn()
            .mockReturnValue({id: 1, name: "Toto", posX: 1, posY: 1, isVictim: false })

        const result = await london.createCitizen("Toto", 1, 1)

        expect(london.dal.create).toHaveBeenCalledTimes(1)
        expect(result).toEqual({ id: 1, name: "Toto", posX: 1, posY: 1, isVictim: false})
    });


    it('Test create second', async () => {
        london.dal.create = jest.fn()
            .mockReturnValue({id: 2, name: "Toto", posX: 3, posY: 4, isVictim: false })

        const result = await london.createCitizen("Toto", 3, 4)

        expect(london.dal.create).toHaveBeenCalledTimes(1)
        expect(result).toEqual({ id: 2, name: "Toto", posX: 3, posY: 4, isVictim: false})
    });

})
