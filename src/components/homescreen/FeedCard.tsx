import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { color } from '../../styles/colors'

const windowWidth = Dimensions.get('window').width

export interface FeedCardProps {
  authorName: string
  content: string
  timestamp: any
  likes: number
  screenshots?: number
  expirationTime: any
}

const FeedCard = ({
  authorName,
  content,
  expirationTime,
  likes,
  timestamp,
  screenshots,
}: FeedCardProps) => {

  const headerHeight = useHeaderHeight()

  return (
    // card-container
    <View
      style={{
        // height: 360,
        width: '100%',
        // paddingHorizontal: 16,
        // marginTop: headerHeight,
        // backgroundColor: 'lightgreen',
        backgroundColor: 'white',
        // borderTopColor: color.lightGrayBorder,
        // borderTopWidth: 0.16,
        // flexDirection: 'column'
      }}
    >
      <View style={{ flexDirection: 'row', paddingBottom: 16 }}>
        {/* left-side => pfp */}
        {/* user-avatar view */}
        <View
          style={{
            // width: 64,
            // backgroundColor: 'mediumpurple',
            // height: 360,
            backgroundColor: 'white',
            alignItems: 'center',
            marginLeft: 8,
            paddingTop: 24,
          }}
        >
          {/* avatar-circle-pfp */}
          <View
            style={{
              height: 52,
              width: 52,
              borderRadius: 100,
              //   backgroundColor: 'lightgreen',
              backgroundColor: 'white',

              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              source={require('../../assets/kristen.jpg')}
              style={{ height: 52, width: 52, resizeMode: 'cover' }}
            />
          </View>
        </View>

        {/* rightside -> header and content-body */}
        {/* just below header -> content body. */}
        <View
          style={{
            // backgroundColor: 'pink',
            paddingLeft: 16,
            paddingRight: 8,
            paddingBottom: 8,
            paddingTop: 8,
            // height: 360,
            flexShrink: 1,
            // flexWrap: 'wrap',
          }}
        >
          {/* header */}
          <View
            style={{
              flexDirection: 'row',
              //   backgroundColor: 'lightblue',
              // justifyContent: 'space-between'
              alignItems: 'baseline',
              //   backgroundColor: 'white',
              //   paddingTop: 8,
            }}
          >
            {/* username */}
            <View
              style={
                {
                  // minWidth: 90,
                  //   backgroundColor: 'magenta',
                  // backgroundColor: 'white',
                  // alignItems: 'center',
                  // paddingLeft: 8,
                }
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: color.lightGray,
                }}
              >
                {authorName}
              </Text>
            </View>

            <View style={{ paddingHorizontal: 4 }}>
              <Text>•</Text>
            </View>

            {/* post-timeStamp */}
            <View
              style={{
                // paddingRight: 32,
                // backgroundColor: 'olive',
                width: '100%',
                flexShrink: 1,
                paddingRight: 16,
              }}
            >
              <Text
                style={{
                  color: color.fontGray,
                  //   textAlign: 'right'
                }}
              >
                {timestamp}
              </Text>
            </View>
          </View>

          {/* post-body */}
          <View
            style={
              {
                //   backgroundColor: 'violet',
              }
            }
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {content}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default FeedCard

const styles = StyleSheet.create({})
