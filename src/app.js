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
  // get req parameter
  const name = req.query.name, posX = req.query.posX, posY = req.query.posY

  try {

    //TODO : 
    /*
      Check if name is empty or posX / poY is not a defined int
      => throw "bad request"
    */
    const citizen = await getLondon().createCitizen(name, posX, posY)

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .json(citizen)
      .end();

  } catch (error) {


    //TODO
    //418 = unknown error => add console.error in this case
    //do the switch with the new throw "bad request"

console.error(error) //Unkown
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
    const victim = await getLondon().createVictim(name, posY, posX)

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .json(victim)
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
})

app.get('/getJack', async (req, res) => {
  try {
    const jack = await getLondon().findClosestCitizen()

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .json(jack)
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

  } catch (error) {
    console.error(error)
    res
      .status(418)
      .json({
        message: "Unkown Error"
      })
      .end();
  }
})


export default app
