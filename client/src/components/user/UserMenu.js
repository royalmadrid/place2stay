import React, { useEffect } from 'react'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { Dashboard,Logout, Settings } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import useCheckToken from '../../hooks/useCheckToken'
import Profile from './Profile'
import { useNavigate} from 'react-router-dom'
import { storeRoom } from '../../actions/room'
import { logout } from '../../actions/user'

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu}) => {
    useCheckToken();
    const {dispatch, 
           state:{currentUser, location, details, images, updatedRoom, deletedImages, addedImages}
    } = useValue();

    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null)
    };
    const handleLogout = () => {
        storeRoom(location, details, images, updatedRoom, deletedImages, addedImages, currentUser.id)
        logout(dispatch)
    }

    const navigate = useNavigate();

    useEffect(()=>{
        const storeBeforeLeave = (e) => {
            if (
              storeRoom(
                location,
                details,
                images,
                updatedRoom,
                deletedImages,
                addedImages,
                currentUser.id
              )
            ) {
              e.preventDefault();
              e.returnValue = true;
            }
          };
        window.addEventListener('beforeunload', storeBeforeLeave);
        return () => window.removeEventListener('beforeunload', storeBeforeLeave);
    }, [location, details, images]);
    // const testAuthorization = async() => {
    //     const url = process.env.REACT_APP_SERVER_URL + '/room/'; 
    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 authorization: `Bearer ${currentUser.token}`
    //             }
    //         })
    //         const data = await response.json();
            
    //         console.log(data)
    //         if(!data.success){
    //             if(response.status === 401) dispatch({type:'UPDATE_USER', payload:null})
    //             throw new Error(data.message)
    //         }
    //     } catch (error) {
    //         dispatch({
    //             type: 'UPDATE_ALERT',
    //             payload: {
    //                 open: true,
    //                 severity: 'error',
    //                 message: error.message
    //             }
    //         });
    //         console.log(error)
    //     }
    // }
  return (
    <>
    <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
    >
        {!currentUser.google && (
        <MenuItem onClick={()=>{
            dispatch({
                type:'UPDATE_PROFILE',
                payload: {
                    open: true,
                    file: null,
                    photoURL: currentUser.photoURL,
                }
            })
        }}>
            <ListItemIcon>
                <Settings fontSize="small" />
            </ListItemIcon>
            Profile
        </MenuItem> 
        )}
        <MenuItem onClick={()=>navigate('dashboard')}>
            <ListItemIcon>
                <Dashboard fontSize="small" />
            </ListItemIcon>
            Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogout}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            Logout
        </MenuItem>
    </Menu>
    <Profile />
    </>
  )
}

export default UserMenu
