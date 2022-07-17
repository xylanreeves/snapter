import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { Auth } from 'aws-amplify'
import { color } from '../styles/colors'

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {/* App-Logo  */}

      <View
        style={{
          width: '100%',
          marginTop: 128,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../assets/icon_snapter/1024.png')}
          style={{ height: 270, width: 270, resizeMode: 'contain' }}
        />
      </View>

     
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 64
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 16,
            paddingHorizontal: 64,
            borderColor: 'plum',
            borderWidth: 2,
            borderRadius: 16,
          }}
          onPress={() => Auth.federatedSignIn()}
        >
          <Text style={{ fontSize: 18, color: color.lightGray }}>Quick Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
