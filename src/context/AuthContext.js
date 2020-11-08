import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import { navigate } from '../navigationRef'
import exampleApi from '../api/example'

const authReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ACCOUNT':
            return { ...state, account: action.payload }
        case 'ADD_ERROR_MESSAGE':
            return { ...state, errorMessage: action.payload }
        case 'ADD_MADE_PLANS':
            return { ...state, madePlans: action.payload }
        case 'ADD_USERS_MADE_PLANS':
            return { ...state, usersMadePlans: action.payload }
        case 'ADD_USER':
            return { ...state, user: action.payload }
        case 'CLEAR_ERROR_MESSAGE':
            return { ...state, errorMessage: '' }
        case 'SET_HAS_EMAILED':
            return { ...state, hasEmailed: action.payload }
        default:
            return state
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
}

const clearHasEmailed = dispatch => () => {
    dispatch({ type: 'SET_HAS_EMAILED', payload: false })
}

const clearPageUser = dispatch => () => {
    dispatch({ type: 'ADD_USER', payload: {} })
}

const changePassword = dispatch => async ({ email }) => {
    if(!email) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Please provide an email.'})
    }

    try {
        const response = await exampleApi.post('/change-password', { email })
        const { error, encodedCorrectCode, email: responseEmail } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        const passwordData = { encodedCorrectCode: encodedCorrectCode, email: responseEmail }
        
        await AsyncStorage.removeItem('passwordData')
        await AsyncStorage.setItem('passwordData', JSON.stringify(passwordData))

        navigate('VerifyPassword')
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const deleteAccount = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')

    try {
        const response = await exampleApi.post('/delete-user', { token })
        const { error, encodedCorrectCode } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }
        
        await AsyncStorage.removeItem('encodedCorrectCode')
        await AsyncStorage.setItem('encodedCorrectCode', encodedCorrectCode)
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const getAccount = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    
    try {
        const response = await exampleApi.post('/get-user', { token })
        const { error, user, plans } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        dispatch({ type: 'ADD_MADE_PLANS', payload: plans })
        dispatch({ type: 'ADD_ACCOUNT', payload: user })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const getUser = dispatch => async ({ username }) => {
    try {
        const response = await exampleApi.post('/get-user', { username })
        const { error, plans, user } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
        }
        
        dispatch({ type: 'ADD_USERS_MADE_PLANS', payload: plans })
        dispatch({ type: 'ADD_USER', payload: user })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const sendMeEmail = dispatch => async ({ email, subject, content }) => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })

    try {
        const response = await exampleApi.post('/send-email', { email, subject, content })
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        dispatch({ type: 'SET_HAS_EMAILED', payload: true })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const signin = dispatch => async ({ email, password }) => {
    if(!email || !password) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Must provide an email and password'})
    }

    try {
        const response = await exampleApi.post('/signin', { email, password })
        const { error, token } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        await AsyncStorage.removeItem('token')
        await AsyncStorage.setItem('token', token)

        navigate('SubscribedPlan')
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const signout = dispatch => async () => {
    try {
        await AsyncStorage.removeItem('token')

        navigate('Signin')
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const signup = dispatch => async ({ username, email, password, verifyPassword }) => {
    if(!password || !verifyPassword || !username || !email) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'You must provide a username, email and password!' })
    }
    else if(password !== verifyPassword) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Passwords dont match!' })
    }
    else if(password.length < 6) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Your password must be 6 or mor characters!' })
    }

    try {
        const response = await exampleApi.post('/signup', { username, email })
        const { error, encodedCorrectCode } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        const user = { username, email, password, encodedCorrectCode: encodedCorrectCode }
        await AsyncStorage.removeItem('user')
        await AsyncStorage.setItem('user', JSON.stringify(user))

        navigate('VerifyAccount')
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const tryLocalLogin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')

    try {
        if(!token) {
            navigate('Signin')
        }else {
            const response = await exampleApi.post('/validate-user', { token })
            
            if(response.data.isLoggedIn) {
                navigate('SubscribedPlan')
            }else {
                navigate('Signin')
            }
        }
    }catch(err) {
        navigate('Signin')
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const verifyChangePassword = dispatch => async ({ code, password, verifyPassword }) => {
    if(!password || !verifyPassword || !code) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'You must provide a password and code!' })
    }
    else if(password !== verifyPassword) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Passwords dont match!' })
    }
    const passwordData = JSON.parse(await AsyncStorage.getItem('passwordData'))
    
    try {
        const response = await exampleApi.post('/verify-password', { ...passwordData, password, code })
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        await AsyncStorage.removeItem('passwordData')

        navigate('Signin')
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const verifyCreateAccount = dispatch => async ({ code }) => {
    if(!code) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Please provide a code!' })
    }

    try {
        const user = JSON.parse(await AsyncStorage.getItem('user'))

        const response = await exampleApi.post('/verify-user', { ...user, code })
        const { error, token } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        await AsyncStorage.removeItem('user')

        await AsyncStorage.removeItem('token')
        await AsyncStorage.setItem('token', token)

        navigate('SubscribedPlan')
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const verifyDeleteAccount = dispatch => async ({ code }) => {
    if(!code) {
        return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Please provide a code.'})
    }
    const encodedCorrectCode = await AsyncStorage.getItem('encodedCorrectCode')
    const token = await AsyncStorage.getItem('token')

    try {
        const response = await exampleApi.post('/verify-delete-user', { token, code, encodedCorrectCode })
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }

        await AsyncStorage.removeItem('encodedCorrectCode')
        await AsyncStorage.removeItem('token')

        navigate('Signin')
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { changePassword, clearErrorMessage, clearHasEmailed, clearPageUser, deleteAccount, getAccount, getUser, sendMeEmail, signin, signout, signup, tryLocalLogin, verifyChangePassword, verifyCreateAccount, verifyDeleteAccount },
    { account: null, errorMessage: '', hasEmailed: false, madePlans: [], token: null, usersMadePlans: [], user: null }
)