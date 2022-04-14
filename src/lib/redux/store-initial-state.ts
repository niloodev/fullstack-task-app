import { OptionsObject } from 'notistack' // Get typeof options in enqueueSnackbar.
import type { ModalType } from '../../styles/components/modal-components' // Get typeof modal types.

// 🐸: The default state of application and its type declarations.
export default {
    auth: {
        authUser: 'waiting',
        isLoading: false,
    },
    user: {
        userName: '',
        tasks: null,
        tasksList: null,
    },
    interface: {
        toast: null,
        modal: {
            open: false,
            type: '',
        },
    },
}

// Main type.
export interface InitialStateType {
    auth: {
        authUser: FilterAuth & string & null
        isLoading: boolean
    }
    user: FilterUser
    interface: {
        toast: (OptionsObject & { message: string }) | null
        modal: FilterModal
    }
}

// Nested types.
export type FilterToast = (OptionsObject & { message: string }) | null

export interface FilterModal {
    open: boolean
    type: ModalType
}

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
