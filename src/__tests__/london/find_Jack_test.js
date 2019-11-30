import { getLondon } from '../../London'
import LondonCitizen from '../../londonCitizen'

describe('findJack test', () => {
    let london

    beforeEach(() => {
        london = getLondon()
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    test("temp", async () => {
        //console.error(await london.dal.getData(true))
        //console.error(!await london.dal.getData(true))
        //expect(true).toBeFalsy()
    })


    it.each(
        [

            [ //Should work
                null,
                [{
                    id: 12,
                    name: "Jean-Kevin G@m3rZ",
                    posX: 10,
                    posY: 10,
                    isVictim: true
                }],
                [
                    {
                        id: 666,
                        name: 'Jack',
                        posX: 12,
                        posY: 11,
                        isVictim: false
                    },
                    {
                        id: 1043,
                        name: 'Santa',
                        posX: -99999,
                        posY: 99999,
                        isVictim: false
                    }
                ],
                {
                    "id": 666,
                    "isVictim": false,
                    "name": "Jack",
                    "posX": 12,
                    "posY": 11
                }
            ],

            [
                "No Victim",
                [],
                [
                    {
                        id: 666,
                        name: 'Jack',
                        posX: 12,
                        posY: 11,
                        isVictim: false
                    },
                ],
                null,
            ],

            [
                "No Citizen",
                [{
                    id: 12,
                    name: "Jean-Kevin G@m3rZ",
                    posX: 10,
                    posY: 10,
                    isVictim: true
                }],
                [],
                null,
            ],
            [
                "Two Jack ?",
                [{
                    id: 12,
                    name: "Jean-Kevin G@m3rZ",
                    posX: 10,
                    posY: 10,
                    isVictim: true
                }],
                [
                    {
                        id: 6,
                        name: 'Jaquie',
                        posX: 12,
                        posY: 11,
                        isVictim: false
                    },
                    {
                        id: 9,
                        name: 'Micheal',
                        posX: 12,
                        posY: 11,
                        isVictim: false
                    }
                ],
                null,
            ]

        ])(
            'Finding Jack, Expected Error: %s',
            async (expectedError, mockedVictims, mockedCitizens, expectedResult) => {
                //init
                london.dal.getData = jest.fn(victim => {
                    if (victim) { return mockedVictims }
                    return mockedCitizens
                })

                try {
                    expect(await london.findJack()).toStrictEqual(expectedResult)

                } catch (error) {
                    if (expectedError) {
                        expect(error).toEqual(expectedError)
                    } else {
                        expect(error).toBeNull()
                    }
                }

                if (!(mockedVictims.length > 0)) {
                    expect(london.dal.getData).toHaveBeenCalledTimes(1)
                } else {
                    expect(london.dal.getData).toHaveBeenCalledTimes(2)
                    expect(london.dal.getData).toHaveBeenCalledWith(false)
                }
                expect(london.dal.getData).toHaveBeenCalledWith(true)
            })
})
