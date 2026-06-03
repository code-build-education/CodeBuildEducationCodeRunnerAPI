import Joi from "joi";

// Validation for compilation code python object
export const compilationCodePythonValidation = Joi.object({
    code: Joi.string().required(),
});