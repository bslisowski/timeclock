// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Announcement, Shift, Schedule, User } = initSchema(schema);

export {
  Announcement,
  Shift,
  Schedule,
  User
};