const { app } = require('./adapters/express')
const { add, all, del, get } = require('./middlewares/cat')
const { system } = require('./config')

app.get('/', (_, res) => {
  return res.end(
    `This is the API!\nYou should be able to find the web app here: ${system.web}`
  )
})

app.delete('/cat/:id', del)
app.get('/cat/', all)
app.get('/cat/:id', get)
app.post('/cat', add)
