import React from 'react'
import { MY_SCOPE, MY_ROLE, MY_PERMISSIONS } from './constants.js'

type GateProps = {
  /** One or many roles for which content will be rendered. */
  roles?: string | string[];
  /** One or many permissions for which content will be rendered. 
   *  When roles and permissions are present, both will apply (a user that has ANY of all these)  */
  permissions?: string | string[];
  /** We only support "organization" now, any other value will not render the content */
  scope?: "organization" | "application" | "resource";
  children: React.ReactNode;
}

const Gate = ({ 
  roles,
  permissions,
  scope, 
  children,
}: GateProps) => {
  let gatedContent = null

  // If only scope is provided, just check its value
  if (scope && !(roles || permissions)) {
    if (scope === MY_SCOPE) {
      gatedContent = children
    }
  } else {
    // Otherwise check all the values

    // If any of roles or permissions match my role or permissions
    // show content
    gatedContent = (
      searchArrayInArray(roles || [], MY_ROLE)  || 
      searchArrayInArray(permissions || [], MY_PERMISSIONS) 
    ) ? children : null

    // If we also provide a scope value, make sure it's the right one
    if (scope && scope !== MY_SCOPE) {
      gatedContent = null
    }
  }

  return (
    <div>
      {gatedContent}
    </div>
  )
}

/**
 * Searches a 1D array for any items of 
 * another 1D array. If
 * 
 * @param needleArray 
 * @param haystackArray 
 * @returns boolean
 */
const searchArrayInArray = (
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

export default Gate