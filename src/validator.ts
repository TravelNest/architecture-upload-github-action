// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import validateSchema = require('yaml-schema-validator/src/index');

type ValidateOutput = {
    message: string,
    path: string
};

export const validate = (path: string): ValidateOutput[] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    process.argv = [];
    return validateSchema(path, {
        schemaPath: './schema.yml'
    }) as ValidateOutput[];
};