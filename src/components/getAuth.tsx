const getAuth = () => {
  return {
    isAuthorized: ({
      organizationRole = '',
      organizationPermissions = [''],
    }) => {
      let canAccess = false;
      canAccess = organizationRole === 'admin' || organizationPermissions.indexOf('organization:delete') > -1
      return canAccess
    },
    organizationRole: 'admin',
    organizationPermissions: [
      'organization:delete',
      'organization_members:manage',
    ]
  }
}

export default getAuth