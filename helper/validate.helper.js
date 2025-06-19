const Validator = require("validatorjs");
const validator = async (body, rules, customMessages, callback) => {
	const validation = new Validator(body, rules, customMessages);
	validation.passes(() => callback(null, true));
	validation.fails(() => callback(validation.errors, false));
};

const not_zero_regex = /^[1-9][0-9]*$/gm;

Validator.register(
	"notzero",
	value => not_zero_regex.test(value),
	"value can not be zero"
);
module.exports = validator;
