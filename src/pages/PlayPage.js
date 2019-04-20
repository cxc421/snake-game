import React from 'react';
import styled, { css as _css } from 'styled-components';
import PropTypes from 'prop-types';

import Container from '../components/Container';
import SandBox from '../components/SandBox';

const decorationStyle = _css`
  font-size: 36px;
  color: white;
  position: absolute;
`;

const DecorationText1 = styled.div`
  ${decorationStyle}
  top: 27px;
  left: 27px;
  transform-origin: right top;
  transform: translateX(-100%) rotate(-90deg);
`;

const DecorationText2 = styled.div`
  ${decorationStyle}
  top: 27px;
  left: 64px;
`;

const DecorationText3 = styled.div`
  ${decorationStyle}
  bottom: 27px;
  right: 27px;
  transform-origin: right bottom;
  transform: translateX(-37px) rotate(90deg);
`;

const DecorationText4 = styled.div`
  ${decorationStyle}
  bottom: 27px;
  right: 64px;
  transform-origin: left bottom;
  transform: translate(100%, -100%) rotate(180deg);
`;

const scoreStyle = _css`
  position: absolute;
  color: white;
  > *:nth-child(1) {
    font-size: 16px;
    vertical-align: middle;
  }
  > *:nth-child(2) {
    font-size: 36px;
    margin-left: 8px;
    vertical-align: middle;
  }
`;

const ScoreArea = styled.div`
  ${scoreStyle};
  right: 80px;
  top: 27px;
`;

const BestArea = styled.div`
  ${scoreStyle};
  left: 80px;
  bottom: 27px;
`;

const PlayPage = ({ toNextPage, score, setScore, best }) => {
  const containerStyle = {
    background: 'black',
    padding: 80
  };

  return (
    <Container style={containerStyle}>
      <DecorationText1>SNAA</DecorationText1>
      <DecorationText2>AAAAKE</DecorationText2>
      <DecorationText3>SNAA</DecorationText3>
      <DecorationText4>AAAAKE</DecorationText4>
      <ScoreArea>
        <span>score</span>
        <span>{score}</span>
      </ScoreArea>
      <BestArea>
        <span>best</span>
        <span>{best}</span>
      </BestArea>
      <SandBox toNextPage={toNextPage} setScore={setScore} />
    </Container>
  );
};

PlayPage.propTypes = {
  toNextPage: PropTypes.func.isRequired
};

export default PlayPage;
