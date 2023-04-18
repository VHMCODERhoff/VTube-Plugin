import LogoVtube from '../../assets/img/vtubelogo.png'
import { Card, Logo, Label, Description, Input, Button, Line } from './styles'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const SignIn = () => {
    if (email !== '' && password !== '') {
      if (email === 'test@example.com' && password === '123456') {
        localStorage.setItem('VTS.JS_TEST_AUTH_TOKEN_Login', JSON.stringify({ email: email}))
        navigate('/dashboard')
      } else {
        alert('Email ou senha inválidos')
      }
    } else {
      alert('Preencha todos os campos!')
    }
  }

  return (
    <div>
      <section>
        <Card>
          <br />
          <Logo src={LogoVtube} alt="logotipo" />
          <br />
          <Label>Hi, Welcome Back</Label>
          <br />
          <Description>Sign in to continue</Description>

          <div>
            <Input type="text" onChange={(e) => setEmail(e.currentTarget.value)} placeholder="Email" />
            <Input type="password" onChange={(a) => setPassword(a.currentTarget.value)} placeholder="Password" />
            <Button onClick={SignIn}>Sign In</Button>
            <Line />
          </div>
        </Card>
      </section>
    </div>
  )
}

export default LoginScreen