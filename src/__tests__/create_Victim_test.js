import { getLondon } from '../London'

describe('createVictim test', () => {
    let london

    beforeEach(() => {
        london = getLondon()
        london.dal.create = jest.fn().mockReturnValue(200)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it.each(
        [
            [0],
            [1],
            [-1],
            [12]
        ])(
            'When count equal %i',
            async (mockedCountResult) => {
                london.dal.countVictim = jest.fn().mockReturnValue(mockedCountResult)

                try {
                    expect(await london.createVictim("Jean-Kevin", 69, 420)).toBe(200)
                } catch (error) {

                    if (mockedCountResult !== 0) {
                        expect(error).toBe("already a Victim")
                    } else {
                        expect(error).toBeNull()
                    }
                }

                expect(london.dal.countVictim).toHaveBeenCalledTimes(1)
                if (mockedCountResult === 0) {
                    expect(london.dal.create).toHaveBeenCalledTimes(1)
                    expect(london.dal.create).toHaveBeenCalledWith({ id: null, isVictim: true, name: "Jean-Kevin", posX: 69, posY: 420 })
                }

            })
})