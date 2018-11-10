import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models';
import { compareRole } from '../utils/helpers';

/**
 * Authorization middleware
 *
 * A curry function takes `role` as parameter which regulates the type of the user allowed
 *
 * @param role It can be a string with value `USER`, `ADMIN` or `SUPER_ADMIN`
 * @param req Express' `Request`
 * @param res Express' `Response`
 * @param next Express' `NextFunction`
 * @returns returns `next()` when requirements are met, otherwise error
 */
export const authorization = (role: 'USER' | 'ADMIN' | 'SUPER_ADMIN') => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) return res.status(401).send({ msg: 'No token was found' });
  try {
    const user = await User.findByToken(accessToken);

    if (user && compareRole(user.role, role)) {
      next();
    } else {
      return res.status(401).send({ msg: `Must have role: ${role}` });
    }
  } catch (error) {
    res.status(400).send({ msg: 'Could not valid JWT' });
  }
};
