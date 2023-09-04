import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);

  mongoose.connect(url)
    .then(() => console.log('Successfully connected to mongoDB'))
    .catch((e) => console.log(e));
};

export default connectDB;