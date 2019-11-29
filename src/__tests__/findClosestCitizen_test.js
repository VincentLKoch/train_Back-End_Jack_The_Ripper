import { getLondon } from '../London'

describe('findClosestCitizen test', () => {
    let london

    beforeEach(() => {
        london = getLondon()

    })

    it('The closest citizen is found', async () => {
        try {
            const mockedValues = [{posX: 1, posY: 1}, 
                                 [{posX: 2, posY: 2}, {posX: 3, posY: 3}, {posX: 4, posY: 4}]]
            london.dal.seperateVictimAndCitizens = jest.fn()
                .mockReturnValue(mockedValues);

            const jack = await london.findClosestCitizen()

            expect(london.dal.seperateVictimAndCitizens).toHaveBeenCalledTimes(1)
            expect(jack).toEqual({posX: 2, posY: 2})

        } catch (error) {
            expect(error).toBeNull()
        }
    });

    it('There is no victim', async () => {
        try {
           const mockedValues = [null, 
                                 [{posX: 2, posY: 2}, {posX: 3, posY: 3}, {posX: 4, posY: 4}]]
            london.dal.seperateVictimAndCitizens = jest.fn()
                .mockReturnValue(mockedValues);

            await london.findClosestCitizen()
        } catch (error) {
            expect(error).toBe("fin1") //Victim does not exist
        }
        expect(london.dal.seperateVictimAndCitizens).toHaveBeenCalledTimes(1)
    });

    it('There are no citizens', async () => {
        try {
            const mockedValues = [{posX: 1, posY: 1}, 
                                  null]
             london.dal.seperateVictimAndCitizens = jest.fn()
                 .mockReturnValue(mockedValues);
 
             await london.findClosestCitizen()
         } catch (error) {
             expect(error).toBe("fin2") //Citizens do not  exist
         }
         expect(london.dal.seperateVictimAndCitizens).toHaveBeenCalledTimes(1)
     });
 
     it('Two closest citizen are found', async () => {
        try {
            const mockedValues = [{posX: 1, posY: 1}, 
                                 [{posX: 2, posY: 2}, {posX: 2, posY: 2}, {posX: 4, posY: 4}]]
            london.dal.seperateVictimAndCitizens = jest.fn()
                .mockReturnValue(mockedValues);

            const jack = await london.findClosestCitizen()

        } catch (error) {
            expect(error).toBe("fin3") //More than one closest citizen
        }
        expect(london.dal.seperateVictimAndCitizens).toHaveBeenCalledTimes(1)
    });
})