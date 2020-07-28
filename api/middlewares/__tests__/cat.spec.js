const middleware = require('../cat')

const databaseAdapter = require('../../adapters/database')
jest.mock('../../adapters/database')

afterEach(jest.clearAllMocks)

describe('#cat middlewares', () => {
  const req = {
    body: {},
  }
  const res = {
    cookie: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn(),
    status: jest.fn(),
  }
  const next = jest.fn()

  describe('add(...)', () => {
    const mockCat = {
      breed: 'Maine Coon',
      eyeColor: 'Old Gold',
      name: 'Gramsci',
    }

    describe('when successful', () => {
      beforeEach(() => {
        databaseAdapter.addCat.mockResolvedValue(
          '31106574-97fa-429b-ab0a-05ecc5b8c264'
        )
      })

      it('calls database adapter to add the cat', async () => {
        await middleware.add(
          {
            body: {
              ...mockCat,
            },
          },
          res,
          next
        )
        expect(databaseAdapter.addCat).toHaveBeenCalledWith(
          expect.objectContaining({
            breed: 'Maine Coon',
            eyeColor: 'Old Gold',
            name: 'Gramsci',
          })
        )
      })

      it('returns the added cat with its new ID', async () => {
        await middleware.add(
          {
            body: {
              ...mockCat,
            },
          },
          res,
          next
        )

        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            id: '31106574-97fa-429b-ab0a-05ecc5b8c264',
            ...mockCat,
          })
        )
      })
    })

    describe('when failing', () => {
      const errorMessage = 'An unexpected error occurred when adding the cat.'
      beforeEach(() => {
        databaseAdapter.addCat.mockImplementation(() => {
          throw new Error(errorMessage)
        })
      })

      it('returns a 500 error if the underlying database layer throws an error', async () => {
        await middleware.add(
          {
            body: {
              ...mockCat,
            },
          },
          res,
          next
        )

        expect(res.statusCode).toBe(500)
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            message: errorMessage,
          })
        )

        expect(next).toHaveBeenCalledWith(new Error(errorMessage))
      })
    })
  })

  describe('all(...)', () => {
    const mockCats = [
      {
        breed: 'Maine Coon',
        eyeColor: 'Old Gold',
        name: 'Gramsci',
      },
      {
        breed: 'Shorthair',
        eyeColor: 'Metallic Ocean',
        name: 'Siki',
      },
    ]

    describe('when successful', () => {
      beforeEach(() => {
        databaseAdapter.getAllCats.mockResolvedValue(mockCats)
      })

      it('calls database adapter to fetch the cats', async () => {
        await middleware.all({}, res, next)
        expect(databaseAdapter.getAllCats).toBeCalledTimes(1)
      })

      it('returns the added cat with its new ID', async () => {
        await middleware.all({}, res, next)

        expect(res.send).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              name: 'Siki',
            }),
          ])
        )
      })
    })

    describe('when failing', () => {
      const errorMessage = 'An unexpected error occurred when adding the cat.'
      beforeEach(() => {
        databaseAdapter.getAllCats.mockImplementation(() => {
          throw new Error(errorMessage)
        })
      })

      it('returns a 500 error if the underlying database layer throws an error', async () => {
        await middleware.all({}, res, next)

        expect(res.statusCode).toBe(500)
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            message: errorMessage,
          })
        )

        expect(next).toHaveBeenCalledWith(new Error(errorMessage))
      })
    })
  })
})
