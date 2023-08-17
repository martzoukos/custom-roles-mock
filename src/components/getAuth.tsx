import { MY_ROLE, MY_PERMISSIONS } from './constants.js'

const getAuth = () => {
  return {
    gateAccess: ({
      organizationRole = '',
      organizationPermissions = [''],
    }) => {
      let canAccess = false;
      canAccess = organizationRole === 'admin' || organizationPermissions.indexOf('organization:delete') > -1
      return canAccess
    },
    organizationRole: MY_ROLE,
    organizationPermissions: MY_PERMISSIONS
  }
}

export default getAuth