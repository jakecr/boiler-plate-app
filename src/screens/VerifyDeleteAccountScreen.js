import React, { useState, useContext, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import Background from '../components/Background'
import Spacer from '../components/Spacer'

const VerifyDeleteAccountScreen = ({ navigation }) => {
    const { state, clearErrorMessage, deleteAccount, verifyDeleteAccount } = useContext(AuthContext)
    
    const [code, setCode] = useState('')

    navigation.addListener('willBlur', payload => {
        clearErrorMessage()
    })

    useEffect(() => {
        deleteAccount()
    }, [])

    return (
        <View>
            <Background>
            </Background>
        </View>
    )
}

export default VerifyDeleteAccountScreen