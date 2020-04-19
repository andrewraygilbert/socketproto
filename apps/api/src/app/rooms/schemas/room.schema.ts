import * as mongoose from 'mongoose';

const CollaboratorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userId: String,
  username: String
})

export const RoomSchema = new mongoose.Schema({
  name: String,
  specId: String,
  collaborators: [CollaboratorSchema],
  activeUsers: [CollaboratorSchema]
})
