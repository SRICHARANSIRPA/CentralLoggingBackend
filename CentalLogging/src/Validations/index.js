const Ajv = require("ajv");
const ajv = new Ajv();

module.exports = (schema, input) => {
  const validate = ajv.compile(schema);
  const isValid = validate(input);
  if (!isValid) {
    console.log(validate.errors);
    return { errors: validate.errors };
  }
  return true;
};
