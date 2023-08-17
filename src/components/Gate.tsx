import React from 'react'
import { MY_ROLE, MY_PERMISSIONS } from './constants.js'

type GateProps = {
  forRole?: string | string[];
  forPermissions?: string | string[];
  notForRole?: string | string[];
  notForPermissions?: string | string[];
  /** We only support "organization" now, any other value will not render the content */
  scope?: "organization" | "application" | "resource";
  children: React.ReactNode;
}

const Gate = ({ 
  forRole,
  forPermissions,
  notForRole,
  notForPermissions,
  scope, 
  children,
}: GateProps) => {
  let gatedContent = null

  // 1. Show if any for* match real roles/permissions
  if (forRole || forPermissions) {
    console.log('1')
    gatedContent = (
      MY_ROLE === forRole || 
      findInPermissions(MY_PERMISSIONS, forPermissions || ['']) 
    ) ? children : null
  }

  // 2. Hide if any notFor* match real roles/permissions
  if (notForRole || notForPermissions) {
    console.log('2')
    gatedContent = (
      MY_ROLE === notForRole || 
      findInPermissions(MY_PERMISSIONS, notForPermissions || ['']) 
    ) ? null : children
  }

  // 3. Hide if scope is wrong (we only support "organization" now)
  if (scope && !forRole && !forPermissions && !notForRole && !notForPermissions) {
    console.log('3', scope)
    gatedContent = scope !== "organization" ? null : children
  }

  return (
    <>
      {gatedContent}
    </>
  )
}

const findInPermissions = (
  hayPermissions: string[], 
  needlePermissions: string | string[]
) => {
  return hayPermissions.find((hpermission) => {
    if (typeof needlePermissions === 'string') {
      needlePermissions = [needlePermissions]
    }
    return needlePermissions.indexOf(hpermission) > -1
  }) !== undefined
}

export default Gate