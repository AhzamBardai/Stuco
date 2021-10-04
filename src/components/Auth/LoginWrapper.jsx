import { Card, CardContent, Container, Typography, Link } from '@mui/material'
import React from 'react'
import Login from './Login'
import Signup from './Signup'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

function LoginWrapper() {

    const loc = useLocation()
    const test = useMediaQuery('(max-height: 680px)')
    console.log(test)
    return (
        <Container sx={{ minWidth:'100%', height: `${ test ? '100%' : '100vh'}`, display:'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', background:'whitesmoke' }}>
            <Card sx={{ width: 450, m:'50px 20px'}} elevation={8} >
                <CardContent >
                    <Typography
                        variant='h2'
                        sx={{m: 2}}
                    >
                        { loc.pathname.toLowerCase() ==='/login' ? 'Login In' : 'Register' }
                    </Typography>

                    { loc.pathname.toLowerCase() === '/login' 
                        ? <Typography variant='body2' > New here? <Link href='/signup' >Create an account.</Link> </Typography> 
                        : <Typography variant='body2' > Already a user? <Link href='/login' >Log in here.</Link> </Typography>
                    }

                    { loc.pathname.toLowerCase() === '/login' ? <Login /> : <Signup />}

                </CardContent>
            </Card>
        </Container>
    )
}

export default LoginWrapper
