import React from 'react';
import EditProfilePage from './component/EditProfileUser';
import UserSidebar from './component/UserSidebar';
import { Switch , Route, Routes } from 'react-router-dom';
import SecurityUsers from './component/SecurityUser';

function AccountSettingUser({isLoggedIn}) {
    return ( 
        <>
        
        <div  className="d-flex flex-row justify-content-between">
        <UserSidebar />
        <Switch>
        <Route  path="/account/setting/edit" component={EditProfilePage}/>
        <Route  path="/account/setting/security" component={SecurityUsers}/>
        <Route  path="/account/setting/edit" component={EditProfilePage}/>
        <Route  path="/account/setting/edit" component={EditProfilePage}/>

        </Switch>
        </div>
        </>
     );
}

export default AccountSettingUser;