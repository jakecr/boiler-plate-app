import React, { useState, useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import Background from '../components/Background'
import Spacer from '../components/Spacer'

const VerifyAccountScreen = ({ navigation }) => {
    const { state, clearErrorMessage, verifyCreateAccount } = useContext(AuthContext)
    
    const [code, setCode] = useState('')

    navigation.addListener('willBlur', payload => {
        clearErrorMessage()
    })

    return (
        <Background>
        </Background>
    )
}

export default VerifyAccountScreen