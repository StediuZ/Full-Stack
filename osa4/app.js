const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
require('express-async-errors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)
app.use(middleware.requestLogger)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

//31.10.2022 - 4.8&4.10 tehty B osasta, tuli tehdyksi jos noudatti johdantoa, tähdet pitäisi olla suhte helppo tehdä
// 11.11.2022: Eli 4. osiosta tehty nyt 1-5,8-11,13 -6 kokeilut menos list helperis
//14.11.2022: 4c&4d luettu läpi ja tehty mukana, ei edistystä 6-7 tai vielä alotettu 15-23
//5.12. 15-19 done
//14.12. 20 done, jostaiun syystä meni rikki, heittää invalid tokenia kokoajan, voi olla postman virhe mutta mikään ei ole muuttunut
//19.12. vika korjattu, 6&21&22 done
//16.01. 7 done, 12 done, 14 done, 23 done huhhhhh


//eli 1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22, 23 done
