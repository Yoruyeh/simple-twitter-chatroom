import Login from '../components/Login'
import Layout from '../layout/Layouts'
import styled from 'styled-components'

const StyledLayout = styled(Layout)`
  padding-top: 64px;
`

export default function LoginPage() {
  return (
    <StyledLayout className='justify-content-center'>
      <Login />
    </StyledLayout>
  )
}
