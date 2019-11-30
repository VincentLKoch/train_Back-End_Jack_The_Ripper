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
  const { name, posX, posY } = req.params
  try {

    if (!posX || !(posX === '' + parseInt(posX)) || !posY || !(posY === '' + parseInt(posY))) {
      //if posX/posY is undefined or not int
      throw "bad request"
    }
    const citizen = await getLondon().createCitizen(name, posX, posY)

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .json(citizen)
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
        break;
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
        break;
    }//end switch
  }//end catch error
})

app.post('/victim/:name/:posX/:posY', async (req, res) => {
  const { name, posX, posY } = req.params
  try {
    if (!posX || !(posX === '' + parseInt(posX)) || !posY || !(posY === '' + parseInt(posY))) {
      //if posX/posY is undefined or not int
      throw "bad request"
    }
    const victim = await getLondon().createVictim(name, posX, posY)

    res
      .status(200)
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
        break;
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
        break;
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
        break;

    }//end switch
  }//end catch error
})

app.get('/getJack', async (req, res) => {
  try {
    const jack = await getLondon().findJack()

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .json(jack)
      .end();

  } catch (error) {
    switch (error) {
      case "No Victim":
        res
          .status(404)
          .json({
            message: "Victim not found"
          })
        break;
      case "No Citizen":
        res
          .status(404)
          .json({
            message: "Citizens not found"
          })
          .end();
        break;
      case "Two Jack ?":
        //More than one is closest
        res
          .status(409)
          .json({
            message: "At least 2 citizens are closest"
          })
          .end();
        break;
      default:
        //Unkown
        console.error(error)
        res
          .status(418)
          .json({
            message: "Unkown Error"
          })
          .end();
        break;
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
