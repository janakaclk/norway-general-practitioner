# norway-general-practitioner
node js module to retrieve norway-general-practitioner availability and other details

#usage

var doctors = require('norway-general-practitioner');

doctors.getGeneralPractitioners('03', '030103', function(doctorData)
{
   console.log(doctorData);
}, onError);

function onError(e)
{
    console.log(e.message);
}