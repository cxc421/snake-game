import React from 'react';
import styled, { css as _css } from 'styled-components';
import PropTypes from 'prop-types';
import baitImgSrc from '../assets/ic-point.svg';

const Wrapper = styled.div`
  width: 1120px;
  height: 640px;
  position: relative;
  border: solid 1px #002a9d;
  box-sizing: content-box;
  background: #00035a;

  display: flex;
  flex-wrap: wrap;
`;

const boxStyle = prop => _css`
  width: calc(1120px / ${prop.colNum});
  height: calc(100% / ${prop.rowNum});
`;

const Box = styled.div`
  position: relative;
  border: solid 1px #002a9d;
  ${boxStyle}
  margin: 0px;
  text-align: center;
`;

const BaitBackground = styled.div`
  position: absolute;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(255, 255, 255);
  opacity: ${prop => prop.opacity || 1};
  z-index: 10;
`;

const BaitImg = styled.img`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  transform-origin: center center;
  transform: scale(2);
  z-index: 20;
`;

const SnakeBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
  z-index: 25;
  background: #00035a;
`;

const SnakeHeadShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  top: 0;
  left: 0;
  z-index: 24;
  box-shadow: 0px 9px 13px 9px rgba(255, 255, 255, 0.16),
    0px -9px 13px 9px rgba(255, 255, 255, 0.16),
    9px 0px 13px 9px rgba(255, 255, 255, 0.16),
    -9px 0px 13px 9px rgba(255, 255, 255, 0.16);
  background: #00035a;
`;

const SnakeBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${prop => prop.background || 'black'};
  z-index: 30;
`;

function getOpacity({ d, dMin = 0, dMax = 1, oMin = 0, oMax = 1 }) {
  return ((d - dMin) * (oMax - oMin)) / (dMax - dMin) + oMin;
}

const SandBox = ({ toNextPage }) => {
  const rowNum = 16;
  const colNum = 28;
  const boxes = [];
  for (let y = 0; y < rowNum; y++) {
    for (let x = 0; x < colNum; x++) {
      boxes.push({
        x,
        y
      });
    }
  }

  const bait = {
    x: 20,
    y: 8
  };

  const snake = [
    { x: 10, y: 6 },
    { x: 9, y: 6 },
    { x: 8, y: 6 },
    { x: 7, y: 6 },
    { x: 6, y: 6 },
    { x: 5, y: 6 }
  ];

  function baitContent(x, y) {
    const xDiffMax = 14;
    const yDiffMax = 6;
    const xDiff = Math.abs(bait.x - x);
    const yDiff = Math.abs(bait.y - y);
    const sameX = x === bait.x;
    const sameY = y === bait.y;

    if ((sameX || sameY) && xDiff <= xDiffMax && yDiff <= yDiffMax) {
      let opacity = 0.3;
      if (!sameX || !sameY) {
        const oMax = 0.05;
        const oMin = 0.15;
        const dMin = 0;
        const dMax = sameX ? yDiffMax : xDiffMax;
        const d = sameX ? yDiff : xDiff;
        opacity = getOpacity({ oMax, oMin, dMax, dMin, d });
      }
      return (
        <>
          <BaitBackground opacity={opacity} />
          {x === bait.x && y === bait.y && <BaitImg src={baitImgSrc} />}
        </>
      );
    }

    return null;
  }

  function snakeContent(x, y) {
    let snakeIndex = 0;
    const snakePoint = snake.find((s, idx) => {
      snakeIndex = idx;
      return s.x === x && s.y === y;
    });

    if (snakePoint) {
      const isSnakeHead = snakeIndex === 0;
      let background = 'rgb(0,255,226)';
      if (!isSnakeHead) {
        const oMax = 0.3;
        const oMin = 1;
        const dMin = 1;
        const dMax = snake.length;
        const d = snakeIndex;
        background = `rgba(255,255,255,${getOpacity({
          d,
          dMax,
          dMin,
          oMax,
          oMin
        })})`;
      }
      return (
        <>
          <SnakeBackground />
          {isSnakeHead && <SnakeHeadShadow />}
          <SnakeBlock background={background} />
        </>
      );
    }

    return null;
  }

  return (
    <Wrapper>
      {boxes.map(({ x, y }) => (
        <Box key={`${x}-${y}`} rowNum={rowNum} colNum={colNum}>
          {baitContent(x, y)}
          {snakeContent(x, y)}
        </Box>
      ))}
    </Wrapper>
  );
};

SandBox.propTypes = {
  toNextPage: PropTypes.func.isRequired
};

export default SandBox;
