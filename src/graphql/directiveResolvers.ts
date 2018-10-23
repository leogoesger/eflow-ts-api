import { User } from '../db/models';

interface IContext {
  headers: {
    'auth-token'?: string;
  };
}

const directiveResolvers = {
  isAuthenticated: async (
    next: () => void,
    source: any,
    args: any,
    ctx: IContext
  ) => {
    if (ctx.headers && ctx.headers['auth-token']) {
      const user = await User.findByToken(ctx.headers['auth-token']);
      return next();
    }
    throw new Error(`Must be logged in to view this field`);
  },

  hasRole: async (
    next: () => void,
    source: any,
    { role }: any,
    ctx: IContext
  ) => {
    if (ctx.headers && ctx.headers['auth-token']) {
      const user = await User.findByToken(ctx.headers['auth-token']);
      if (user.role === role) return next();
    }
    throw new Error(`Must have role: ${role}`);
  },
};

export { directiveResolvers };
