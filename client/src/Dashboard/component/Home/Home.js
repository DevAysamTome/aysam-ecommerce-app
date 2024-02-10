import { Card } from "react-bootstrap";
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PeopleIcon from '@mui/icons-material/People';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { Box } from "@mui/material";
import { BarChart   } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

function Home({styles}) {
    return (
     <div className="Home" style={styles.home}>
        <div className="home-header d-flex  mb-5">
       <Card className="shadow-lg p-3 bg-success">
        <Card.Body>
           <Card.Title><CategoryIcon /> Category</Card.Title>
           <Card.Subtitle>5</Card.Subtitle>
        </Card.Body>
       </Card>

       <Card className="shadow-lg p-3 bg-info">
        <Card.Body>
           <Card.Title><ProductionQuantityLimitsIcon /> Prodcuts</Card.Title>
           <Card.Subtitle>123</Card.Subtitle>
        </Card.Body>
       </Card>

       <Card className="shadow-lg p-3 bg-primary">
        <Card.Body>
           <Card.Title><PeopleIcon /> Users</Card.Title>
           <Card.Subtitle>34</Card.Subtitle>
        </Card.Body>
       </Card>

       <Card className="shadow-lg p-3 bg-danger">
        <Card.Body>
           <Card.Title><AddAlertIcon /> Alert</Card.Title>
           <Card.Subtitle>18</Card.Subtitle>
        </Card.Body>
       </Card>
       </div>
        <div className="charts d-flex align-items-top gap-5 h-100">
        <Box  sx={{ maxWidth: '100%',height:300, marginTop:"0rem", borderRadius: 2 , border:'1px solid #4a4e69' }}>
            <BarChart 
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            width={300}
            height={250}
            />
        </Box>
        <Box  sx={{ maxWidth: '100%' ,height:300, marginTop:"0rem", borderRadius: 2 , border:'1px solid #4a4e69' }}>
        <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
                {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
                },
            ]}
            width={300}
            height={250}
        />
        </Box>
        </div>
      

        
     </div>
    
    );
}

export default Home;