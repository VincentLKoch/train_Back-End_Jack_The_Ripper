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
  const name = req.query.name, posX = req.query.posX, posY = req.query.posY

  try {
    await getLondon().createCitizen(name, posX, posY)

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .end();

  } catch (error) {

    res
      .status(418)
      .set({ 'Content-Type': 'application/json' })
      .end();

  }
})

app.post('/victim/:name/:posX/:posY', async (req, res) => {
  const name = req.query.name, posX = req.query.posX, posY = req.query.posY

  try {
    if (!posX || !(posX === '' + parseInt(posX)) || !posY || !(posY === '' + parseInt(posY))) {
      //if posX/posY is undefined or not int
      throw "bad request"
    }
    await getLondon().createVictim(name, posY, posX)

    res
      .statut(204)
      .end();

  } catch (error) {
    switch (error) {
      case "bad request":
        res
          .status(400)
          .json({
            message: "Bad request, We need both posX and posY to be non-null integer",
            receive: {
              name: name,
              posX: posX,
              posY: posY
            }
          })
          .end();
      case "already a Victim":
        res
          .status(409)
          .json({
            message: "There is already a victim",
            receive: {
              name: name,
              posX: posX,
              posY: posY
            }
          })
          .end();
      default:
        //Unkown
        console.error(error)
        res
          .status(418)
          .json({
            message: "Unkown Error",
            receive: {
              name: name,
              posX: posX,
              posY: posY
            }
          })
          .end();

    }//end switch
  }//end catch error
})//end remove

app.get('/getJack', async (req, res) => {

})

app.delete('/evidences', async (req, res) => {

})





export default app
