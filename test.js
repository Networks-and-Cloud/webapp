import { expect as _expect, use} from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai'
const expect = _expect;

use(chaiHttp);

import app from './app2.js';

describe('API Tests', () => {
  

  it('', (done) => {  
    chai.request(app)
      .get('/healthz') // Replace with the actual endpoint you want to test
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        process.exit(0);
      });
  });

  // Add more test cases as needed
});
