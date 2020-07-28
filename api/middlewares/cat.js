const {
  addCat,
  deleteCat,
  getAllCats,
  getCatById,
} = require('../adapters/database')

module.exports = {
  add: async (req, res, next) => {
    try {
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
    const cat = await getCatById(id)

    if (cat) {
      await deleteCat(id)
      res.send({})
      return next()
    }

    const error = { message: `Could not find any cat having ID ${id}.` }
    res.statusCode = 404
    res.send(error)
    throw new Error(error.message)
  },
  get: async (req, res, next) => {
    const id = req.params.id
    const cat = await getCatById(id)

    if (cat) {
      res.send(cat)
      return next()
    }

    const error = { message: `Could not find any cat having ID ${id}.` }
    res.statusCode = 404
    res.send(error)
    throw new Error(error.message)
  },
}
