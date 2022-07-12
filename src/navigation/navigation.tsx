import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import AddPostScreen from '../screens/AddPostScreen'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import ProfileScreen from '../screens/ProfileScreen'
import { color } from '../styles/colors'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// let customFonts = {
//   'Splash-Regular': require('../assets/fonts/Splash-Regular.ttf'),
// }

const RootNavigator = () => {
  // // //
  // const [appIsReady, setAppIsReady] = useState(false)

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Keep the splash screen visible while we fetch resources
  //       await SplashScreen.preventAutoHideAsync()
  //       // Pre-load fonts, make any API calls you need to do here
  //       await Font.loadAsync(customFonts)

  //       // // Artificially delay for two seconds to simulate a slow loading
  //       // // experience. Please remove this if you copy and paste the code!
  //       // await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e)
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true)
  //     }
  //   }

  //   prepare()
  // }, [])

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync()
  //   }
  // }, [appIsReady])

  // if (!appIsReady) {
  //   return null
  // }

  const commonScreenOptions = {
    headerShown: false,
  }

  const ProfileStack = () => {
    return (
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    )
  }

  const HomeStack = () => {
    return (
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    )
  }

  const AddPostStack = () => {
    return (
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen name="AddPost" component={AddPostScreen} />
      </Stack.Navigator>
    )
  }

  // const MockComponent = () => (
  //   <View style={{ flex: 1, backgroundColor: 'white' }} />
  // )

  // const getHeaderTitle = (route) => {
  //   // If the focused route is not found, we need to assume it's the initial screen
  //   // This can happen during if there hasn't been any navigation inside the screen
  //   // In our case, it's "Feed" as that's the first screen inside the navigator
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'

  //   switch (routeName) {
  //     case 'Home':
  //       return 'Home'
  //     case 'Profile':
  //       return 'My profile'
  //     case 'Settings':
  //       return 'Settings'
  //   }
  // }

  // const getTabBarVisibility = (route) => {
  //   // If the focused route is not found, we need to assume it's the initial screen
  //   // This can happen during if there hasn't been any navigation inside the screen
  //   // In our case, it's "Feed" as that's the first screen inside the navigator

  //   console.log(route)
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
  //   console.log(routeName)

  //   if (routeName == 'AddPost') {
  //     return 'none'
  //   }
  //   return 'flex'
  // }

  /* if userTokenAvailable -> move to appStack
  else authStack */

  return (
    <Tab.Navigator
      initialRouteName="AddPostTab"
      screenOptions={{
        tabBarActiveTintColor: 'plum',
        tabBarInactiveTintColor: 'lightgray',
        tabBarShowLabel: false,
        headerTitle: () => (
          <View>
            <Text
              style={{
                fontFamily: 'Splash-Regular',
                fontSize: 42,
                color: 'plum',
              }}
            >
              Snapter
            </Text>
          </View>
        ),
        headerTitleAlign: 'left',
      }}
    >
      <Tab.Screen
        name="Hometab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPostTab"
        component={AddPostStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: 'Add Post',
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="plus-square" size={size} color={color} />
            // <AntDesign name="plussquareo" size={size} color={color}/>
          ),
          tabBarStyle: {
            display: 'none',
          },
        })}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})
