require('dotenv').config();

import { IUser } from '../models';
import { UserRole } from '../models/User';
import { hashSync } from 'bcrypt';

export const users: IUser[] = [
  {
    firstName: 'Leo',
    lastName: 'Qiu',
    email: 'leo@nellywebapps.com',
    password: hashSync(process.env.SUPER_ADMIN_PASSWORD, 10),
    institution: 'Nelly Web Apps',
    role: UserRole.SUPER_ADMIN,
    updatedAt: '2017-11-19T17:25:28.445Z',
    createdAt: '2017-11-19T17:25:28.445Z',
  },
  {
    firstName: 'Test1',
    lastName: 'Q',
    email: 'test1@test.com',
    password: hashSync(process.env.ADMIN_PASSWORD, 10),
    institution: 'UC Davis',
    role: UserRole.ADMIN,
    updatedAt: '2017-11-19T17:25:28.445Z',
    createdAt: '2017-11-19T17:25:28.445Z',
  },
  {
    firstName: 'Test2',
    lastName: 'Q',
    email: 'test2@test.com',
    password: 'test2',
    institution: 'Null Island',
    role: UserRole.USER,
    updatedAt: '2017-11-19T17:25:28.445Z',
    createdAt: '2017-11-19T17:25:28.445Z',
  },
];
