const { v4: newId } = require('uuid')

const data = {
  cats: [
    {
      id: '260e50f7-96b3-4ebb-8805-300a09a01969',
      breed: 'Norwegian Forest Cat',
      eyeColor: 'Old Gold',
      name: 'Kattegatt',
    },
    {
      id: '062330f6-039f-416c-9d0c-a82c14470a4d',
      breed: 'Russian Blue',
      eyeColor: 'Green',
      name: 'Goodie',
    },
    {
      id: 'b8d5b5fc-38a9-40fb-ab1a-62353fbd1015',
      breed: 'Ragdoll',
      eyeColor: 'Blue',
      name: 'Zelda',
    },
  ],
}

module.exports = {
  addCat: async (cat) => {
    return new Promise((resolve) => {
      cat.id = newId()
      data.cats.push(cat)
      return resolve(cat.id)
    })
  },
  deleteCat: async (id) => {
    return new Promise((resolve) => {
      for (let i = 0; i < data.cats.length; i++) {
        if (data.cats[i].id === id) {
          data.cats.splice(i, 1)
        }
      }

      return resolve()
    })
  },
  getAllCats: async () => {
    return new Promise((resolve) => {
      return resolve(data.cats)
    })
  },
  getCatById: async (id) => {
    return new Promise((resolve) => {
      return resolve(data.cats.filter((cat) => cat.id === id)[0])
    })
  },
}
