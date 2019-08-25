const http  = require('http');

const hostname = '127.0.0.1';
const port = 5000;
http.createServer((request , response)=>{
         response.writeHead(200, {'Content-Type' : 'text/plain'});
        
         response.end('Hello World');
        
         
}).listen(port,hostname, ()=>{
    console.log(`Server up and running at http://${hostname}:${port}/`); 
})