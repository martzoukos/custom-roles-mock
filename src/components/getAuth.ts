import { MY_SCOPE, MY_ROLE, MY_PERMISSIONS } from './constants.js'
import { permitAccess } from './helpers'

const getAuth = () => {
  return {
    gateAccess: ( options?: {
      permissions?: string | string[],
      isAuthorized?: Function,
    }
    ) => {
      return permitAccess(options?.permissions, options?.isAuthorized)
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