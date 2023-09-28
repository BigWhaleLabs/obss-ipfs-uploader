import runApp from './helpers/runApp'
import runMongo from './helpers/runMongo'

void (async () => {
  await runMongo()
  console.log('MongoDB started')
  await runApp()
  console.log('Server started')
})()
