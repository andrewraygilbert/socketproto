import { Document } from 'mongoose';

export interface Collaborator {
  firstName: string;
  lastName: string;
  username: string;
  userId: string;
}

export interface Room extends Document {
  name: string;
  specId: string;
  collaborators: [Collaborator];
  activeUsers: [Collaborator];
}
