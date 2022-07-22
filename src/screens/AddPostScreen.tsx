import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../styles/commonStyles'
import { AntDesign } from '@expo/vector-icons'
import { Formik } from 'formik'
import { DataStore } from 'aws-amplify'
import { Post, User } from '../models'
import { getUser } from '../awsUtils/AwsUtils'
import { color } from '../styles/colors'
import Toast from 'react-native-root-toast'

const AddPostScreen = ({ navigation }) => {
  //Expiration times in seconds

  const THIRTY_MINUTES = 30 * 60
  const ONE_HOUR = 1 * 60 * 60
  const SIX_HOURS = 6 * 60 * 60
  const TWELVE_HOURS = 12 * 60 * 60
  const TWENTY_FOUR_HOURS = 24 * 60 * 60

  const [postContent, setPostContent] = useState<string>()

  //upload status
  const [uploadSuccessful, setUploadSuccessful] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadError, setUploadError] = useState<boolean>(false)

  //selected expiration time
  const [postExpirationTime, setPostExpirationTime] = useState<number>(
    TWENTY_FOUR_HOURS,
  )

  const textViewRef = useRef(null)

  const addToAws = async (_value: any) => {
    setIsUploading(true)

    //Todo:
    //timestamp
    //give user the option to select its post duration -> post would dissappear after the duration given

    //first we get the userdata from cognito userpool
    const currentUserData = await getUser()

    //in order to get the userID,
    //we need to query the user from db using its mail and get its 'id' finally
    try {
      var mUser = await DataStore.query(User, (u) =>
        u.email('eq', currentUserData.attributes.email),
      )
      /* same thing, different style */
      // var mUser = (await DataStore.query(User)).filter(
      //   (u) => u.email === currentUserData.attributes.email,
      // )

      console.log('User in DB: ', mUser[0].id)
    } catch (error) {
      console.log('Error retrieving user', error)
    }

    /* NOTES */
    // - remember we're saving timestamp in seconds
    //- coz amazon only supports timestamp in seconds for now
    // - so when we'll fetch the data we have be cautious about 'seconds' and 'milliseconds'
    //- new Date() fn supports milliseconds

    try {
      await DataStore.save(
        new Post({
          content: _value,
          timestamp: Math.floor(new Date().getTime() / 1000),
          author_id: mUser[0].id,
          likers: [],
          screenshotters: [],
          expirationTime:
            Math.floor(new Date().getTime() / 1000) + postExpirationTime,
        }),
      )
      setIsUploading(false)
      setUploadSuccessful(true)
      Toast.show('Post sent successfully!', {
        duration: Toast.durations.SHORT,
        position: 32
      })
      navigation.navigate('HomeTab')
    } catch (error) {
      setIsUploading(false)
      setUploadError(true)
      console.error('Post Upload Error: ', error)
      Toast.show('Failed: Please try again.', {
        duration: Toast.durations.SHORT,
        position: 32,
      })
      navigation.navigate('HomeTab')
    }

    //if the upload is successful
    //navigate the user to homescreen
  }

  return (
    <Formik
      initialValues={{ postContent: '' }}
      onSubmit={(values) => {
        // console.log('values: ', values)
        // console.log('NOW: ', new Date(Math.floor(new Date().getTime())))
        // console.log('Expiration Time: ', new Date(Math.floor(new Date().getTime()) + postExpirationTime * 1000))
        addToAws(values.postContent)
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
            // justifyContent: 'space-between',
          }}
        >
          <View>
            {/* Header -> close-button and Post Button*/}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 64,
                // backgroundColor: 'yellow',
              }}
            >
              {/* close button -> redirects to home */}
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: 64,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'olive',
                }}
                onPress={() => navigation.goBack()}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              {/* Post Button */}
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  flexShrink: 1,
                  paddingRight: 16,
                  // backgroundColor: 'lightblue',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{
                    borderRadius: 32,
                    backgroundColor: 'plum',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    opacity: values.postContent == '' ? 0.3 : 1,
                  }}
                  disabled={values.postContent == ''}
                >
                  <Text style={{ fontWeight: 'bold' }}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* body */}
            <View style={{ width: '100%' }}>
              {/* This is flexRow which will contain pfp and textInput */}
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'coral',
                }}
              >
                {/* left-side => pfp */}
                {/* user-avatar view */}
                <View
                  style={{
                    // width: 64,
                    // backgroundColor: 'mediumpurple',
                    // height: 360,
                    // backgroundColor: 'white',
                    alignItems: 'center',
                    marginLeft: 16,
                    paddingTop: 16,
                  }}
                >
                  {/* avatar-circle-pfp */}
                  <View
                    style={{
                      height: 42,
                      width: 42,
                      borderRadius: 100,
                      //   backgroundColor: 'lightgreen',
                      // backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={require('../../src/assets/kristen.jpg')}
                      style={{ height: 42, width: 42, resizeMode: 'cover' }}
                    />
                  </View>
                </View>
                {/* right-flex -> textInput */}
                <TouchableWithoutFeedback
                  onPress={() => textViewRef?.current?.focus()}
                >
                  <View
                    style={{
                      width: '100%',
                      minHeight: 420,
                      // backgroundColor: 'pink',
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingBottom: 8,
                      paddingTop: 5,
                      // height: 360,
                      flexShrink: 1,
                      // flexWrap: 'wrap',
                    }}
                  >
                    <TextInput
                      ref={textViewRef}
                      onChangeText={handleChange('postContent')}
                      onBlur={handleBlur('postContent')}
                      value={values.postContent}
                      placeholder="What's happening?"
                      placeholderTextColor="gray"
                      maxLength={500}
                      multiline={true}
                      style={{
                        width: '100%',
                        // backgroundColor: 'olive',
                        paddingBottom: 64,
                        paddingTop: 16,
                        fontSize: 18,
                      }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>

          {/* This is where the user selects post expiration time */}
          {/* From 30 mins to 24 hrs */}

          <View
            style={{
              width: '100%',
              // backgroundColor: 'yellow',
              height: 128,
              paddingLeft: 64,
              paddingRight: 16,
            }}
          >
            {/* Heading explaining what happens when you select the time */}
            <View style={{ marginBottom: 20 }}>
              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: 'bold', color: 'gray' }}
                >
                  Select Post Expiration Time
                </Text>
              </View>
              <View>
                <Text style={{ color: color.lightGrayBorder }}>
                  Your post will dissappear after {postExpirationTime / 60 / 60}{' '}
                  hour{postExpirationTime > 60 * 60 ? 's' : ''}.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: 64,
                borderWidth: 1,
                borderRadius: 4,
                borderColor: 'plum',
                paddingHorizontal: 8,
                paddingVertical: 6,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
                backgroundColor:
                  postExpirationTime === THIRTY_MINUTES ? 'plum' : 'white',
              }}
              onPress={() => setPostExpirationTime(THIRTY_MINUTES)}
            >
              <Text
                style={{
                  color:
                    postExpirationTime === THIRTY_MINUTES ? 'white' : 'plum',
                }}
              >
                30Min
              </Text>
            </TouchableOpacity>
            {/* Select Expiration time in hours */}
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 16,
                // backgroundColor: 'red'
              }}
            >
              <TouchableOpacity
                style={{
                  width: 64,
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: 'plum',
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                  backgroundColor:
                    postExpirationTime === ONE_HOUR ? 'plum' : 'white',
                }}
                onPress={() => setPostExpirationTime(ONE_HOUR)}
              >
                <Text
                  style={{
                    color: postExpirationTime === ONE_HOUR ? 'white' : 'plum',
                  }}
                >
                  1Hr
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 64,
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: 'plum',
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                  backgroundColor:
                    postExpirationTime === SIX_HOURS ? 'plum' : 'white',
                }}
                onPress={() => setPostExpirationTime(SIX_HOURS)}
              >
                <Text
                  style={{
                    color: postExpirationTime === SIX_HOURS ? 'white' : 'plum',
                  }}
                >
                  6Hrs
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 64,
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: 'plum',
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                  backgroundColor:
                    postExpirationTime === TWELVE_HOURS ? 'plum' : 'white',
                }}
                onPress={() => setPostExpirationTime(TWELVE_HOURS)}
              >
                <Text
                  style={{
                    color:
                      postExpirationTime === TWELVE_HOURS ? 'white' : 'plum',
                  }}
                >
                  12Hrs
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 64,
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: 'plum',
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                  shadowColor: 'plum',
                  backgroundColor:
                    postExpirationTime === TWENTY_FOUR_HOURS ? 'plum' : 'white',
                }}
                onPress={() => setPostExpirationTime(TWENTY_FOUR_HOURS)}
              >
                <Text
                  style={{
                    color:
                      postExpirationTime === TWENTY_FOUR_HOURS
                        ? 'white'
                        : 'plum',
                  }}
                >
                  24Hrs
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({})
