import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { commonStyles } from '../styles/commonStyles'
import FeedCard, { FeedCardProps } from '../components/homescreen/FeedCard'
import { Auth, DataStore, Predicates, SortDirection } from 'aws-amplify'
import Toast from 'react-native-root-toast'
import { Post } from '../models'
import { User } from '../models'
import { useIsFocused } from '@react-navigation/native'
import { getCurrentTimeInSeconds } from '../Utils/TimeUtils'

const HomeScreen = ({ route, navigation }) => {
  // const [result, setResult] = useState(null)

  const flatListRef = useRef(null)

  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false)

  const isFocused = useIsFocused()

  useEffect(() => {
    getPosts()
  }, [isFocused, refreshToggle])

  const refreshList = () => {
    setRefreshToggle(!refreshToggle)
  }

  // useLayoutEffect(() => {
  //   flatListRef.current.scrollToIndex({ index: 1 })
  // })

  const getPosts = async () => {
    setIsFetching(true);

    await DataStore.delete(Post, post => post.expirationTime("le", getCurrentTimeInSeconds()));
    const models = await DataStore.query(Post, Predicates.ALL, {
      sort: s => s.timestamp(SortDirection.DESCENDING)
    })

    // models.forEach((p) => {
    //   if(p.expirationTime >= getCurrentTimeInSeconds()){
    //     DataStore.delete(p)
    //   } else {
    //     setPosts(p)
    //     console.log("filtered posts: ", p)
    //   }
    // })
    setPosts(models)
    setIsFetching(false);
    console.log(models)
  }


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

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={posts}
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
      {/* <FeedCard /> */}
      {/* <FeedCard /> */}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
