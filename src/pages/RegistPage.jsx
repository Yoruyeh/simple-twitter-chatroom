import styled from 'styled-components'
import Layout from '../layout/Layouts'
import Regist from '../components/Regist'

const StyledLayout = styled(Layout)`
  padding-top: 64px;
`

export default function RegistPage() {
  return (
    <StyledLayout className='justify-content-center'>
      <Regist />
    </StyledLayout>
  )
}
