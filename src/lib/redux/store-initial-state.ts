// initial state
export default {
    toDoList: [],
    toDo: '',

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
}

export interface InitialStateType {
    toDoList: Array<unknown>
    toDo: string
    auth: {
        authUser: FilterUser | string | null
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
}

export interface FilterUser {
    uid: string
    email: string | null
}
