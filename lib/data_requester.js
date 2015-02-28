/**
 * Created by janaka on 2/16/15.
 */
var https = require('https');
var querystring = require('querystring');

exports.getDoctorResponse = function(fylke, kommune, onSuccessCallback, onFailCallback)
{
    var postData = querystring.stringify({
        'fylke': fylke,
        'kommune': kommune,
        'sok': 'S%F8k+etter+fastlege'
    });

    var options = {
        hostname: 'tjenester.nav.no',
        path: '/minfastlege/innbygger/fastlegesokikkepalogget.do',
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Content-Length': postData.length,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var req = https.request(options, function(res) {
        var data;
        
        res.setEncoding('binary')

        res.on('data', function (chunk) {
            data+=chunk;
        });
        
        res.on('end', function(){
            onSuccessCallback(data);
        })
    });

    req.on('error', function(e)
    {
        onFailCallback(e);
    });

// write data to request body
    req.write(postData);
    req.end();

}