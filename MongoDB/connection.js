import mongoose from "mongoose";

const mongoDBConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`MONGODB connection successfully`);
    })
    .catch((e) => {
      console.log(e);
    });
};

export default mongoDBConnection;
