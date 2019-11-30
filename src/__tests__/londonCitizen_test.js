import LondonCitizen from '../londonCitizen'
describe('londonCItizen test', () => {

    it('constructor test', () => {

        const londonCItizen = new LondonCitizen(1, "Toto", 1, 1, false)

        expect(londonCItizen.id).toBe(1)
        expect(londonCItizen.name).toBe("Toto")
        expect(londonCItizen.posX).toBe(1)
        expect(londonCItizen.posY).toBe(1)
        expect(londonCItizen.isVictim).toBe(false)
    })
})
