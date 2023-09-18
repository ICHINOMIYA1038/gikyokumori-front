import React from 'react';
import { useRouter } from 'next/router';

function Sidebar() {
  const router = useRouter();

  const handleMenuClick = (path:any) => {
    router.push(path);
  };

  return (
    <div className="SideBarContainer">

    </div>
  );
}

export default Sidebar;
