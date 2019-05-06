import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';
import { verify } from 'jsonwebtoken';

import * as Promise from 'bluebird';
global.Promise = Promise;

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface IUser {
  id?: number;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  institution?: string;
  updatedAt?: string;
  createdAt?: string;
}

interface IUserExtend extends Model {
  id?: number;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  institution?: string;
  updatedAt?: string;
  createdAt?: string;
}

type UserModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IUserExtend) & {
    findByToken: (d: any) => any;
  } & {
    associate: (model: IDB) => any;
  };

const userFactory = sequalize => {
  const User = <UserModel>sequalize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      defaultValue: 'USER',
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    institution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  User.associate = models => {
    User.hasMany(models.TsUpload, {
      foreignKey: 'userId',
      as: 'tsUploads',
    });
  };

  User.findByToken = (token: string): Promise<IUser> => {
    let decoded;

    try {
      decoded = verify(token, process.env.EFLOW_JWT_SECRET) as any;
      return User.findOne({
        where: { email: decoded.email },
        attributes: ['id', 'email', 'role'],
      });
    } catch (error) {
      throw error;
    }
  };
  return User;
};

export { userFactory, UserModel };
