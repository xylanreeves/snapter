import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles } from '../styles/commonStyles'
import FeedCard from '../components/homescreen/FeedCard'
import { Auth } from 'aws-amplify'

const HomeScreen = (props) => {
  // const {
  //   oAuthUser,
  //   oAuthError,
  //   hostedUISignIn,
  //   facebookSignIn,
  //   googleSignIn,
  //   amazonSignIn,
  //   customProviderSignIn,
  //   signOut,
  // } = props

  // const [result, setResult] = useState(null)

  // const _handlePressButtonAsync = async () => {
  //   let result = await WebBrowser.openBrowserAsync('https://expo.dev')
  //   setResult(result)
  // }

  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser().then((userData) => setUser(userData))

   
  }, [])


  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'))
  }
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <Text >User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
        </View>

        {user && <Button title="Sign Out" onPress={() => Auth.signOut()} />}
        {/* <TouchableOpacity
          style={{ padding: 32 }}
          onPress={_handlePressButtonAsync}
        >
          <Text>Open Browser</Text>
        </TouchableOpacity> */}

        <FeedCard />
        {/* <FeedCard /> */}
        {/* <FeedCard /> */}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
