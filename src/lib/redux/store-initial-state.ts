// 🐸: The default state of application and its type declarations.
export default {
    auth: {
        authUser: 'waiting',
        isLoading: false,
    },
    user: {
        userName: '',
    },
}

// Main type.
export interface InitialStateType {
    auth: {
        authUser: FilterAuth & string & null
        isLoading: boolean
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
    tasks: {
        [key: string]: FilterTasks
    } | null
    tasksList: {
        [key: string]: FilterTasksList
    } | null
}

export interface FilterTasksList {
    icon: string
    color: string
    title: string
    created: string
}

export interface FilterTasks {
    title: string
    taskList: string
    created: string
    date: string
    checked: boolean
    fav: boolean
}
