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

## Tests

  npm test

# Version history
0.1.0   initial version (works for the best case. No known issues. Not tested for corner cases.)
0.2.0   On error handler gets called on all levels for errors. 
        Tests added. 
        Dependencies fixed in package.json.
        http status code validation.