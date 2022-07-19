import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../styles/commonStyles'
import { AntDesign } from '@expo/vector-icons'
import { Formik } from 'formik'
import { DataStore } from 'aws-amplify'
import { Post, User } from '../models'
import { getUser } from '../awsUtils/AwsUtils'

const AddPostScreen = ({ navigation }) => {
  const [postContent, setPostContent] = useState<string>()

  const addToAws = async (_value) => {

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
    // - saving timestamp in seconds
    // - 
    await DataStore.save(
    new Post({
      "content": _value,
      "timestamp":  Math.floor(new Date().getTime() / 1000),
      "duration": "12:30:23.999Z",
      "author_id": mUser[0].id,
      "likers": [],
      "screenshotters": []
    })
  );
  }

  return (
    <Formik
      initialValues={{ postContent: '' }}
      onSubmit={(values) => console.warn(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
                }}
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
              <View
                style={{
                  width: '100%',
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
                  onChangeText={handleChange('postContent')}
                  onBlur={handleBlur('postContent')}
                  value={values.postContent}
                  placeholder="What's happening?"
                  placeholderTextColor="gray"
                  maxLength={500}
                  multiline={true}
                  style={{
                    width: '100%',
                    paddingBottom: 64,
                    paddingTop: 16,
                    fontSize: 18,
                  }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({})
