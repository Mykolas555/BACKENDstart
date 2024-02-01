//core modules
const fs = require('fs');
const http = require('http');
const url = require('url');

//server
const hostname = 'localhost';
const port = '8888';

let products = fs.readFileSync(`${__dirname}/products.json`, 'utf-8');
//products = JSON.stringify(products);
console.log(products)

const findProduct = require('./findProduct')

const server = http.createServer((req, res)=>{
    const {query, pathname} = url.parse(req.url, true);
    console.log('path', pathname)
    console.log('query', query)
    switch(pathname){
        case '/' :
            res.writeHead(200, {
                'Content-Type': 'text/html',
            })
            res.end('<h1>hello</h1>');
            break
        case '/api/products' :
            res.writeHead(200, {
                'Content-Type': 'application/json',
            })
            res.end(JSON.stringify(products[query.id]));
            break
        default:
            res.writeHead(404, {
                'Content-Type': 'text/html',
                'my-header': 'i like node'
            })
            res.end('<h1>page not found</h1>');
    }
})

server.listen(port,hostname, ()=>{
    console.log(`server is listening on port ${port}`)
})