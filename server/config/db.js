import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
mongoose.set('strictQuery', false);
const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB Connected');
  } catch (error) {
    console.log('An error occured');
    console.log(error);
    // STOP NODE APP WITH THE FOLLOWING:
    process.exit(1);
  }
};

export { db };
