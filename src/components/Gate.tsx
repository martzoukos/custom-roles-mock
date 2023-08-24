import React from 'react'
import { permitAccess } from './helpers'

type GateProps = {
  /** One or many permissions for which content will be rendered. 
   *  If more than one exist, it will render for ANY of the permissions present in a user's permissions. 
   * */
  permissions?: string | string[];
  /** A function that returns true or false. The boolean value decides if the contents will be
   *  rendered or not. If both parameters are present, isAuthorized() always wins.
   */
  isAuthorized?: Function,
  children: React.ReactNode;
}

const Gate = ({ 
  permissions,
  isAuthorized,
  children,
}: GateProps) => {
  let gatedContent = permitAccess(
    permissions,
    isAuthorized,
  ) ? children : null
  
  return (
    <div>
      {gatedContent}
    </div>
  )
}


export default Gate