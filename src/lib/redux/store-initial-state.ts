// initial state
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

export interface FilterAuth {
    uid: string
    email: string | null
}

export interface FilterUser {
    userName: string
}
