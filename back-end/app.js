/**
 * Created by praneethkumar on 06/05/17.
 */
const fs = require('fs');

var Client = require('ssh2').Client;

var conn = new Client();

var my = conn.on('ready', function() {
        console.log('Client :: ready');
        shellData = conn.shell(function(err, stream) {

            var myresult = [];
            if (err) throw err;
            var result = stream.on('close', function() {
                console.log('Stream :: close');
                conn.end();
            }).on('data', function(data) {
                // console.log('STDOUT: ' + data);
                myresult.push(data);
                fs.writeFileSync('data2.txt', myresult);
            }).stderr.on('data', function(data) {
                console.log('STDERR: ' + data);
            });
            console.log("My Result"+result);
            // stream.end('ls -l\nexit\n');

            // console.log("MY RESULT: " + result);
           stream.end("du -h --all\nexit\n");
           // fs.writeFileSync('data.txt', shellData);

        });
    }).connect({
        host: 'YOUR HOST IP ADDRESS',
        port: '22',
        username: 'YOUR USERNAME',
        password: 'YOUR PASSWORD'

    });
debugger;
// fs.writeFileSync('data.txt', my);
// console.log("###############", typeof conn);
