import React, {useState, useRef, useEffect } from 'react'
import { Button,Dialog, DialogContent, DialogContentText, DialogTitle, 
         DialogActions, IconButton, TextField } from '@mui/material'
import { Close, Send} from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import PasswordField from './PasswordField'
import GoogleOneTapLogin from './GoogleOneTapLogin'
import { login, register } from '../../actions/user'

const Login = () => {
    const {state:{openLogin}, dispatch}=useValue()
    const [title, setTitle] = useState('Login')
    const [isRegister, setIsRegister] = useState(false)
    const emailRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()


    const handleClose = () => {
        dispatch({type:'CLOSE_LOGIN'})
    };

    const handleSubmit =(e) => {
        e.preventDefault();
        const email=emailRef.current.value
        const password=passwordRef.current.value
        // send login request if  it is not registered and return
        if(!isRegister) return login({ email, password }, dispatch);
        const name = nameRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if (password !== confirmPassword)
            return dispatch({
                type:'UPDATE_ALERT',
                payload: {
                    open: true,
                    severity: 'error',
                    message: 'Passwords do not match',
                },
            });
            // send register request
            register({name,email,password}, dispatch);

        // // testing Loading
        // dispatch({type: 'START_LOADING'})
        // setTimeout(()=> {
        //     dispatch({type: 'END_LOADING'})
        // }, 6000)
        // // testing notification
        // const password = passwordRef.current.value;
        // const confirmPassword = confirmPasswordRef.current.value;

        // if(password !== confirmPassword) {
        //    return dispatch({  
        //         type:'UPDATE_ALERT', 
        //         payload:
        //             { open:true, 
        //             severity:'error', 
        //             message:'Password doesnot match'},
        //         })
        // }
    };

    useEffect(() => {
        isRegister ? setTitle('Register') : setTitle('Login')
    }, [isRegister]);

  return (
    <Dialog
        open={openLogin}
        onClose={handleClose}
    >
        <DialogTitle>
            {title}
            <IconButton
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: (theme)=> theme.palette.grey[500]
                }}
                onClick={handleClose}
            >
                <Close />
            </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                    Please fill your information in the field below:
                </DialogContentText>
                {isRegister && 
                <TextField 
                    autoFocus
                    margin='normal'
                    variant='standard'
                    id='name'
                    label='Name'
                    type='text'
                    fullWidth
                    inputRef={nameRef}
                    inputProps={{minLength: 2}}
                    required
                />
                }
                <TextField 
                    autoFocus={!isRegister}
                    margin='normal'
                    variant='standard'
                    id='email'
                    label='Email'
                    type='email'
                    fullWidth
                    inputRef={emailRef}
                    required
                />
                <PasswordField {...{passwordRef}}/>
                    {isRegister && 
                    <PasswordField 
                        passwordRef={confirmPasswordRef} 
                        id='confirmPassword' 
                        label='Confirm Password' 
                    /> }
            </DialogContent>
            <DialogActions sx={{px:'19px'}}>
                <Button type='submit' variant='contained' endIcon={<Send />}>
                    Submit
                </Button>
            </DialogActions>
        </form>
        <DialogActions sx={{justifyContent: 'left', p: '5px, 24px'}}>
            {isRegister?'Do you have an account? Sign in now' : "Don't you have an account? Creat one now"}
            <Button onClick={()=>setIsRegister(!isRegister)}>
                {isRegister ? 'Login' : "Register"}
            </Button>
        </DialogActions>
        <DialogActions sx={{ justifyContent: 'center', py: '24px'}}>
            <GoogleOneTapLogin />
        </DialogActions>
    </Dialog>
  )
}

export default Login
