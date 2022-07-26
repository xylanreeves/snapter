export const getCurrentTimeInSeconds = () => {
  return Math.floor(new Date().getTime() / 1000)
  
  // console.log('timestamp NOW secondss: ', getCurrentTimeInSeconds())
  // console.log('timestamp seconds: ',  Math.floor(new Date().getTime() / 1000))
  // console.log('timestamp milliseconds: ', new Date( Math.floor(new Date().getTime() / 1000) * 1000))
}
