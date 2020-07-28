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
  ]
}

module.exports = {
  addCat: cat => {
    cat.id = newId()
    data.cats.push(cat)
    return cat.id
  },
  deleteCat: id => {
    for (let i = 0; i < data.cats.length; i++) {
      if (data.cats[i].id === id) {
        data.cats.splice(i, 1)
      }
    }
  },
  getAllCats: () => {
    return data.cats
  },
  getCatById: id => {
    return data.cats.filter(cat => cat.id === id)[0]
  }
}