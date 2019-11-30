import { getLondon } from '../../London'


test('removeEvidences test', async () => {
    const london = getLondon()
    london.dal.removeAll = jest.fn()

    await london.removeEvidences()

    expect(london.dal.removeAll).toHaveBeenCalledTimes(1)
});
