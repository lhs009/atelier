/**
 * file: errorHandler.js
 * description: request format validatation middleware
 * writer: lee hwan soo
 */

'use strict';

const { validationResult } = require('express-validator');

function checkErrors(req, res, next) {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    return next({ status: 400, message: errors[0].msg });
  }

  next();
}

module.exports = {
  checkErrors,
};

/*

const schema = {
    id: {
        isFloat: true,
        // Sanitizers can go here as well
        toFloat: true,
        errorMessage: "must be a valid number"
    },
    first_name: {
        exists: {
            errorMessage: "first_name is required"
        },
        isLength: {
            errorMessage: "first_name has invalid length",
            options: {
                min: 1
            }
        }
    },
    middle_name: {
        optional: {
            options: { nullable: true, checkFalsy: true }
        }
    },
    last_name: {
        exists: {
            errorMessage: "last_name is required"
        },
        isLength: {
            errorMessage: "last_name has invalid length",
            options: {
                min: 1
            }
        }
    },
    date_of_birth: {
        isISO8601: {
            errorMessage: `date of birth is not a valid iso date`
        },
        isBefore: {
            date: "01-01-2000",
            errorMessage: `should be less than 01-01-2000`
        },
        isAfter: {
            date: "01-01-1970",
            errorMessage: `should be greater than 01-01-1970`
        }
    },
    email: {
        exists: {
            errorMessage: "email is required"
        },
        isEmail: {
            errorMessage: "email is invalid"
        }
    },
    current_country_of_residence: {
        exists: {
            errorMessage: "current_country_of_residence is required",
            options: {
                checkNull: true,
                checkFalsy: true
            }
        }
    },
    current_city_of_residence: {
        exists: {
            bail: true,
            errorMessage: "current_city_of_residence is required"
        },
        isMongoId: {
            errorMessage: "current_city_of_residence is has invalid id for"
        }
    },
    email: {
        isEmail: { errorMessage: 'email is not a valid email' },
        isLength: { errorMessage: 'email has invalid length', options: { min: 1 } }
    },
    skills: {
        isArray: {
            errorMessage: `invalid value for skills`,
            options: {
                min: 3,
                max: 5
            }
        },
        isIn: {
            options: ["java", "C++", "javascript"],
            errorMessage: `allowed values for skills are: ${["java", "C++", "javascript"]}`
        },
        custom: {
            options: (values) => {
                const unique_values = new Set(values)
                if (unique_values.size !== values.length) {
                    return Promise.reject()
                }
                return Promise.resolve()
            },
            errorMessage: `you can't add duplicated`
        },
        customSanitizer: {
            options: async (value, { req }) => {
                return value
            }
        }
    }
}

*/
