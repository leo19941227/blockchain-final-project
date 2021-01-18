var http = require('http');
var url = require('url');

const Web3 = require('web3');
const quorumjs = require("quorum-js");

const web3 = new Web3('http://foodchain-node3.etherhost.org:22003');
const CONTRACT_ADDRESS = "0xA4fafbE0ea4823e262b4916EF93CC5A6306A5DBc";
var fs = require("fs");
const { result } = require('underscore');

const CONTRACT_ABI = JSON.parse(fs.readFileSync('food3.abi','utf-8'));
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
let events_list = ['FoodItem','FoodContent','FoodImage','FoodSection'];

quorumjs.extend(web3);

//create a server object:
http.createServer(function (req, res) {
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    let results = [null, null, null, null];
    let logno = req.url.slice(1)

    contract.getPastEvents(events_list[0], {filter: {logno: logno}, fromBlock: 0})
    .then(events => {
        results[0] = events
        contract.getPastEvents(events_list[1], {filter: {logno: logno}, fromBlock: 0})
        .then(events => {
            results[1] = events
            contract.getPastEvents(events_list[2], {filter: {logno: logno}, fromBlock: 0})
            .then(events => {
                results[2] = events
                contract.getPastEvents(events_list[3], {filter: {logno: logno}, fromBlock: 0})
                .then(events => {
                    results[3] = events
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(200);
                    res.end(JSON.stringify(results));
                })
            })
        })
    })


}).listen(8080, '0.0.0.0'); //the server object listens on port 8080
