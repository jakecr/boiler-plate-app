import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AccountScreen from './src/screens/AccountScreen'
import ChangePasswordScreen from './src/screens/ChangePasswordScreen'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import VerifyAccountScreen from './src/screens/VerifyAccountScreen'
import VerifyDeleteAccountScreen from './src/screens/VerifyDeleteAccountScreen'
import VerifyPasswordScreen from './src/screens/VerifyPasswordScreen'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as ExampleProvider } from './src/context/ExampleContext'
import { setNavigator } from './src/navigationRef'
 
const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Signin: SigninScreen,
  Signup: SignupScreen,
  VerifyAccount: VerifyAccountScreen,
  ChangePassword: ChangePasswordScreen,
  VerifyPassword: VerifyPasswordScreen,
  VerifyDeleteAccount: VerifyDeleteAccountScreen,
  Account: AccountScreen
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    // Critical in replacing Redux
    <AuthProvider>
      <ExampleProvider>
        <App ref={(navigator) => { setNavigator(navigator) }}/>
      </ExampleProvider>
    </AuthProvider>
  )
}
