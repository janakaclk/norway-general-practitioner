/**
 * Created by janaka on 2/16/15.
 */
var data_requester = require("./data_requester");

var htmlparser = require('htmlparser2');

exports.getGeneralPractitioners = function (fylke, kommune, onData, onError) {
    data_requester.getDoctorResponse(fylke, kommune, function (data) {
        var doctorData = parseDoctorList(data);
        onData(doctorData);
    }, onError);
}

function parseDoctorList(data) {
    var isDoctorDataRegion = false;
    var doctors = [];
    var columnCounter = 0;
    var doctor;

    var parser = new htmlparser.Parser({
        onopentag: function (name, attribs) {
            if (name === "tbody") {
                isDoctorDataRegion = true;
            }
            if (name === "tr") {
                columnCounter = 0;

                doctor = {
                    name: '',
                    sex: '',
                    center: '',
                    active: '',
                    address: '',
                    postAddress: '',
                    groupPractise: '',
                    commonList: '',
                    registered: '',
                    available: ''
                }
            }
        },
        ontext: function (text) {
            if (isDoctorDataRegion == true
                && text != '\n') {
                text = text.replace(/[\t\n]/g, '');

                columnCounter++;

                if (columnCounter == 1) {
                    doctor.name = text;
                }
                else if (columnCounter == 2) {
                    doctor.sex = text;
                }
                else if (columnCounter == 3) {
                    doctor.center = text;
                }
                else if (columnCounter == 4) {
                    doctor.active = text;
                }
                else if (columnCounter == 5) {
                    doctor.address = text;
                }
                else if (columnCounter == 6) {
                    doctor.postAddress = text;
                }
                else if (columnCounter == 7) {
                    doctor.groupPractise = text;
                }
                else if (columnCounter == 8) {
                    doctor.commonList = text;
                }
                else if (columnCounter == 9) {
                    doctor.registered = text;
                }
                else if (columnCounter == 10) {
                    doctor.available = text;
                    doctors.push(doctor);
                }
            }

        },
        onclosetag: function (tagname) {
            if (tagname === "tbody") {
                isDoctorDataRegion = false;
            }
        }
    }, {decodeEntities: true});

    parser.write(data);
    parser.end();

    return doctors;
}