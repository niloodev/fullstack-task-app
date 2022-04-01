const validateParams = {
    // password have to contain a minimun of 3 characters
    _user: {
        length: {
            minimum: 3,
            message: 'Min of 3 characters.',
        },
        format: {
            pattern: '[a-z0-9]+',
            flags: 'i',
            message: 'Can only contain a-z and 0-9',
        },
    },
    // email have the condition of being in email format example@example.exa
    _email: {
        length: {
            minimum: 1,
            message: 'Input is blank.',
        },
        email: {
            message: 'Insert a valid e-mail.',
        },
    },
    // password have to contain a minimun of 3 characters
    _password: {
        length: {
            minimum: 3,
            message: 'Min of 6 characters.',
        },
    },
}

export default validateParams
