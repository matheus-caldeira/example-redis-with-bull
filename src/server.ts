import express from 'express';
import cors from 'cors';
import path from 'path'
import {add} from './queue';
import router from './board';

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(
  '/public',
  express.static(path.resolve(__dirname, '..', 'public', 'images')),
);


app.use('/dashboard', router)

app.post('/', (request, response) => {
  const {name} = request.body;

  add({ name: 'Example', data: {name} })
  return response.status(204).json({})
})

app.post('/add/', (request, response) => {
  const {prefix, name} = request.body;

  add({ name: 'Example', data: {name}, prefix })
  return response.status(204).json({})
})


app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log('server on ' + process.env.SERVER_PORT)
})
