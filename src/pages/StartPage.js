import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Container from '../components/Container';
import Title from '../components/Title';
import bgSrc from '../assets/bg-start.svg';

// const Title = styled.h1`
//   text-align: center;
//   font-size: 36px;
//   margin-top: 360px;
//   color: white;

//   &::before,
//   &::after {
//     content: '';
//     display: inline-block;
//     width: 40px;
//     height: 40px;
//     background: white;
//   }

//   &::before {
//     margin-right: 20px;
//   }

//   &::after {
//     margin-left: 20px;
//   }
// `;

const Content = styled.p`
  font-size: 24px;
  text-align: center;
  color: #00ffe2;
  margin-top: 40px;
`;

const StartPage = ({ toNextPage }) => {
  const containerStyle = {
    background: `url(${bgSrc})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'cover'
  };

  useEffect(() => {
    function onKeyPress(e) {
      // space
      if (e.keyCode === 32) {
        toNextPage();
      }
    }

    window.addEventListener('keypress', onKeyPress);
    return () => {
      window.removeEventListener('keypress', onKeyPress);
    };
  }, []);

  return (
    <Container style={containerStyle}>
      <Title style={{ marginTop: 360 }}>SNAAAAAAKE</Title>
      <Content>PRESS [SPACE] TO START</Content>
    </Container>
  );
};

StartPage.propTypes = {
  toNextPage: PropTypes.func.isRequired
};

export default StartPage;
