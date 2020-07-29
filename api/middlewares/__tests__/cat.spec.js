const middleware = require('../cat')

const databaseAdapter = require('../../adapters/database')
jest.mock('../../adapters/database')

afterEach(jest.clearAllMocks)

describe('#cat middlewares', () => {
  const req = {
    body: {},
    params: {},
  }
  const res = {
    cookie: jest.fn(),
    redirect: jest.fn(),
    send: jest.fn(),
    status: jest.fn(),
  }
  const next = jest.fn()

  const mockData = {
    cat: {
      breed: 'Maine Coon',
      eyeColor: 'Old Gold',
      name: 'Gramsci',
    },
    catHavingId: {
      id: '9761bfd0-2789-4a68-999e-7c832bc886bf',
      breed: 'Maine Coon',
      eyeColor: 'Old Gold',
      name: 'Gramsci',
    },
  }

  describe('add(...)', () => {
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
              ...mockData.cat,
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
              ...mockData.cat,
            },
          },
          res,
          next
        )

        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            id: '31106574-97fa-429b-ab0a-05ecc5b8c264',
            ...mockData.cat,
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
              ...mockData.cat,
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

  describe('del(...)', () => {
    describe('when successful', () => {
      beforeEach(() => {
        databaseAdapter.getCatById.mockResolvedValue({
          id: mockData.catHavingId.id,
        })
        databaseAdapter.deleteCat.mockResolvedValue()
      })

      it('calls database adapter to delete the cat', async () => {
        await middleware.del(
          { params: { id: mockData.catHavingId.id } },
          res,
          next
        )
        expect(databaseAdapter.deleteCat).toHaveBeenCalledWith(
          mockData.catHavingId.id
        )
      })

      it('returns an empty object', async () => {
        await middleware.del(
          { params: { id: mockData.catHavingId.id } },
          res,
          next
        )
        expect(res.send).toHaveBeenCalledWith({})
      })
    })

    describe('when failing', () => {
      const errorMessage = 'An unexpected error occurred when deleting the cat.'
      beforeEach(() => {
        databaseAdapter.getCatById.mockResolvedValueOnce(mockData.catHavingId)
        databaseAdapter.getCatById.mockResolvedValueOnce(null)
        databaseAdapter.deleteCat.mockImplementation(() => {
          throw new Error(errorMessage)
        })
      })

      it('returns a 500 error if the underlying database layer throws an error', async () => {
        await middleware.del(
          { params: { id: mockData.catHavingId.id } },
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

      it('returns a 404 when trying to delete a non-existing cat', async () => {
        await middleware.del(
          { params: { id: mockData.catHavingId.id } },
          res,
          next
        )
        const errorMessage = `Could not find any cat having ID ${mockData.catHavingId.id}.`

        expect(res.statusCode).toBe(404)
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            message: errorMessage,
          })
        )

        expect(next).toHaveBeenCalledWith(new Error(errorMessage))
      })
    })
  })

  describe('get(...)', () => {
    describe('when successful', () => {
      beforeEach(() => {
        databaseAdapter.getCatById.mockResolvedValue(mockData.catHavingId)
      })

      it('calls database adapter to get the cat and returns the cat', async () => {
        await middleware.get(
          { params: { id: mockData.catHavingId.id } },
          res,
          next
        )

        expect(databaseAdapter.getCatById).toHaveBeenCalledWith(
          mockData.catHavingId.id
        )

        expect(res.send).toHaveBeenCalledWith(mockData.catHavingId)
      })
    })

    describe('when failing', () => {
      const errorMessage = 'An unexpected error occurred when getting the cat.'

      it('returns a 404 when trying to get a non-existing cat', async () => {
        databaseAdapter.getCatById.mockResolvedValue(null)

        await middleware.del({ params: { id: 'non-existing' } }, res, next)
        const errorMessage = `Could not find any cat having ID ${'non-existing'}.`

        expect(res.statusCode).toBe(404)
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            message: errorMessage,
          })
        )

        expect(next).toHaveBeenCalledWith(new Error(errorMessage))
      })

      it('returns a 500 error if the underlying database layer throws an error', async () => {
        databaseAdapter.getCatById.mockImplementation(() => {
          throw new Error(errorMessage)
        })

        await middleware.get({ params: { id: 'error-cat' } }, res, next)

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
