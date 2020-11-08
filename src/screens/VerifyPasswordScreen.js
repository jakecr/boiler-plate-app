import React, { useState, useContext } from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import Background from '../components/Background'
import Spacer from '../components/Spacer'

const VerifyPasswordScreen = ({ navigation }) => {
    const { state, clearErrorMessage, changePassword } = useContext(AuthContext)
    
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')

    navigation.addListener('willBlur', payload => {
        clearErrorMessage()
    })

    return (
        <Background>
        </Background>
    )
}

export default VerifyPasswordScreen