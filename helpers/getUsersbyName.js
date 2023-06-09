const { ErrorHandler } = require('../util/errorHandler/error');
const model = require('../models');
const logger = require('../services/logger');

const getUserByName = async (username) => {
  try {
    if (!username) {
      throw new ErrorHandler('ERR_MNDTR_PRM_MSNG');
    }
    const user = await model.users.findOne({ where: { Email: username } });
    if (!user) {
      throw new ErrorHandler('ERR_RCRD_NOT_AVLBLE');
    }
    logger.info(`User found with email: ${username}`);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.Email,
      accountType: user.accountType,
      status: user.status,
      Phonenumber: user.Phonenumber,
    };
  } catch (error) {
    console.log(error, '..........................error');
    logger.error(`Error occurred while getting user by name. Error: ${error.message}`);
    if (error.code) {
      throw new ErrorHandler(error.code);
    }
    throw new ErrorHandler('ERR_INRNL_SRVR');
  }
};
module.exports = { getUserByName };
