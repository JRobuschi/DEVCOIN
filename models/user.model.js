const Joi = require("joi");
const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
const validateRequest = require("../middlewares/validateRequest");

const User = sequelize.define(
  "users",
  {
    hex_code: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    image: Sequelize.TEXT,
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "Debe ser un email valido",
        },
      },
    },
    password: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: {
      type: Sequelize.STRING,
      unique: true,
    },
    rol_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "roles",
        key: "rol_id",
      },
    },
    verified_user: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

const ValidateUser = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(100).required().messages({
      "string.empty": "Ingresa el Nombre",
      "string.min": "El nombre debe ser mayor a 2 caracteres",
      "any.required": "Ingresa el Nombre",
    }),
    last_name: Joi.string().min(2).max(100).required().messages({
      "string.empty": "Ingresa el Apellido",
      "string.min": "El Apellido debe ser mayor a 2 caracteres",
      "any.required": "Ingresa el Apellido",
    }),
    email: Joi.string().email().required().messages({
      "email.empty": "Ingresa el email",
      "any.required": "Ingresa el email",
    }),
    password: Joi.string().min(7).max(100).required().messages({
      "password.empty": "Ingresa el password",
      "password.min": "El password debe ser mayor a 5 caracteres",
      "any.required": "Ingresa el password",
    }),
    phone: Joi.string().min(8).max(100).required().messages({
      "phone.empty": "Ingresa el numero de telefono",
      "phone.min": "El numero debe ser mayor a 8 digitos",
      "any.required": "Ingresa el numero de telefono",
    }),
    address: Joi.string().min(5).max(100).messages({
      "address.empty": "Ingresa una dirección",
      "address.min": "La dirección debe ser mayor a 5 caracteres",
    }),
    image: Joi.string().required().messages({
      "any.required": "Ingresa una imagen",
    }),
    link: Joi.string().required().messages({
      "any.required": "Ingresa un link",
    }),
  });
  validateRequest(req, res, next, schema);
};

module.exports = {
  User,
  ValidateUser,
};
