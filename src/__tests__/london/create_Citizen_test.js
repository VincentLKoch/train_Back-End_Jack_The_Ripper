import { getLondon } from '../../London'

describe('createCitizen test', () => {
    let london

    beforeEach(() => {
        london = getLondon()
    })

    it('Test createCitizen', async () => {
        
        london.dal.create = jest.fn()
            .mockReturnValue({id: 1, name: "Patchwerk", posX: 1, posY: 1, isVictim: false })

        const result = await london.createCitizen("Patchwerk", 1, 1)

        expect(london.dal.create).toHaveBeenCalledTimes(1)
        expect(result).toEqual({ id: 1, name: "Patchwerk", posX: 1, posY: 1, isVictim: false})
    });


    it('Test create second', async () => {
        london.dal.create = jest.fn()
            .mockReturnValue({id: 2, name: "Dummy", posX: -241, posY: 420, isVictim: false })

        const result = await london.createCitizen("Dummy", 3, 4)

        expect(london.dal.create).toHaveBeenCalledTimes(1)
        expect(result).toEqual({ id: 2, name: "Dummy", posX: -241, posY: 420, isVictim: false})
    });

})
