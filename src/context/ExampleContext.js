import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import { navigate } from '../navigationRef'
import exampleApi from '../api/example'

const exampleReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ERROR_MESSAGE':
            return { ...state, errorMessage: action.payload }
        default:
            return state
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
}

export const { Provider, Context } = createDataContext(
    exampleReducer,
    { clearErrorMessage },
    { errorMessage: '' }
)