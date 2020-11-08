import React, { useState, useContext } from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import Background from '../components/Background'
import Spacer from '../components/Spacer'

const SignupScreen = ({ navigation }) => {
    const { state, clearErrorMessage, signup } = useContext(AuthContext)
    const { state: color } = useContext(PrepContext)
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [password, setPassword] = useState('')

    navigation.addListener('willBlur', payload => {
        clearErrorMessage()
    })

    return (
        <Background>
        </Background>
    )
}

export default SignupScreen