import React , {useState} from 'react';
import Header from './component/Header/Header';
import Home from './component/Home/Home';
import Sidebar from './component/Sidebar/Sidebar';
import LoginPage from '../pages/Login';

function Dashboard({name ,handleLogout  }){
   
    const [isDark , setIsDark] = useState(true)
  
    const handleTheme = () => {
      setIsDark(!isDark)
  
      setStyles(prevStyles => ({
        ...prevStyles,
        header: {
          backgroundColor: isDark ? '#fff' : '#2b2d42',
          color: isDark ? '#000' : '#fff',
        },
        dashboard: {
          backgroundColor: isDark ? '#fff' : '#2b2d42',
          color: isDark ? '#000' : '#fff',
        },
        sidebar: {
          backgroundColor: isDark ? '#fff' : '#2b2d42',
          color: isDark ? '#000' : '#fff',
        },
        home: {
          backgroundColor: isDark ? '#fff' : '#2b2d42',
          color: isDark ? '#000' : '#fff',
        },
      }))
    }
    const [styles, setStyles] = useState({
        header: {
          backgroundColor: '#2b2d42',
          color: '#fff',
        },
        dashboard: {
          backgroundColor: '#2b2d42',
          color: '#fff',
        },
        sidebar: {
          backgroundColor: '#2b2d42',
          color: '#fff',
        },
        home: {
          backgroundColor: '#2b2d42',
          color: '#fff',
        },
      })
      
    

    return(
      <div className='dashbaord' style={styles.dashboard} >
      <Header styles={styles} handleTheme={handleTheme} name={name}/>
      <Sidebar styles={styles} onLogout={handleLogout}/>
      <Home styles={styles}/>
    </div>
 
    )
}
export default Dashboard;