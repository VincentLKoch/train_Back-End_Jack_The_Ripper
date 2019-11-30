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
    if (!posX || !(posX === '' + parseInt(posX)) && !posY || !(posY === '' + parseInt(posY))) {
      throw "NoI"
      }    
    await getLondon().makeVictim(name,posY,posX)
    res
      .status(204)
      .end();

  } catch (error) {
      switch (error) {
        case "NoI":
          //Not a Int
          res
          .status(400)
          .json({
            message: "Pos is not a Int",
            receive: {
              name: name,
              posX: posX,
              posY: posY
            }
          })
        case "vic1":
          //citizen is already a victim
          res
              .status(409)
              .json({
               message: "Invalid victim",
               receive: {
                  name: name,
                  posX: posX,
                  posY: posY                  
                }
              })
             .end();
        case "vic2":
          //Incorrect position given
          res
              .status(400)
              .json({
               message: "Invalid position",
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
