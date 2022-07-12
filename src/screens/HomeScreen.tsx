import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles } from '../styles/commonStyles'
import FeedCard from '../components/homescreen/FeedCard'

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
