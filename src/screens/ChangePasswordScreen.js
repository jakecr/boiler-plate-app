import React, { useState, useContext, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import Background from '../components/Background'
import Spacer from '../components/Spacer'

const ChangePasswordScreen = ({ navigation }) => {
    const { state, clearErrorMessage, changePassword } = useContext(AuthContext)
    const { state: color } = useContext(PrepContext)

    const [email, setEmail] = useState('')

    useEffect(() => {
        clearErrorMessage()
    }, [])

    return (
        <Background>
        </Background>
    )
}

export default ChangePasswordScreen