import Joi from 'joi';

export default {
  // /api/portfolio/
  makeNewTransaction: {
    body: {
      symbol: Joi.string().required(),
      quantity: Joi.number().required(),
      type: Joi.string().regex(/(sell|buy)/g).required()
    },
    params:{
        room: Joi.string()
    }
  },

  // /api/quote/
  getQuote: {
    params: {
      symbol: Joi.string().required(),
      scale: Joi.string()
    }
  },
};