const fs = require('fs');
const sax = require('sax');

class Parser {
	constructor() {
		this.xmlObj = {};
		this.saxParser = sax.parser(true);
		this.initSaxParser();
	}

	initSaxParser() {
		let value = '';
		let property = '';
		let currentNode = '';
		this.saxParser.onopentag = (node) => {
			if(!(node.name != 'data' && node.name != 'value')) {
				property = node.name == 'data' ? node.attributes.name : property;
			}
			currentNode = node.name
		};

		this.saxParser.onclosetag = (nodeName) => {
			if(nodeName == 'data') {
				this.xmlObj[property] = value;
				value = '';
			}
		};

		this.saxParser.ontext = (text) => {
			if(!/^\s*$/.test(text) && currentNode == 'value') {
				value = text;
			}
		}
	}

	parseFile(file) {
		return new Promise((resolve, reject) => {
			fs.readFile(__dirname + '/' + file, 'utf8', (err, data) => {
				if(err) {
					reject(err);
				}
				this.saxParser.write(data).close();
				resolve(this.xmlObj);
			});
		});
	}
}

module.exports = Parser;
