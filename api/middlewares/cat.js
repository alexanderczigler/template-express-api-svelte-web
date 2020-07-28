const { addCat, deleteCat, getAllCats, getCatById } = require('../adapters/database')

module.exports = {
  add: (req, res, next) => {
    const id = addCat(req.body)

    res.send({
      id,
      ...req.body
    })
    next()
  },
  all: (_, res, next) => {
    res.send(getAllCats())
    next()
  },
  del: (req, res, next) => {
    const id = req.params.id
    const cat = getCatById(id)

    if (cat) {
      deleteCat(id)
      res.send({})
      return next()
    }

    const error = { message: `Could not find any cat having ID ${id}.` }
    res.statusCode = 404
    res.send(error)
    throw new Error(error.message)
  },
  get: (req, res, next) => {
    const id = req.params.id
    const cat = getCatById(id)

    if (cat) {
      res.send(cat)
      return next()
    }

    const error = { message: `Could not find any cat having ID ${id}.` }
    res.statusCode = 404
    res.send(error)
    throw new Error(error.message)
  }
}