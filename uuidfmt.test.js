const UUIDFormatter = require('./uuidfmt.js');
const UUIDFormatException = require('./uuidfmtex.js');

const { TestScheduler } = require('jest');

var uuidfmt = new UUIDFormatter();

describe('.format()', () => {
	test('numeric uuid', () => {
		expect(uuidfmt.format('12345678901234567890123456789012')).toBe('12345678-9012-3456-7890-123456789012');
	});
	test('alpha-numeric uuid', () => {
		expect(uuidfmt.format('0123456789ABCDEFGHIJKLMNOPQRSTUV')).toBe('01234567-89AB-CDEF-GHIJ-KLMNOPQRSTUV');
	});
	test('short uuid', () => {
		expect(() => { uuidfmt.format('short')}).toThrow(UUIDFormatException);
	});
	test('exception message', () => {
		try {
			uuidfmt.format('broken');
		} catch(ex) {
			expect(ex.toString()).toBe('broken: improper length');
		}
	});
});
