# custom-roles-mock

```
npm i custom-roles-mock
```

### Gate component

If you wish to authorize a specific section of your application, like a Billing page which is only accessible to Admins, you can use the new <Gate/> component.

```
// In app/admin/billing/page.tsx

import { Gate } from "custom-roles-mock";

export default function Billing() {
	<>
		<Gate for='organization_billing:manage'>
			<h1>Your Billing Information</h1>
			<div>...</div>
		</Gate>
		<Gate notFor='admin'>
			<h1>You can't access this page</h1>
			<p>
				You need the right permissions to access this page.
				Please contact your administrator.
			</p>
		</Gate>
	</>
}
```

| Attribute        | Type   | Description                                                                                                                                                                                |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| forRole          | string | string[]                                                                                                                                                                                   | Accepts a Role key value. If an invalid value is passed nothing will be rendered.       |
| forPermission    | string | string[]                                                                                                                                                                                   | Accepts a Permission key value. If an invalid value is passed nothing will be rendered. |
| notForRole       | string | string[]                                                                                                                                                                                   | Accepts a Role key value. If an invalid value is passed nothing will be rendered.       |
| notForPermission | string | string[]                                                                                                                                                                                   | Accepts a Permission key value. If an invalid value is passed nothing will be rendered. |
| scope (future)   | string | Accepts one of application, organization, resource so that the tree inside of it knows where to look for roles and permissions. This will be helpful to resolve conflicts if, for example: |

- There is an admin role on the Application level
- And there is an admin role also on the Organization level
  We currently only support organization level permissions so the default value will be organization.

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
