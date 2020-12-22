class UUIDFormatException {
	constructor(value) {
		this.value = value;
		this.message = ': improper length';
		this.toString = function() {
			return this.value + this.message;
		};
	};
};

module.exports = UUIDFormatException;
