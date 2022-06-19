import config from './config/config'
import logger from './config/logger'
import App from './app'
import mongoose from 'mongoose'
import 'module-alias/register'

let application: App
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('MongoDB Connected')
  application = new App(config.port)
  application.start()
})

const exitHandler = () => {
  if (application) {
    application.close()
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error)
  exitHandler()
}
process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)
