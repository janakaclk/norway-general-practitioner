/**
 * Created by janaka on 3/1/15.
 */

var nock = require('nock');
var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var fs = require('fs');

var general_practitioners = require("../lib/general_practitioners");

describe('/general_practitioners_tests/data', function () {

    var bodyContent = fs.readFileSync("./test/resources/doctor_response_body.txt");

    it("doctor data should have expected rows and values", function (done) {
        var doctorData = general_practitioners.parseDoctorList(bodyContent,
            function(e){
                assert.fail( "Error callback called:" + e);
            }
        );

        doctorData.length.should.be.equal(33);
        doctorData[0].active.should.be.equal("Ja");
        doctorData[0].sex.should.be.equal("M");

        done();
    });
});
