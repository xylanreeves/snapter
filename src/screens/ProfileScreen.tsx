import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../styles/commonStyles'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../styles/colors'
import FeedCard from '../components/homescreen/FeedCard'
import { useIsFocused } from '@react-navigation/native'
import { DataStore, Predicates, SortDirection } from 'aws-amplify'
import { getCurrentTimeInSeconds } from '../Utils/TimeUtils'
import { Post } from '../models'
import { getCurrentUserId } from '../awsUtils/AwsUtils'

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false)

  const isFocused = useIsFocused()

  const flatListRef = useRef(null)

  useEffect(() => {
    getPosts()
  }, [])

  const refreshList = () => {
    setRefreshToggle(!refreshToggle)
  }

  const getPosts = async () => {
    setIsFetching(true)

    //delete all posts whose expiry-time has reached
    await DataStore.delete(Post, (post) =>
      post.expirationTime('le', getCurrentTimeInSeconds()),
    )

    //get the user-id
    //query all the posts which belongs to the user

    const userId = await getCurrentUserId()
    console.log('userId in profileScreen: ', userId)

    const models = (
      await DataStore.query(Post, Predicates.ALL, {
        sort: (s) => s.timestamp(SortDirection.DESCENDING),
      })
    ).filter((p) => p.author_id === userId)

    setUserPosts(models)
    setIsFetching(false)
    console.log('====================================')
    console.log('userPosts profileScreen: ')
    console.log('====================================')
    console.log('UserPosts PS: ', JSON.stringify(models, null, 2))
  }

  //flstlist stuff
  const itemDivider = () => <View style={{ width: '100%', height: 1 }}></View>
  const renderItem = ({ item }) => {
    // console.log('itemm inside render: ', item.likers.length)

    return (
      <FeedCard
        authorName={item.authorName}
        content={item.content}
        timestamp={item.timestamp}
        likes={item.likers.length}
        expirationTime={item.expirationTime}
      />
    )
  }
  //flatlist stuff ends

  return (
    <View style={{ flex: 1, backgroundColor: color.basicWhite }}>
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
          backgroundColor: color.basicWhite,
          zIndex: 10,
        }}
      >
        <View
          style={{
            borderBottomWidth: 2,
            paddingHorizontal: 16,
            borderBottomColor: 'plum',
          }}
        >
          <TouchableOpacity
            style={{
              height: 42,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Posts</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal - line */}
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
        {/* The content card goes here */}

        <FlatList
          ref={flatListRef}
          data={userPosts}
          renderItem={renderItem}
          keyExtractor={(item) => {
            // console.log('iitemL ', item.likers.length)
            return item.id
          }}
          ItemSeparatorComponent={itemDivider}
          // inverted
          contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}
          onRefresh={refreshList}
          refreshing={isFetching}
        />
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
