import { connect } from 'mongoose';
import config from '../config/config';

const dbConnect = () => {
  connect(config.DATABASE_URL)
    .then(() => {
      console.log('Successfully connected to the database :)');
    }).catch(err => {
      console.log('Could not connect to the database :(', err);
      process.exit();
    });
}

export default dbConnect;
