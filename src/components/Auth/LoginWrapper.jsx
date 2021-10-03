import { Card, CardContent, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import Login from './Login'
import Signup from './Signup'
import { useLocation } from 'react-router-dom'

function LoginWrapper() {

    const loc = useLocation()

    return (
        <Container sx={{ minWidth:'100%', height: '100vh', display:'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', background:'whitesmoke' }}>
            <Card sx={{ width: 450, m:'0 20px'}} elevation={8} >
                <CardContent >
                    <Typography
                        variant='h2'
                        sx={{m: 2}}
                    >
                        { loc.pathname.toLowerCase() ==='/login' ? 'Login In' : 'Register' }
                    </Typography>
                    { loc.pathname.toLowerCase() === '/login' ? <Login /> : <Signup />}

                </CardContent>
            </Card>
        </Container>
    )
}

export default LoginWrapper
