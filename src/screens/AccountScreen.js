import React, { useContext, useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Switch, Picker, AsyncStorage } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as ExampleContext } from '../context/ExampleContext'
import Background from '../components/Background'
import Spacer from '../components/Spacer'

const AccountScreen = ({ navigation }) => {
    const { state, clearErrorMessage, getAccount, signout } = useContext(AuthContext)
    const { state: color, changeAccentColor, changeTheme } = useContext(PrepContext)
    const { deleteExample } = useContext(ExampleContext)

    navigation.addListener('willBlur', payload => {
        clearErrorMessage()
    })

    useEffect(() => {
        getAccount()
    }, [])

    return (
        <Background>
        </Background>
    )
}

export default AccountScreen