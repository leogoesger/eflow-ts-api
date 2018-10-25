enum RoleEnum {
  USER = 0,
  ADMIN = 1,
  SUPER_ADMIN = 2,
}

/**
 * Compare two roles using `RoleEnum`
 * @param  role1 value can be `USER` | `ADMIN` | `SUPER_ADMIN`
 * @param  role2 value can be `USER` | `ADMIN` | `SUPER_ADMIN`
 * @returns returns `Boolean`
 */

export const compareRole = (
  role1: 'USER' | 'ADMIN' | 'SUPER_ADMIN',
  role2: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
) => {
  return RoleEnum[role1] >= RoleEnum[role2];
};
