import { compareRole } from './helpers';
import { expect } from 'chai';

describe('helpers', () => {
  it('should return True when compare USER to USER', () =>
    expect(compareRole('USER', 'USER')).to.be.true);

  it('should return False when compare USER to ADMIN', () =>
    expect(compareRole('USER', 'ADMIN')).to.be.false);

  it('should return False when compare USER to SUPER_ADMIN', () =>
    expect(compareRole('USER', 'SUPER_ADMIN')).to.be.false);
});
