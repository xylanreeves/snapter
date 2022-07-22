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
import { Auth, DataStore } from 'aws-amplify'
import { getUser } from '../awsUtils/AwsUtils'
import { User } from '../models'

const BottomTab = createBottomTabNavigator()
const TabOneStack = createNativeStackNavigator()
const TabTwoStack = createNativeStackNavigator()
const TabThreeStack = createNativeStackNavigator()

// let customFonts = {
//   'Splash-Regular': require('../assets/fonts/Splash-Regular.ttf'),
// }

const RootNavigator = () => {
  useEffect(() => {
    //if new user -> add to db.
    addUserToDB()
  }, [])

  const addUserToDB = async () => {
    //this gets the info of current loggedIn user
    const currentUserData = await getUser()
    console.log(
      'userData cognito: ',
      JSON.stringify(currentUserData.attributes, null, 5),
    )
    ///
    //let's see if there's a user with same mail on db

    try {
      var mUser = await DataStore.query(User, (u) =>
        u.email('eq', currentUserData.attributes.email),
      )
      /* same thing, different style */
      // var mUser = (await DataStore.query(User)).filter(
      //   (u) => u.email === currentUserData.attributes.email,
      // )

      console.log('User in DB: ', mUser[0].id)

      console.log('timestamp NOW: ',  new Date())

      console.log('timestamp seconds: ',  Math.floor(new Date().getTime() / 1000))
      console.log('timestamp milliseconds: ', new Date( Math.floor(new Date().getTime() / 1000) * 1000))      
    } catch (error) {
      console.log('Error retrieving user', error)
    }

    if (mUser.length === 0) {
      try {
        await DataStore.save(
          new User({
            username: currentUserData.attributes.name ?? '',
            email: currentUserData.attributes.email,
            followers: [],
            following: [],
            total_likes: 0,
            total_screenshots: 0,
            posts_liked: 0,
          }),
        )
        console.log('Post saved successfully!')
      } catch (error) {
        console.log('Error saving post', error)
      }

      /* addUserToDB fn ends here  */
    }
  }

  const commonScreenOptions = {
    headerShown: false,
  }

  const HomeStack = () => {
    return (
      <TabOneStack.Navigator screenOptions={commonScreenOptions}>
        <TabOneStack.Screen name="Home" component={HomeScreen} />
      </TabOneStack.Navigator>
    )
  }

  const AddPostStack = () => {
    return (
      <TabTwoStack.Navigator screenOptions={commonScreenOptions}>
        <TabTwoStack.Screen name="AddPost" component={AddPostScreen} />
      </TabTwoStack.Navigator>
    )
  }

  const ProfileStack = () => {
    return (
      <TabThreeStack.Navigator screenOptions={commonScreenOptions}>
        <TabThreeStack.Screen name="Profile" component={ProfileScreen} />
        <TabThreeStack.Screen name="Settings" component={SettingsScreen} />
      </TabThreeStack.Navigator>
    )
  }

  /* if userTokenAvailable -> move to appStack
  else authStack */

  return (
    <BottomTab.Navigator
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
      <BottomTab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
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
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})

/* some might-use later stuff below */

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
