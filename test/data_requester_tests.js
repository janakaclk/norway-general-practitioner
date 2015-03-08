/**
 * Created by janaka on 3/1/15.
 */
var nock = require('nock');
var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var data_requester = require("../lib/data_requester");

describe('/data_requester_tests/success', function () {
    var doctorService = nock('https://tjenester.nav.no')
        .post('/minfastlege/innbygger/fastlegesokikkepalogget.do')
        .reply(200, 'Hello');
    
    it("response should not be null", function (done) {
        data_requester.getDoctorResponse('03', '030103',
            function (doctorData) {
                doctorData.should.be.ok;
                done();
            },
            function(e){
                assert.fail( "When response is 400, error call back should not get invoked.");
                done();
            });
    });
});

describe('/data_requester_tests/error', function () {
    var doctorService = nock('https://tjenester.nav.no')
        .post('/minfastlege/innbygger/fastlegesokikkepalogget.do')
        .reply(400, 'Hello');

    it("error callback gets called when status not equals 200", function (done) {
        data_requester.getDoctorResponse('03', '030103',
            function (doctorData) {
                assert.fail( "When response is 404, error call back should get invoked.");
                done();
            },
            function(e){
                done();
            });
    })
});