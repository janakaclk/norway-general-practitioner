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

# Version history
0.1.0 initial version (works for the best case. No known issues. Not tested for corner cases.)