const validateParams = {
    // User have to contain a minimum of 3 characters, and can only contains a-z and 0-9.
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
    // Email have the condition of being in email format. (example@example.exa).
    _email: {
        length: {
            minimum: 1,
            message: 'Input is blank.',
        },
        email: {
            message: 'Insert a valid e-mail.',
        },
    },
    // Password have to contain a minimum of 6 characters.
    _password: {
        length: {
            minimum: 6,
            message: 'Min of 6 characters.',
        },
    },
}

export default validateParams
