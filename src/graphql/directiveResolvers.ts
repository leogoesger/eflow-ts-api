import { User } from '../db/models';
import { compareRole } from '../utils/helpers';

interface IContext {
  headers: {
    auth_token?: string;
  };
}

const directiveResolvers = {
  isAuthenticated: async (next: () => void, _: any, __: any, ctx: IContext) => {
    if (ctx.headers && ctx.headers['auth_token']) {
      const user = await User.findByToken(ctx.headers['auth_token']);
      if (user) return next();
      throw new Error(`Must be logged in to view this field`);
    }
    throw new Error(`Must be logged in to view this field`);
  },

  hasRole: async (next: () => void, _: any, { role }: any, ctx: IContext) => {
    if (ctx.headers && ctx.headers['auth_token']) {
      const user = await User.findByToken(ctx.headers['auth_token']);
      if (compareRole(user.role, role)) return next();
      throw new Error(`Must have role: ${role}`);
    }
    throw new Error(`Must have role: ${role}`);
  },
};

export { directiveResolvers };
