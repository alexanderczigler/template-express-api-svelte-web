const middleware = require('../cat') // The "cat" middleware being tested here.

/**
 * Mock the modules used by the middleware being tested.
 */
const databaseAdapter = require('../../adapters/database')
jest.mock('../../adapters/database')
afterEach(jest.clearAllMocks)

/**
 * Declare some test data shared between tests.
 */
const mockData = {
  id: '9761bfd0-2789-4a68-999e-7c832bc886bf',
  catWithoutId: {
    breed: 'Maine Coon',
    eyeColor: 'Old Gold',
    name: 'Gramsci',
  },
  catWithId: {
    id: '9761bfd0-2789-4a68-999e-7c832bc886bf',
    breed: 'Maine Coon',
    eyeColor: 'Old Gold',
    name: 'Gramsci',
  },
}

// An empty request object, some tests will add body or params to it.
const req = {}

// The response object and the next function is populated with spies
//   that are used by tests to assert the correct behavior of the middlewares
const res = {
  cookie: jest.fn(),
  redirect: jest.fn(),
  send: jest.fn(),
  status: jest.fn(),
}
const next = jest.fn()

/**
 * Declare the test spec.
 */
describe('/cat/ middlewares', () => {
  beforeEach(() => {
    // Always empty the body and params in the request object before running a single test.
    req.body = {}
    req.params = {}
  })

  /**
   * Tests for the POST /cat route middleware.
   */
  describe('add(...)', () => {
    describe('when successful', () => {
      beforeEach(() => {
        databaseAdapter.addCat.mockResolvedValue(
          '31106574-97fa-429b-ab0a-05ecc5b8c264'
        )
      })

      it('calls database adapter to add the cat', async () => {
        req.body = mockData.catWithoutId
        await middleware.add(req, res, next)
        expect(databaseAdapter.addCat).toHaveBeenCalledWith(
          expect.objectContaining({
            breed: 'Maine Coon',
            eyeColor: 'Old Gold',
            name: 'Gramsci',
          })
        )
      })

      it('returns the added cat with its new ID', async () => {
        req.body = mockData.catWithoutId
        await middleware.add(req, res, next)

        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            id: '31106574-97fa-429b-ab0a-05ecc5b8c264',
            ...mockData.catWithoutId,
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
        req.body = mockData.catWithoutId
        await middleware.add(req, res, next)

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

  /**
   * Tests for the GET /cat route middleware.
   */
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
        await middleware.all(req, res, next)
        expect(databaseAdapter.getAllCats).toBeCalledTimes(1)
      })

      it('returns the added cat with its new ID', async () => {
        await middleware.all(req, res, next)

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
        await middleware.all(req, res, next)

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

  /**
   * Tests for the DELETE /cat/:id route middleware.
   */
  describe('del(...)', () => {
    describe('when successful', () => {
      beforeEach(() => {
        databaseAdapter.getCatById.mockResolvedValue({
          id: mockData.catWithId.id,
        })
        databaseAdapter.deleteCat.mockResolvedValue()
      })

      it('calls database adapter to delete the cat', async () => {
        req.params = { id: mockData.id }
        await middleware.del(req, res, next)
        expect(databaseAdapter.deleteCat).toHaveBeenCalledWith(
          mockData.catWithId.id
        )
      })

      it('returns an empty object', async () => {
        req.params = { id: mockData.id }
        await middleware.del(req, res, next)
        expect(res.send).toHaveBeenCalledWith({})
      })
    })

    describe('when failing', () => {
      const errorMessage = 'An unexpected error occurred when deleting the cat.'
      beforeEach(() => {
        databaseAdapter.getCatById.mockResolvedValueOnce(mockData.catWithId)
        databaseAdapter.getCatById.mockResolvedValueOnce(null)
        databaseAdapter.deleteCat.mockImplementation(() => {
          throw new Error(errorMessage)
        })
      })

      it('returns a 500 error if the underlying database layer throws an error', async () => {
        req.params = { id: mockData.id }
        await middleware.del(req, res, next)

        expect(res.statusCode).toBe(500)
        expect(res.send).toHaveBeenCalledWith(
          expect.objectContaining({
            message: errorMessage,
          })
        )

        expect(next).toHaveBeenCalledWith(new Error(errorMessage))
      })

      it('returns a 404 when trying to delete a non-existing cat', async () => {
        req.params = { id: mockData.id }
        await middleware.del(req, res, next)
        const errorMessage = `Could not find any cat having ID ${mockData.catWithId.id}.`

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

  /**
   * Tests for the GET /cat/:id route middleware.
   */
  describe('get(...)', () => {
    describe('when successful', () => {
      beforeEach(() => {
        databaseAdapter.getCatById.mockResolvedValue(mockData.catWithId)
      })

      it('calls database adapter to get the cat and returns the cat', async () => {
        req.params = { id: mockData.id }
        await middleware.get(req, res, next)

        expect(databaseAdapter.getCatById).toHaveBeenCalledWith(
          mockData.catWithId.id
        )

        expect(res.send).toHaveBeenCalledWith(mockData.catWithId)
      })
    })

    describe('when failing', () => {
      const errorMessage = 'An unexpected error occurred when getting the cat.'

      it('returns a 404 when trying to get a non-existing cat', async () => {
        databaseAdapter.getCatById.mockResolvedValue(null)

        const id = 'non-existing-id'
        req.params = { id }
        await middleware.del(req, res, next)
        const errorMessage = `Could not find any cat having ID ${id}.`

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

        req.params = { id: 'error-cat' }
        await middleware.get(req, res, next)

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
