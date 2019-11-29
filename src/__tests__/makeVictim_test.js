import { getLondon } from '../London'

describe('makeVictim test', () => {
    let london

    beforeEach(() => {
        london = getLondon()

    })

    it('The victim is made', async () => {
        try {

            london.dal.getCitizen = jest.fn()
                .mockReturnValue({ id: 1, name: "Toto", posX: 1, posY: 1, isVictim: false });
            london.dal.makeCitizenVictim = jest.fn()

            await london.makeVictim("Toto", 1, 1)

            expect(london.dal.getCitizen).toHaveBeenCalledWith("Toto", 1, 1)
            expect(london.dal.makeCitizenVictim).toHaveBeenCalledWith(1)
            expect(london.victimExists).toBe(true)

        } catch (error) {
            expect(error).toBeNull()
        }

    });

    it('There is already a victim', async () => {
        try {
            london.dal.getCitizen = jest.fn()
                .mockReturnValue({ id: 1, name: "Toto", posX: 1, posY: 1, isVictim: false });
            london.victimExists = true
            await london.makeVictim("Toto", 1, 1)

        } catch (error) {
            expect(error).toBe("vic1") //Victim already exists
        }
        expect(london.dal.getCitizen).toHaveBeenCalledTimes(1)
    });

    it('There incorrect position given', async () => {
        try {
            london.dal.getCitizen = jest.fn()
                .mockReturnValue({ id: 1, name: "Toto", posX: 2, posY: 2, isVictim: false });
                london.victimExists = false
                await london.makeVictim("Toto", 1, 1)

        } catch (error) {
            expect(error).toBe("vic2") //incorrect position given
        }
        expect(london.dal.getCitizen).toHaveBeenCalledTimes(1)
    });

})