import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../styles/commonStyles'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../styles/colors'

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: color.whiteOp7 }}>
      {/* settings icon */}
      <View
        style={{
          width: '100%',
          paddingTop: 16,
          paddingHorizontal: 32,
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity onPress={() => console.warn('Settings Clicked!')}>
          <Ionicons name="settings" size={24} color={color.fontGray} />
        </TouchableOpacity>
      </View>

      {/* Profile-Picture */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View
          style={{
            height: 128,
            width: 128,
            borderRadius: 100,
            //   backgroundColor: 'lightgreen',
            backgroundColor: 'lightgray',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Image
            source={require('../assets/kristen.jpg')}
            style={{ height: 128, width: 128, resizeMode: 'cover' }}
          />
        </View>
      </View>

      {/* username */}
      <View style={{ width: '100%', marginTop: 8, alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', color: color.grayPurple }}>
          Kristen
        </Text>
      </View>

      {/* User-Stat -> following, followers, likes */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 16,
        }}
      >
        {/* stat-1: Posts*/}
        <View
          style={{
            flexDirection: 'column',
            // backgroundColor: 'yellow',
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 16, color: color.fontGray }}
          >
            Posts
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: color.lightGray,
            }}
          >
            54
          </Text>
        </View>
        <View style={{ width: 32 }}></View>
        {/* stat-2: Followers */}
        <View
          style={{
            flexDirection: 'column',
            // backgroundColor: 'yellow',
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 16, color: color.fontGray }}
          >
            Followers
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: color.lightGray,
            }}
          >
            54
          </Text>
        </View>
        <View style={{ width: 32 }}></View>

        {/* stat-3: Likes */}
        <View
          style={{
            flexDirection: 'column',
            // backgroundColor: 'yellow',
          }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 16, color: color.fontGray }}
          >
            Likes
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: color.lightGray,
            }}
          >
            54
          </Text>
        </View>
      </View>

      {/* Sub-Tabs -> Normal Posts, View Once */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 32,
          width: '100%',
        }}
      >
        <View
          style={{
            borderBottomWidth: 2,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderBottomColor: 'plum',
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>Posts</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* line */}
      <View
        style={{
          borderBottomColor: 'lightgray',
          borderBottomWidth: 0.5,
        }}
      ></View>
      {/* line-ends */}

      {/* This is where sub-tabs content starts */}
      
      
      {/* Posts */}
      <View>
          
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
