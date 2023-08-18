import { MY_SCOPE, MY_ROLE, MY_PERMISSIONS } from './constants.js'
import { permitAccess } from './helpers'

const getAuth = () => {
  return {
    gateAccess: (
      roles?: string | string[],
      permissions?: string | string[],
      scope?: "organization" | "application" | "resource",
      publicMetadata?: object,
    ) => {
      /**
       * publicMetadata: {
       *  roles: ['customrole', 'customrole2'],
       *  permissions: ['custompermission:action', 'custompermission:action2'],
       *  scope: 'customscope',
       * }
       */
      return permitAccess(roles, permissions, scope)
    },
    roles: [{
      scope: MY_SCOPE,
      role: MY_ROLE
    }],
    permissions: [{
      scope: MY_SCOPE,
      permissions: MY_PERMISSIONS,
    }]
  }
}

export default getAuth