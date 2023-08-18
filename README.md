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

### getAuth() - gateAccess() and properties

You can use the helper function `gateAccess()` which follows the same logic as above or access your `roles` and `permissions` directly.
Note that your roles and permissions include a `scope` attribute, which for now will be "organization".

```ts
import { getAuth } from "custom-roles-mock";
import { NextResponse } from "next/server";

export async function GET() {
  // 1. Access your information and a helper via the getAuth()
  const { gateAccess, roles, permissions } = getAuth();

  // 2. You can access your role information
  console.log(
    "roles: " +
      JSON.stringify(roles) +
      "\n" +
      "permissions:" +
      JSON.stringify(permissions)
  );

  // 3. Or go straight to the helper function
  if (gateAccess("admin", ["organization:delete"], "resource")) {
    // ✅ Authorized, do data fetching and return result
    return NextResponse.json({ foo: "bar" });
  }
  {
    // ❌ Unauthorized, return error message
    return NextResponse.json({
      error: "You don't have access to this resource.",
    });
  }
}
```

### Testing

Use the /test folder to install a next.js app or any other type of app of your choice. You can then import the components locally from `./src/index` and make changes directly.

If you make a change you like, don't forget to push it :).
