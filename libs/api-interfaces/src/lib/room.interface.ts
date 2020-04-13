import { Document } from 'mongoose';

interface Collaborators {
  firstName: string;
  lastName: string;
  username: string;
  userId: string;
}

export interface Room extends Document {
  name: string;
  specId: string;
  collaborators: [Collaborators]
}
