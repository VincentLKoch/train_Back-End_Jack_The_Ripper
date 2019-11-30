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
    const victim = await getLondon().makeVictim(name,posY,posX)
    res
    .status(200)
    .set({ 'Content-Type': 'application/json' })
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
          //there is already a victim
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
})

app.get('/getJack', async (req, res) => {
  try {
    const jack = await getLondon().findClosestCitizen()

    res
    .status(200)
    .set({ 'Content-Type': 'application/json' })
    .end();

  } catch (error) {
    switch (error) {
      case "fin1":
        //No victim
        res
        .status(404)
        .json({
          message: "Victim not found"
        })
      case "fin2":
        //No citizens
        res
            .status(404)
            .json({
             message: "Citizens not found"
            })
           .end();
      case "vic2":
        //More than one is closest
        res
            .status(409)
            .json({
             message: "At least 2 citizens are closest"
            })
           .end();
      default:
      //Unkown
      console.error(error)
        res
          .status(418)
          .json({
            message: "Unkown Error"
          })
          .end();
  }//end switch
}//end catch error
})

app.delete('/evidences', async (req, res) => {
  try {
    await getLondon().removeEvidences()

    res
    .status(204)
    .end();

  } catch (error)  {
    console.error(error)
    res
    .status(418)
    .json({
      message: "Unkown Error"})
    .end();
  }
})


export default app
