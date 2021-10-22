import styled from 'styled-components'

export const Wrapper = styled.div`
  height: ${({ height }) => height}px;
  width: 100%;
  background: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  video,
  img {
    position: absolute;
    transition: visibility 0s, opacity 0.5s linear;
    z-index: 0;
    height: ${(props) => props.height}px;
    object-fit: cover;
    top: 0;
    left: 0;
    width: 100%;
  }
  .content {
    display: flex;
    opacity: ${props=>props.isCurrentSlide ? 1 : 0};
    transition: all 1s 1.5s;
    flex-direction: column;
    margin-left: 50px;
    margin-bottom: ${props=>props.isCurrentSlide ? 2 : 4}rem;
    z-index: 1;
    h1 {
      margin-left: 0;
      font-family: 'Value Sans Pro';
      font-size: 5rem;
      color: ${(props) => props.color || '#ffffff'};
      font-weight: 400;
      @media (max-width: 768px) {
        font-size: 4rem;
      }
      @media (max-width: 640px) {
        font-size: 3rem;
      }
    }
    .title2 {
      margin-top: -70px;
      margin-left: ${ (props)=> (props.leftPad ? '25px' : '0px')};
      font-family: 'Value Sans Pro';
      font-size: 5rem;
      color: ${(props) => props.color || '#ffffff'};
      font-weight: 400;
      padding: 0px;
      margin-left: 25px;
      @media (max-width: 1024px) {
        margin-top: -60px !important;
      }
      @media (max-width: 768px) {
        margin-top: -40px !important;
        font-size: 4rem;
      }
      @media (max-width: 640px) {
        margin-top: -30px !important;
        font-size: 3rem;
      }
    }
    @media (max-width: 768px) {
      margin: 3rem;
      margin-bottom: ${props=>props.isCurrentSlide ? 3 : 5}rem;
      transition: all 1s 1s;
    }
  }
`

export const Loading = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
