import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Header({styles , handleTheme , name}) {
 

    
  
 
  

    return ( 
      <div className='header' style={styles.header}>
        <div className='darkmode'>
        <span onClick={handleTheme}><WbSunnyIcon /></span>
        </div>

        <div className='search'>
         <span> <SearchIcon /> </span>
          <input type="text" placeholder="Search"/>
        </div>
        <div className='account'>
            <span><AccountCircleIcon /></span>
            <h6>Hey , {name}</h6>
        </div>
     
      </div>
     );
}

export default Header;