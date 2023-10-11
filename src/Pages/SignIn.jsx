import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import botIcon from '../assets/Icons/boticon.png'
import { setLocalStorage } from '../LocalStorage';
import { useNavigate } from 'react-router-dom'


const SignIn = () => {
  const navigate = useNavigate();
  
    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData={
          email: data.get('email'),
          password: data.get('password'),
        }
        try{
          const url='http://localhost:3000/login';
          const response= await fetch(url,{
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(userData),
          })
          if(response.status===200){
            const resData= await response.json();
            setLocalStorage('app-auth',resData.data[0].token);
            navigate('/')
          }else if(response.status===400){
            alert(response.message,'error')
            console.log(response.message,'error')
            
          }
        }catch(error){
          console.log('error')
        }
             };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
         <img src={botIcon} alt="" />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
          sx={{alignItems:'left'}}
            control={<Checkbox value="remember" color="primary"  />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Typography onClick={() => navigate('/registration')} color="textPrimary" variant="body2">
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignIn