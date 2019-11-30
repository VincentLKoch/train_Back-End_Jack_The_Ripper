import request from 'supertest'
import app from '../../app'

import * as citizenDependency from '../../London'

const NAME = 'Elias Parker'
const POSX = 18
const POSY = -2

const POSX2 = 16
const POSY2 = 0

beforeEach(() => {
    citizenDependency.getLondon = jest.fn().mockReturnValue({
        createCitizen: jest.fn()
    })
})

afterEach(() => {
    jest.resetAllMocks()
})

describe('Citizen Tests', () => {
    it('When data is fine', (done) => {
        const query = {
            name: NAME,
            posX: POSX,
            posY: POSY
        }

        const expectedResponseBody = {
            LondonCitizen: {
                id: 1,
                name: NAME,
                posX: "POSX",
                posY: "POSY"
            }
        }

        const createCitizen = jest.fn().mockReturnValue(expectedResponseBody)

        citizenDependency.getLondon.mockReturnValue({
            createCitizen
        })

        request(app)
            .post('/citizen/name/123/456')
            .query(query)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual(expectedResponseBody)
                expect(createCitizen).toHaveBeenCalledTimes(1)
                expect(createCitizen).toHaveBeenCalledWith(NAME, '' + POSX, '' + POSY)
            })
            .end(done)
    })


    it('When PosX parameter is not a int', (done) => {
        const query = {
            name: NAME,
            posX: POSX2,
            posY: POSY
        }

        const expectedResponseBody = {
            message: "Bad request, We need both posX and posY to be non-null integer",
            receive: {
                name: 'Elias Parker',
                posX: 16,
                posY: -2
            }

        }

        const message = jest.fn().mockReturnValue(expectedResponseBody)
        const receive = jest.fn().mockReturnValue(expectedResponseBody)
        const createCitizen = jest.fn().mockReturnValue(expectedResponseBody)

        citizenDependency.getLondon.mockReturnValue({
            message,
            receive,
        })

        request(app)
            .post('/citizen/name/123/456')
            .query(query)
            .expect(400)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual(expectedResponseBody)
                expect(createCitizen).toHaveBeenCalledTimes(0)
            })
            .end(done)
    })

    it('When PosY parameter equal 0', (done) => {
        const query = {
            name: NAME,
            posX: POSX,
            posY: POSY2
        }

        const expectedResponseBody = {
            message: "Bad request, We need both posX and posY to be non-null integer",
            receive: {
                name: 'Elias Parker',
                posX: "18",
                posY: "0"
            }

        }

        const message = jest.fn().mockReturnValue(expectedResponseBody)
        const receive = jest.fn().mockReturnValue(expectedResponseBody)
        const createCitizen = jest.fn().mockReturnValue(expectedResponseBody)

        citizenDependency.getLondon.mockReturnValue({
            message,
            receive,
        })

        request(app)
            .post('/citizen/name/123/456')
            .query(query)
            .expect(400)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toEqual(expectedResponseBody)
                expect(createCitizen).toHaveBeenCalledTimes(0)
            })
            .end(done)
    })

})