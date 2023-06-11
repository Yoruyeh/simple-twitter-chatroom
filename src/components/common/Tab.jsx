import styled from 'styled-components'
import { useNavigate } from 'react-router-dom' 

// 顏色變量
const dividerColor = '#E6ECF0'
const fontDefaultColor = '#657786'

// Container
const StyledContainer = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 0;

  color: ${fontDefaultColor};
  border-bottom: solid 1px ${dividerColor};
`

// Item
const Item = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: #fff;
  font-size: 15px;
  width: 130px;
  height: 52px;
  z-index: 999;

  &:hover {
    border-bottom: 2px solid var(--main);
    color: var(--main);
  }
`

// 根據條件返回相應的內容
function ReturnItems() {
  const navigate = useNavigate()
  
  if (window.location.pathname.includes('followers') || window.location.pathname.includes('followings')) {
    return (
      <>
      {/* id還要改 */}
        <Item className='col-4' onClick={() => navigate('/14/followers')}>追蹤者</Item>
        <Item className='col-4' onClick={() => navigate('/14/followings')}>正在追蹤</Item>
        <Item className='col-4'></Item>
      </>
    )
  } else {
    return (
      <>
        <Item className='col-4'>推文</Item>
        <Item className='col-4'>回覆</Item>
        <Item className='col-4'>喜歡的內容</Item>
      </>
    )
  }
}

export default function Tab() {
  return (
    <>
      <StyledContainer className='container-fluid'>
        <div className='d-flex'>
          <ReturnItems />
        </div>
      </StyledContainer>
    </>
  )
}
