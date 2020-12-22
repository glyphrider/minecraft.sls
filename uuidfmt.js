const UUIDFormatException = require('./uuidfmtex.js');

class UUIDFormatter {
	format(raw) {
		if (raw.length == 32)
			return raw.substring(0,8)+"-"+raw.substring(8,12)+"-"+raw.substring(12,16)+"-"+raw.substring(16,20)+"-"+raw.substring(20);
		throw new UUIDFormatException(raw);
	};
};

module.exports = UUIDFormatter;
