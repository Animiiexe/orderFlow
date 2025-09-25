const validate = (schema) => (req, res, next) => {
  const toValidate = { ...req.body };
  const { error } = schema.validate(toValidate);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export default validate;
