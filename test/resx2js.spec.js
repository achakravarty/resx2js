const expect = require('chai').expect;
const Parser = require('../src/resx2js');

describe('Resx Converter test', () => {
	it('should parse resx file', (done) => {
		const parser = new Parser();
		parser.parseFile('test.resx')
		.then((result) => {
			expect(result).to.be.ok;
			expect(result).to.have.property('Name', 'Value');
			expect(result).to.have.property('Name1', 'Value1');
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
