type GateProps = {
  forRole?: "admin" | "editor";
  forPermission?: string | string[];
  notForRole?: string | string[];
  notForPermission?: string | string[];
  children: React.ReactNode;
}


const Gate = ({ 
  children,
  forRole,
  forPermission,
  notForRole,
  notForPermission, 
}: GateProps) => {
  let show = false
  if (
    forRole !== null || 
    forPermission !== null || 
    notForRole !== null || 
    notForPermission !== null
  ) {
    show = true
  }

  return (
    <div>
      {show &&
        <div>
          {children}
        </div>
      }
    </div>
  )
}

export default Gate