// 🐸: The default state of application and its type declarations.
export default {
    auth: {
        authUser: 'waiting',
        isLoading: false,
        signInEmailAndPassword: () => {
            return
        },
        createUserWithEmailAndPassword: () => {
            return
        },
        signInWithGithub: () => {
            return
        },
        signOut: () => {
            return
        },
    },
    user: {
        userName: '',
    },
}

// Main type.
export interface InitialStateType {
    auth: {
        authUser: FilterAuth | string | null
        isLoading: boolean
        signInEmailAndPassword: (email: string, password: string) => void
        createUserWithEmailAndPassword: (
            email: string,
            password: string,
            user: string
        ) => void
        signInWithGithub: () => void
        signOut: () => void
    }
    user: FilterUser
}

// Nested types.
export interface FilterAuth {
    uid: string
    email: string | null
}

export interface FilterUser {
    userName: string
}
