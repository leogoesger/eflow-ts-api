import * as Sequelize from 'sequelize';
import { verify } from 'jsonwebtoken';
import { SequelizeAttributes } from '../types';

enum Role {
  'USER',
  'ADMIN',
  'SUPER_ADMIN',
}

export interface IUser {
  id: number;
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  institution: string;
}

type UserInstance = Sequelize.Instance<IUser> & IUser;

// type UserModel = Sequelize.Model<UserInstance, IUser>;

interface UserModel extends Sequelize.Model<UserInstance, IUser> {
  findByToken: (d: any) => any;
}

const userFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IUser> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['USER', 'ADMIN', 'SUPER_ADMIN'],
      defaultValue: 'USER',
    },
    firstName: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    institution: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  };
  const User = sequalize.define<UserInstance, IUser>(
    'User',
    attributes
  ) as UserModel;
  User.associate = models => {
    User.hasMany(models.UploadData, {
      foreignKey: 'userId',
      as: 'uploadData',
    });
  };

  User.findByToken = (token: string) => {
    let decoded;
    try {
      decoded = verify(token, process.env.FF_JWT_TOKEN) as any;
      return User.find({ where: { email: decoded.email } });
    } catch (e) {
      return Promise.reject();
    }
  };
  return User;
};

export { userFactory, UserModel };
