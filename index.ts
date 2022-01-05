import express from 'express';
import routes from './src/routes/products';
import dbConnect from './src/db/db-connection';
const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('This is a simple express api for coffee mug recrutation process.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));