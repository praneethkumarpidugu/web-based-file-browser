/**
 * Created by praneethkumar on 06/05/17.
 */
const fs = require('fs');

var Client = require('ssh2').Client;

const http = require('http');

var conn = new Client();

// hmy result has all the streamed data from the remote linux machine.

var myresult = [];

var sshConnection = conn.on('ready', function() {
        console.log('Client :: ready');
        shellData = conn.shell(function(err, stream) {

            if (err) throw err;
            var result = stream.on('close', function() {
                console.log('Stream :: close');
                conn.end();
            }).on('data', function(data) {
                // console.log('STDOUT: ' + data);
                myresult.push(data);
                fs.writeFileSync('data.txt', myresult);

            }).stderr.on('data', function(data) {
                console.log('STDERR: ' + data);
            });

           stream.end("du -h --all\nexit\n");


        });
    }).connect({
        host: 'YOUR IP ADDRESS',
        port: 'YOUR PORT NUMBER',
        username: 'YOUR USERNAME',
        password: 'YOUR PASSWORD'

    });


var myData = fs.readFileSync('data.txt', 'utf8');

var lines = myData.split('\n');

//Have Properties for file size, file name according
//to their id's

var ourData = [];


var obj = {
    fileSize: ourData[0] ,
    Path: ourData[1]
};



var newLine = lines.splice(15);
// console.log(myData.split('\n'));
for (var i=0; i<newLine.length; i++) {
    // console.log(newLine[i].replace(/\,/g,""));
    var replacedData = newLine[i].replace(/\,/g,"");
    ourData.push(replacedData.split('\t'));
}
//Our Final Data with file size and Path Loged.


for (var j=0; j < ourData.length; j++) {

    console.log("ID: " + j + " File Size: " + ourData[j][0] + " File Path: " + ourData[j][1]);
}

// console.log(ourData.reverse());