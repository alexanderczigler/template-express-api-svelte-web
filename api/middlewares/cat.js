const {
  addCat,
  deleteCat,
  getAllCats,
  getCatById,
} = require('../adapters/database')

module.exports = {
  add: async (req, res, next) => {
    try {
      let message = ''
      res.statusCode = 400

      if (!req.body.breed) {
        message = 'Missing field: breed'
      }

      if (!req.body.eyeColor) {
        message = 'Missing field: eyeColor'
      }

      if (!req.body.name) {
        message = 'Missing field: name'
      }

      if (!!message) {
        res.send({ message })
        return next(new Error(message))
      }

      res.statusCode = 200

      const id = await addCat(req.body)
      res.send({
        id,
        ...req.body,
      })
      next()
    } catch (error) {
      res.statusCode = 500
      res.send({ message: 'An unexpected error occurred when adding the cat.' })
      return next(error)
    }
  },
  all: async (_, res, next) => {
    try {
      res.send(await getAllCats())
      next()
    } catch (error) {
      res.statusCode = 500
      res.send({ message: 'An unexpected error occurred when adding the cat.' })
      return next(error)
    }
  },
  del: async (req, res, next) => {
    const id = req.params.id

    try {
      cat = await getCatById(id)

      if (!cat) {
        const message = `Could not find any cat having ID ${id}.`
        res.statusCode = 404
        res.send({ message })
        return next(new Error(message))
      }

      await deleteCat(id)
      res.send({})
      return next()
    } catch (error) {
      res.statusCode = 500
      res.send({
        message: 'An unexpected error occurred when deleting the cat.',
      })
      return next(error)
    }
  },
  get: async (req, res, next) => {
    const id = req.params.id

    try {
      cat = await getCatById(id)

      if (!cat) {
        const message = `Could not find any cat having ID ${id}.`
        res.statusCode = 404
        res.send({ message })
        return next(new Error(message))
      }

      res.send(cat)
      return next()
    } catch (error) {
      res.statusCode = 500
      res.send({
        message: 'An unexpected error occurred when getting the cat.',
      })
      return next(error)
    }
  },
}
