import { User } from '../db/models';
import { compareRole } from '../utils/helpers';
import { IContext } from './models';

const directiveResolvers = {
  isAuthenticated: async (
    next: () => void,
    _: any,
    __: any,
    { req }: IContext
  ) => {
    const { accessToken, refreshToken } = req.cookies;
    if (accessToken) {
      const user = await User.findByToken(accessToken);
      req.user = user;
      if (user) return next();
      throw new Error(`Must be logged in to view this field`);
    }
    throw new Error(`Must be logged in to view this field`);
  },

  hasRole: async (
    next: () => void,
    _: any,
    { role }: any,
    { req }: IContext
  ) => {
    const { accessToken, refreshToken } = req.cookies;

    if (accessToken) {
      const user = await User.findByToken(accessToken);
      req.user = user;
      if (compareRole(user.role, role)) return next();
      throw new Error(`Must have role: ${role}, but you have ${user.role}`);
    }
    throw new Error(`Must have access token`);
  },
};

export { directiveResolvers };
