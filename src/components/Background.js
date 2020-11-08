import React from 'react'
import { StatusBar, View, KeyboardAvoidingView, Platform } from 'react-native'

export default ({ children, theme, color }) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: color,
            justifyContent: 'center'
        }}>
            <StatusBar barStyle={theme == 'dark' ? 'light-content' : 'dark-content'}/>

            <KeyboardAvoidingView 
                behavior='padding' 
                enabled={Platform.OS == 'ios'} 
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
                {children}
            </KeyboardAvoidingView>
        </View>
    )
}