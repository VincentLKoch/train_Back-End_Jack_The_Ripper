import request from 'supertest'
import app from '../../app'
import * as victimDependency from '../../London'

afterEach(() => {
    jest.clearAllMocks()
})

it('Working post', async () => {
    const fakeResponse = { name: 'testName', posX: 10, posY: -12, isVictim: true }
    const createVictim = jest.fn().mockReturnValue(fakeResponse)

    victimDependency.getLondon = jest.fn().mockReturnValue({
        createVictim
    })
    try {
        await request(app)
            .post('/victim/testName/10/-12')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual(fakeResponse)
            })
    } catch (err) {
        expect(err).toBeNull()
    }
    expect(createVictim).toHaveBeenCalledWith('testName', "10", "-12")
    expect(createVictim).toHaveBeenCalledTimes(1)
})


it.each(
    [
        ["posX not int", '/victim/testName/ten/-12'],
        ["posY not int", '/victim/testName/10/twelve'],
    ])(
        'bad request: %s',
        async (description, testURL) => {
            const splittedURL = testURL.split('/')
            const fakeResponse = {
                message: "Bad request, We need both posX and posY to be non-null integer",
                receive: {
                    name: splittedURL[2],
                    posX: splittedURL[3],
                    posY: splittedURL[4],
                }
            }

            const createVictim = jest.fn().mockReturnValue(fakeResponse)
            victimDependency.getLondon = jest.fn().mockReturnValue({
                createVictim
            })

            let response
            try {

                response = await request(app).post(testURL)

                expect(response.status).toBe(400)
                expect(response.body).toEqual(fakeResponse)

                //expect(response.type).toBe(/json/)
            } catch (err) {
                expect(err).toBeNull()
            }

            expect(createVictim).toHaveBeenCalledTimes(0)


        })


test("already a Victim", async () => {
    const fakeResponse = {
        message: "There is already a victim",
        receive: {
            name: 'testName',
            posX: "10",
            posY: "-12",
        },
    }
    const createVictim = jest.fn(() => { throw "already a Victim" })

    victimDependency.getLondon = jest.fn().mockReturnValue({
        createVictim
    })
    try {
        await request(app)
            .post('/victim/testName/10/-12')
            .expect(409)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual(fakeResponse)
            })
    } catch (err) {
        expect(err).toBeNull()
    }
    expect(createVictim).toHaveBeenCalledWith('testName', "10", "-12")
    expect(createVictim).toHaveBeenCalledTimes(1)
})
