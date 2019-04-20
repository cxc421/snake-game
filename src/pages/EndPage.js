import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Container from '../components/Container';
import Title from '../components/Title';

const CenterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScoreArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 160px;

  & > *:nth-child(1) {
    font-size: 16px;
    line-height: 17px;
  }

  & > *:nth-child(2) {
    font-size: 36px;
    line-height: 37px;
    margin-top: 18px;
  }
`;

const InverseColorText = styled.div`
  font-size: 24px;
  color: black;
  background: white;
  padding: 8px;
  margin-top: 64px;
`;

const CheckText = styled.span`
  color: #00ffe2;
  font-size: 24px;
  margin-top: 40px;

  &:last-child {
    margin-left: 86px;
  }
`;

const EndPage = ({ toNextPage, toPrevPage, best, score }) => {
  const containerStyle = {
    background: 'black',
    color: 'white'
  };

  useEffect(() => {
    function onKeyPress(e) {
      if (e.keyCode === 121 || e.keyCode === 89) {
        toPrevPage();
      } else if (e.keyCode === 110 || e.keyCode === 78) {
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
      <Title style={{ marginTop: 253 }}>GAME OVER</Title>
      <CenterRow style={{ marginTop: 40 }}>
        <ScoreArea>
          <span>score</span>
          <span>{score}</span>
        </ScoreArea>
        <span style={{ fontSize: 36, margin: '0 38px' }}>/</span>
        <ScoreArea>
          <span>best</span>
          <span>{best}</span>
        </ScoreArea>
      </CenterRow>
      <CenterRow>
        <InverseColorText>RESTART?</InverseColorText>
      </CenterRow>
      <CenterRow>
        <CheckText>YES[Y]</CheckText>
        <CheckText>NO[N]</CheckText>
      </CenterRow>
    </Container>
  );
};

EndPage.propTypes = {
  toNextPage: PropTypes.func.isRequired,
  toPrevPage: PropTypes.func.isRequired
};

export default EndPage;
