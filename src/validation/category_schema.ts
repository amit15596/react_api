import Joi from "joi";

const categotySchemas = {
  category: Joi.object().keys({
    name: Joi.string().required(),
  }),
  categoryList: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  },
};

export default categotySchemas;
