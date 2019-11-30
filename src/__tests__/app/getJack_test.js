import request from 'supertest'
import app from '../../app'
import * as victimDependency from '../../London'


afterEach(() => {
    jest.clearAllMocks()
})

describe('getJack Tests', () => {

it('getVictim is successful', async () => {
    const fakeResponse = { name: 'testName', posX: 10, posY: -12, isVictim: false }
    const findJack = jest.fn().mockReturnValue(fakeResponse)

    victimDependency.getLondon = jest.fn().mockReturnValue({
        findJack
    })
    try{
    await request(app)
        .get('/getJack')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => {
            expect(response.body).toEqual(fakeResponse)
        })} catch (err) {
            expect(err).toBeNull()}

    expect(findJack).toHaveBeenCalledTimes(1)
})

it('No victim is found', async () => {
    const fakeResponse = {message: "Victim not found"}
    const findJack = jest.fn().mockImplementation(() => {
        throw "No Victim";
      });

    victimDependency.getLondon = jest.fn().mockReturnValue({
        findJack 
    })
    try{
    await request(app)
        .get('/getJack')
        .expect(404)
        .expect(response => {
            expect(response.body).toEqual(fakeResponse)
        })} catch (err) {
            expect(err).toBeNull()}

    expect(findJack).toHaveBeenCalledTimes(1)
})

it('No citizen is found', async () => {
    const fakeResponse = {message: "Citizens not found"}
    const findJack = jest.fn().mockImplementation(() => {
        throw "No Citizen";
      });

    victimDependency.getLondon = jest.fn().mockReturnValue({
        findJack 
    })
    try{
    await request(app)
        .get('/getJack')
        .expect(404)
        .expect(response => {
            expect(response.body).toEqual(fakeResponse)
        })} catch (err) {
            expect(err).toBeNull()}

    expect(findJack).toHaveBeenCalledTimes(1)
})

it('2 Jacks are found', async () => {
    const fakeResponse = {message: "At least 2 citizens are closest"}
    const findJack = jest.fn().mockImplementation(() => {
        throw "Two Jack ?";
      });

    victimDependency.getLondon = jest.fn().mockReturnValue({
        findJack 
    })
  
    
    await request(app)
        .get('/getJack')
        .expect(409)
        .expect(response => {
            expect(response.body).toEqual(fakeResponse)
        })

    expect(findJack).toHaveBeenCalledTimes(1)
})

it('Unkown error', async () => {
    const fakeResponse = {message: "Unknown Error"}
    const findJack = jest.fn().mockImplementation(() => {
        throw "someError";
      });

    victimDependency.getLondon = jest.fn().mockReturnValue({
        findJack 
    })
    try{
    await request(app)
        .get('/getJack')
        .expect(418)
        .expect(response => {
            expect(response.body).toEqual(fakeResponse)
        })} catch (err) {
            expect(err).toBeNull()}

    expect(findJack).toHaveBeenCalledTimes(1)
})

})


