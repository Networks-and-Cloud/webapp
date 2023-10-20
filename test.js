import { expect as _expect, use} from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai'
const expect = _expect;

use(chaiHttp);

import app from './app2.js';

describe('API Tests', () => {
   let isError=false;
  after(()=>{
    if(isError){
      // terminate with success
      process.exit(0);
    }else{
      //throw error 
      process.exit(1);
    }
  })
  it('', (done) => {  
    chai.request(app)
      .get('/healthz') // Replace with the actual endpoint you want to test
      .end((err, res) => {
        try {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
        } catch (error) {
         isError=true;
        }
        done();
      });
  });

  // Add more test cases as needed
});
