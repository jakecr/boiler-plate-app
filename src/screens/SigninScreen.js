import React, { useState, useContext } from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import Background from '../components/Background'

const SigninScreen = ({ navigation }) => {
    const { state, clearErrorMessage, signin } = useContext(AuthContext)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    navigation.addListener('willBlur', payload => {
        clearErrorMessage()
    })

    return (
        <Background>
        </Background>
    )
}

export default SigninScreen