const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
var cors = require('cors')

const app = express()
app.use(cors())

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/expenses' , require('./routes/expenses'))



app.listen(port, () => {
  console.log(`financeflow app listening on port ${port}`)
})
