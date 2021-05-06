import express from 'express';
import cors from 'cors'

import {add, router} from './queue';

const app = express();

app.use(cors());

app.use('/bull', router)

app.post('/push/:name', (request, response) => {
  const {name} = request.params;

  add('Example', {name})
  return response.status(204).json({})
})

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log('server on ' + process.env.SERVER_PORT)
})
