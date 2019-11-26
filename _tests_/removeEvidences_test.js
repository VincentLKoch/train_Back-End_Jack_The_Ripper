import { getLondon } from '../London'

describe('removeEvidences test', () => {
    let london

    beforeEach(() => {
        london = getLondon()
    })

    it('Test createCitizen', async () => {
        
        london.dal.removeAll = jest.fn()
        
        await london.removeEvidences()

        expect(london.dal.removeAll).toHaveBeenCalledTimes(1)
        
    });
})