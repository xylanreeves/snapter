import { Auth, DataStore } from 'aws-amplify'
import { User } from '../models'

export async function getUser() {
  return Auth.currentAuthenticatedUser()
    .then((userData) => userData)
    .catch(() => console.log('Not signed in'))
}

export const getCurrentUserId = async () => {
  try {
    const currentUserData = await getUser()
    var mUser = await DataStore.query(User, (u) =>
      u.email('eq', currentUserData.attributes.email),
    )
    var userId = mUser[0].id
    return userId
  } catch (error) {
    console.log('Error in AwsUtils: ', error)
    return false
  }
}
