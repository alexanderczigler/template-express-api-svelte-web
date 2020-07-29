const { app } = require('./adapters/express')
const { add, all, del, get } = require('./middlewares/cat')

app.get('/', (_, res) => {
  return res.end('This is the API')
})

app.delete('/cat/:id', del)
app.get('/cat/', all)
app.get('/cat/:id', get)
app.post('/cat', add)
