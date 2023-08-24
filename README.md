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

The component accepts two parameters:

- `permissions?: string | string[]`, which accepts a list of permissions and if ANY of them matches with a user's permission, the contents are rendered.
- `isAuthorized?: Function`, which accepts a function that returns true or false. If both parameters are present, isAuthorize() wins. Within the function you can access the `organization` object.

```jsx
<div>
  <Gate>This is hidden by default.</Gate>

  <Gate
    permissions={["organization:members:read", "organization:members:manage"]}
  >
    This is visible for users with the organization:members:read,
    organization:members:manage permissions.
  </Gate>

  <Gate
    isAuthorized={(organization: any) => {
      return !organization.memberships[0].permissions.includes(
        "organization:documents:manage"
      );
    }}
  >
    This is visible for users who dont have the role
    organization:documents:manage.
  </Gate>
</div>
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
  let gatedMessages = [];

  if (gateAccess()) {
    gatedMessages.push("This is hidden by default.");
  }

  if (
    gateAccess({
      permissions: ["organization:members:read", "organization:members:manage"],
    })
  ) {
    gatedMessages.push(
      "This is visible for users with the 'organization:members:read', 'organization:members:manage' permissions"
    );
  }

  if (
    gateAccess({
      isAuthorized: (organization: any) => {
        return !organization.memberships[0].permissions.includes(
          "organization:documents:manage"
        );
      },
    })
  ) {
    gatedMessages.push(
      "This is visible for users who don't have the role 'organization:members:read'."
    );
  }

  if (
    gateAccess({
      permissions: "organizations:organization:delete",
    })
  ) {
    // ✅ Authorized, do data fetching and return result
    return NextResponse.json({ gatedMessages: gatedMessages });
  }
  {
    // ❌ Unauthorized, return error message
    return NextResponse.json({
      error: "You don't have access to Billing resources.",
    });
  }
}
```

### Testing

Use the /test folder to install a next.js app or any other type of app of your choice. You can then import the components locally from `./src/index` and make changes directly.

If you make a change you like, don't forget to push it :).
