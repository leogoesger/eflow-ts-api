let chaiHttp = require('chai-http');
import { use, request, expect } from 'chai';
import { app } from '../app';

use(chaiHttp);

describe('/GET ping', () => {
  it('should get server information', done => {
    request(app)
      .get('/api/ping')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});
