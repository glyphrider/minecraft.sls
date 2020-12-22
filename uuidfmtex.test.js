const UUIDFormatException = require('./uuidfmtex.js');

const { TestScheduler } = require('jest');

describe('UUIDFormatException', () => {
    test('.constructor()', () => {
        expect(new UUIDFormatException('1234')).not.toBeNull();
    })
    test('.toString()', () => {
        expect(new UUIDFormatException('1234').toString()).toBe('1234: improper length');
    })
});