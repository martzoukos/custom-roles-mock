import { permitAccess } from './helpers'

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
  let gatedContent = permitAccess(
    roles,
    permissions,
    scope
  ) ? children : null
  
  return (
    <div>
      {gatedContent}
    </div>
  )
}


export default Gate