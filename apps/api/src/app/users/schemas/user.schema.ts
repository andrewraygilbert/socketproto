import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});
