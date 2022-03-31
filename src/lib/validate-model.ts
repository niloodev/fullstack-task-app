export default {
    // email have the condition of being in email format example@example.exa
    _email: {
        length: {
            minimum: 1,
            message: 'input is blank',
        },
        email: {
            message: 'insert a valid email',
        },
    },
    // password have to contain a minimun of 3 characters
    _password: {
        length: {
            minimum: 3,
            message: 'min of 3 characters',
        },
    },
}
