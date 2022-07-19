import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import RootNavigator from './src/navigation/navigation'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { Amplify, Auth, Hub } from 'aws-amplify'
import * as Linking from 'expo-linking'
import awsconfig from './src/aws-exports'
import * as WebBrowser from 'expo-web-browser'
import LoginScreen from './src/screens/LoginScreen'

Amplify.configure(awsconfig)

let customFonts = {
  'Splash-Regular': require('./src/assets/fonts/Splash-Regular.ttf'),
}

/*  THE MAIN APP FUNCTION */
const App = () => {
  //state
  const [appIsReady, setAppIsReady] = useState(false)
  ////

  async function urlOpener(url, redirectUrl) {
    const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
      url,
      redirectUrl,
    )

    if (type === 'success' && Platform.OS === 'ios') {
      WebBrowser.dismissBrowser()
      return Linking.openURL(newUrl)
    }
  }

  Amplify.configure({
    ...awsconfig,
    oauth: {
      ...awsconfig.oauth,
      urlOpener,
    },
  })

  const [user, setUser] = useState(null)

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync()
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(customFonts)

        // // Artificially delay for two seconds to simulate a slow loading
        // // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          getUser().then((userData) => setUser(userData))
          break
        case 'signOut':
          setUser(null)
          break
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data)
          break
      }
    })

    getUser().then((userData) => setUser(userData))

    return unsubscribe
  }, [])

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'))
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  // if the user is logged in -> goes to navigation, home basically
  //else to login screen 
  //aws amplify authentication - federatedSignIn
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {/* {user ? <RootNavigator /> : <LoginPage user={user} />} */}
      {/* <LoginScreen /> */}
      <RootNavigator />
    </NavigationContainer>
  )
}

// export default withAuthenticator(App)
// export default withOAuth(App)
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
