export const schemaName = 'DifficultNote';
export const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'DifficultNote',
    type: 'object',
    properties: {
        text: {
            type: 'string',
            title: 'text',
            maxLength: 4000,
        },
    },
};
