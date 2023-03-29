const Joi = require('@hapi/joi');

const getLoginPOSTSchema = () => ({
  email: Joi.string().email(),
  password: Joi.string(),
});
const getSendotpPOSTSchema = () => ({
  email: Joi.string().email().required(),
});

const getVerifyotpPOSTSchema = () => ({
  email: Joi.string().email(),
  otp: Joi.number(),
});
const getForgotpasswordPOSTSchema = () => ({
  email: Joi.string().email(),
});
const getResetpasswordPOSTSchema = () => ({
  email: Joi.string().email(),
  tempPassword: Joi.string().required(),
  newPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/m),
  confirmPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$$/m),
});
const getChangepasswordPOSTSchema = () => ({
  email: Joi.string().email().required(),
  currentPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/m),
  newPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/m),
  confirmPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$$/m),
});

const getCreateuserPOSTSchema = () => ({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  Phonenumber: Joi.string().required(),
  accountType: Joi.string().valid('I', 'C').required(),
  status: Joi.string().valid('enabled', 'disabled').required(),
});
const getLogoutPOSTSchema = () => ({
  userId: Joi.string().required(),
});

module.exports = {
  getLoginPOSTSchema,
  getSendotpPOSTSchema,
  getVerifyotpPOSTSchema,
  getForgotpasswordPOSTSchema,
  getResetpasswordPOSTSchema,
  getChangepasswordPOSTSchema,
  getCreateuserPOSTSchema,
  getLogoutPOSTSchema,
};
