import request from 'supertest'
import app from '../../app'
import * as victimDependency from '../../London'

afterEach(() => {
    jest.clearAllMocks()
})

it('DELETE', async () => {
    const removeEvidences = jest.fn()

    victimDependency.getLondon = jest.fn().mockReturnValue({
        removeEvidences
    })

    await request(app)
        .delete('/evidences')
        .expect(204)

    expect(removeEvidences).toHaveBeenCalledTimes(1)
})
