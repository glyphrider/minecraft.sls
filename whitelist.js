const UUIDFormatter = require('./uuidfmt.js');
const https = require('https');

const MojangUrlPrefix = 'https://api.mojang.com/users/profiles/minecraft/';

var uuidfmt = new UUIDFormatter();

function getUrl(name) {
	return MojangUrlPrefix+name;
}

function whitelist(value) {
	return { 'name': value.name, 'uuid': uuidfmt.format(value.id) };
}

function ops(value) {
	return { 'uuid': uuidfmt.format(value.id), 'name': value.name, 'level': 4 };
}

var fn = whitelist;

async function getOne(name) {
	return new Promise((resolve,reject) => {
		const request = https.get(getUrl(name),(response) => {
			const hasResponseFailed = response.status >= 400;
			var responseBody = '';
			if (hasResponseFailed) {
				reject(`Request to ${responsnse.url} failed with HTTP ${response.status}`);
			}
			response.on('data', (chunk) => {
				responseBody += chunk.toString();
			});
			response.on('end', () => {
				if(responseBody == '')
					reject('Could not find name '+name);
				else
					resolve(JSON.parse(responseBody));
			});
		});
		request.on('error', reject);
		request.end();
	});
};

async function getAll(list) {
	return new Promise((resolve,reject) => {
		var whitelist = [];
		const promises = list.map(name => getOne(name));

		Promise.allSettled(promises).then((responses) => {
			responses.forEach((response) => {
				if (response.status == "fulfilled")
					whitelist.push(fn(response.value));
				if (response.status == 'rejected')
					console.log(response.reason);
			});
			resolve(whitelist);
		});
	});
};

exports.handler = async function(event) {
	list = JSON.parse(event.body);
	var response = await getAll(list);
	console.log(JSON.stringify(response));
	return {
		body: JSON.stringify(response),
		statusCode: 200
	};
};
