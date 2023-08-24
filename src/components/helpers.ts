import { MY_ROLE, MY_PERMISSIONS } from './constants.js'

/**
 * The logic to permit access or not. Used in both
 * the Gate component and the helper function.
 * 
 * @param permissions 
 * @param isAuthorized
 * @returns boolean
 */
export const permitAccess = (
  permissions?: string | string [],
  isAuthorized?: Function,
) => {
  let permit = false

  // 1. Check permissions
  permit = searchArrayInArray(permissions || [], MY_PERMISSIONS) 
  
  // 2. Check isAuthorized function, this wins every time
  permit = isAuthorized ? isAuthorized({
    organization: 'my org',
    memberships: [{
      permissions: MY_PERMISSIONS
    }]
  }) : permit 

  return permit
}

/**
 * Searches a 1D array for any items of 
 * another 1D array. If
 * 
 * @param needleArray 
 * @param haystackArray 
 * @returns boolean
 */
export const searchArrayInArray = (
  needleArray: string | string[],
  haystackArray: string | string[], 
) => {
  //Ensure arrays
  if (typeof haystackArray === 'string') {
    haystackArray = [haystackArray]
  }
  if (typeof needleArray === 'string') {
    needleArray = [needleArray]
  }
  return haystackArray.find((item) => {
    return needleArray.indexOf(item) > -1
  }) !== undefined
}