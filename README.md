# custom-roles-mock

```
npm i custom-roles-mock
```

This is a mock package that contains non-working components and functions for the Custom Roles project.

The logic of the code assumes that the current user has the following:

- Role: `admin`
- Permissions:
  - `organization_members:list`
  - `organization_members:manage`
  - `organization_invitations:manage`
  - `organization:manage_attributes`
  - `organization:delete`
  - `organization_domains:manage`
  - `organization_enrollment:manage`

### Gate component

If you wish to authorize a specific section of your application, like a Billing page which is only accessible to Admins, you can use the new <Gate/> component.

```jsx
	<Gate>
		This is hidden by default.
	</Gate>

	<Gate roles='admin'>
		This is visible for the "admin" role.
	</Gate>

	<Gate permissions={['organization:delete']}>
		This is visible for the "organization:delete" permission.
	</Gate>

	<Gate
		roles={['admin']}
		permissions={['organization:delete']}
	>
		This is visible for the "admin" role or "organization:delete" permission.
	</Gate>

	<Gate>
		<Gate
			roles={['admin']}
			permissions={['organization:delete']}
		>
			This is hidden. Empy Gate always hides content.
		</Gate>
	</Gate>

	<Gate scope='application'>
		<Gate
			roles={['admin']}
			permissions={['organization:delete']}
		>
			This is visible for application-level roles only.
		</Gate>
	</Gate>

	<Gate scope='organization'>
		<Gate
			roles={['admin']}
			permissions={['organization:delete']}
		>
			This is visible for organization-level roles only.
		</Gate>
	</Gate>
```

### isAuthorized()

You can use the helper function isAuthorized() which does all the role and permission fetching in the background and you only pass the role or permission options to the function.

```
import { getAuth } from 'custom-roles-mock';
import type { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export async function GET(request: NextApiRequest) {
	// 1. Access your information and a helper via the getAuth()
	const { isAuthorized, organizationRole, organizationPermissions } = getAuth(request);

	// 2. You can access your role information
	console.log('role: ' + organizationRole + '\n'+ 'permissions:' + organizationPermissions);
	// role: admin,
	// permissions: ['organization_members:list', 'organization_members:manage', ... ,'organization:delete']

	// 3. Or go straight to the helper function
	if (isAuthorized('admin')) {
		// ✅ Authorized, do data fetching and return result
	  const { searchParams } = new URL(request.url)
	  const id = searchParams.get('id')
	  const res = await fetch(`https://api.stripe.com/v1/payment_methods/${id}`, {
	    headers: {
	      'Content-Type': 'application/json',
	      'API-Key': process.env.DATA_API_KEY,
	    },
	  })
	  const billingData = await res.json()
	  return NextResponse .json({ billingData })
	} {
		// ❌ Unauthorized, return error message
		return NextResponse .status(401).send({ error: "You don't have access to Billing resources." })
	}
}
```

### Testing

Use the /test folder to install a next.js app or any other type of app of your choice. You can then import the components locally from `./src/index` and make changes directly.

If you make a change you like, don't forget to push it :).
