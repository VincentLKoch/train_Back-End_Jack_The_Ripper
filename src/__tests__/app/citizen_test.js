import request from 'supertest'
import app from '../../app'
import * as citizenDependency from '../../London'

afterEach(() => {
    jest.clearAllMocks()
})

it('Working post', async () => {
    const fakeResponse = { name: 'testName', posX: 10, posY: -12, iscitizen: true }
    const createCitizen = jest.fn().mockReturnValue(fakeResponse)

    citizenDependency.getLondon = jest.fn().mockReturnValue({
        createCitizen
    })
    try {
        await request(app)
            .post('/citizen/testName/10/-12')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual(fakeResponse)
            })
    } catch (err) {
        expect(err).toBeNull()
    }
    expect(createCitizen).toHaveBeenCalledWith('testName', "10", "-12")
    expect(createCitizen).toHaveBeenCalledTimes(1)
})


it.each(
    [
        ["posX not int", '/citizen/testName/ten/-12'],
        ["posY not int", '/citizen/testName/10/twelve'],
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

            const createCitizen = jest.fn().mockReturnValue(fakeResponse)
            citizenDependency.getLondon = jest.fn().mockReturnValue({
                createCitizen
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

            expect(createCitizen).toHaveBeenCalledTimes(0)


        })
