import request from 'supertest'
import app from '../../app'
import * as victimDependency from '../../London'

afterEach(() => {
    jest.clearAllMocks()
})

it('POST', async () => {
    const fakeResponse = { name: 'testName', posX: 10, posY: -12, isVictim: true }
    const createVictim = jest.fn().mockReturnValue(fakeResponse)

    victimDependency.getLondon = jest.fn().mockReturnValue({
        createVictim
    })

    await request(app)
        .post('/victim/testName/10/-12')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => {
            expect(response.body).toEqual(fakeResponse)
        })

    expect(createVictim).toHaveBeenCalledWith('testName', "10", "-12")
    expect(createVictim).toHaveBeenCalledTimes(1)
})


