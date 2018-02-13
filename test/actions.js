
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


/*
* Test the /PUT route
*/
it('it should Do BOOST action ', (done) => {
    let action = { homeId: 169731, zoneId: 1, celsius: 25, expiray: 30 }

    chai.request(server)
        .put('/actions/1')
        .send(action)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('type').eql('TADO_MODE');
            done();
        });
});
