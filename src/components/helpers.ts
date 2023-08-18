import { MY_SCOPE, MY_ROLE, MY_PERMISSIONS } from './constants.js'

/**
 * The logic to permit access or not. Used in both
 * the Gate component and the helper function.
 * 
 * @param roles 
 * @param permissions 
 * @param scope 
 * @returns boolean
 */
export const permitAccess = (
  roles?: string | string [],
  permissions?: string | string [],
  scope?: "organization" | "application" | "resource",
) => {
  let permit = false

  // If only scope is provided, just check its value
  if (scope && !(roles || permissions)) {
    if (scope === MY_SCOPE) {
      permit = true
    }
  } else {
    // Otherwise check all the values

    // If any of roles or permissions match my role or permissions
    // show content
    permit = (
      searchArrayInArray(roles || [], MY_ROLE)  || 
      searchArrayInArray(permissions || [], MY_PERMISSIONS) 
    ) ? true : false

    // If we also provide a scope value, make sure it's the right one
    if (scope && scope !== MY_SCOPE) {
      permit = false
    }
  }

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