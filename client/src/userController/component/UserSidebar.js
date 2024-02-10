import React, { useState } from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaymentIcon from '@mui/icons-material/Payment';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';
function UserSidebar() {
const [expanded , setExpanded] = useState(true);
const handleClick = () => {
    setExpanded(!expanded);
  };
    return ( 
        <div className="Sidebar"  style={{ width: expanded ? '300px' : '100px' , backgroundColor:'transparent'} }>
            <div className="sidebar-title text-dark">
                <h1 style={{ display: expanded ? 'flex' : 'none' }}>Account Setting </h1> 
                <Button variant="text" onClick={handleClick}>
                {expanded ? <FirstPageIcon /> : <LastPageIcon />}
                </Button>

            </div>
            <div className='side-item'>
                
            {expanded ? 
            
                    <ul className='normal-side'>
                    <li><Link to="/account/setting/edit" className='link'><EditIcon /> Edit Profile</Link></li>
                    <li><Link to="/account/setting/security" className='link'><SecurityIcon /> Security</Link></li>
                    <li><Link to="/account/setting/order" className='link'><ProductionQuantityLimitsIcon /> Orders</Link></li>
                    <li><Link to="/account/setting/cart" className='link'><ShoppingBagIcon /> Cart</Link></li>
                    <li><Link to="/account/setting/payment" className='link'><PaymentIcon /> Payment</Link></li>
                    </ul>
            
                :
                <Box>
                 <ul className='responsive-side' style={{ display: expanded ? 'none' : 'flex' }}>
                    
                    <Tooltip title="Edit Profile" arrow  placement="right">
                    <li><a href="#" className='links'><EditIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Security" arrow placement="right">
                    <li><a href="#" className='link'><SecurityIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Orders" arrow placement="right">
                    <li><a href="#" className='link'><ProductionQuantityLimitsIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Cart" arrow placement="right">
                    <li><a href="#" className='link'><ShoppingBagIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Payment" arrow placement="right">
                    <li><a href="#" className='link'><PaymentIcon /> </a></li>
                    </Tooltip>
                  
                    </ul>
                    </Box>
                }
               
            </div>
        </div>
     );
}

export default UserSidebar;