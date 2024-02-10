import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaymentIcon from '@mui/icons-material/Payment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CategoryIcon from '@mui/icons-material/Category';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/material';


function Sidebar({styles , onLogout}) {
const [expanded , setExpanded] = useState(true);
const handleClick = () => {
    setExpanded(!expanded);
  };
    return ( 
        <div className="Sidebar"  style={{ width: expanded ? '250px' : '100px', ...styles.sidebar} }>
            <div className="sidebar-title">
                <h1 style={{ display: expanded ? 'flex' : 'none' }}>AYSAM </h1> 
                <Button variant="text" onClick={handleClick}>
                {expanded ? <FirstPageIcon /> : <LastPageIcon />}
                </Button>

            </div>
            <div className='side-item'>
                
            {expanded ? 
                    <ul className='normal-side' >
                    <li><a href="#" className='links'><HomeIcon /> Home</a></li>
                    <li><a href="#" className='link'><GroupIcon /> Users</a></li>
                    <li><a href="#" className='link'><CategoryIcon /> Categories</a></li>
                    <li><a href="#" className='link'><ProductionQuantityLimitsIcon /> Products</a></li>
                    <li><a href="#" className='link'><PaymentIcon /> Payment</a></li>
                    <li><a href="#" className='link'><SummarizeIcon /> Report</a></li>
                    <li><a href="#" className='link' onClick={onLogout}><MeetingRoomIcon /> Log Out</a></li>
                    </ul>
                :
                 <Box>
                 <ul className='responsive-side' style={{ display: expanded ? 'none' : 'flex' }}>

                    <Tooltip title="Home" arrow placement="right">
                    <li><a href="#" className='links'><HomeIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Users" arrow placement="right">
                    <li><a href="#" className='link'><GroupIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Categories" arrow placement="right">
                    <li><a href="#" className='link'><CategoryIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Products" arrow placement="right">
                    <li><a href="#" className='link'><ProductionQuantityLimitsIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Payment" arrow placement="right">
                    <li><a href="#" className='link'><PaymentIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Report" arrow placement="right">
                    <li><a href="#" className='link'><SummarizeIcon /> </a></li>
                    </Tooltip>

                    <Tooltip title="Log Out" arrow  placement="right">
                    <li><a href="#" className='link'><MeetingRoomIcon />  </a></li>
                    </Tooltip>
                    
                    </ul>
                    </Box>
                }
               
            </div>
        </div>
     );
}

export default Sidebar;