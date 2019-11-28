import express from 'express'
import bodyParser from 'body-parser'
import { getLondon } from './London'

const app = express()

app.use(bodyParser.json())
app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})


app.post('/citizen/:name/:posX/:posY', async (req, res) => {

  try {
    await getLondon().createCitizen(name, posX, posY)

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .json(createdElements)
      .end();

  } catch (error) {

    res
      .status(418)
      .set({ 'Content-Type': 'application/json' })
      .json(createdElements)
      .end();

  }
})

app.post('/victim/:name/:posX/:posY', async (req, res) => {
  try {
  } catch (error) {
    switch (error) {
      case "abc":
      //TODO
      default:
        //TODO
        //Unkown
        console.error(error)
        res
          .status(418)
          .json({
            message: "Unkown Error",
            receive: {
              stackId: stackId
            }
          })
          .end();
    }
  }
})

app.get('/getJack', async (req, res) => {

})

app.delete('/evidences', async (req, res) => {

})





export default app
