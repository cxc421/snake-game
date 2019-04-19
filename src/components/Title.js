import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  /* margin-top: 360px; */
  color: white;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    background: white;
  }

  &::before {
    margin-right: 20px;
  }

  &::after {
    margin-left: 20px;
  }
`;

export default Title;
