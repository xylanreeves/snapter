import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../styles/commonStyles'

const AddPostScreen = () => {
  return (
    <SafeAreaView style={commonStyles.defaultContainer}>
      <Text>AddPostScreen</Text>
    </SafeAreaView>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({})