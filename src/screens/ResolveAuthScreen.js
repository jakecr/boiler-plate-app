import React, { useEffect, useContext } from 'react'
import { ImageBackground } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'

const ResolveAuthScreen = () => {
    const { tryLocalLogin } = useContext(AuthContext)

    useEffect(() => {
        tryLocalLogin()
    }, [])

    return (
        <ImageBackground
            source={require('../../assets/splash.png')}
            style={{ 
                flex: 1,
            }} 
        >
        </ImageBackground>
    )
}

export default ResolveAuthScreen