/**
【特定技術】需記錄歷史最高分紀錄，吃到一個餌加一分。
【特定技術】留意貪吃蛇變長時，也會依照蛇的長度提供漸層顏色。餌的座標也需提供十字光亮漸層。
【特定技術】蛇體可穿牆到對向位置
【特定技術】留意全程遊戲都必須透過鍵盤來操作。
 */

import React, { useReducer, useEffect, useState } from 'react';
import styled, { css as _css } from 'styled-components';
import PropTypes from 'prop-types';
import produce from 'immer';
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

const rowNum = 16;
const colNum = 28;
const DIRECTION = {
  TOP: 'd-t',
  LEFT: 'd-l',
  RIGHT: 'd-r',
  BOTTOM: 'd-b',
  NONE: 'd-n'
};

const computeBoxes = (rowNum, colNum) => {
  const boxes = [];
  for (let y = 0; y < rowNum; y++) {
    for (let x = 0; x < colNum; x++) {
      boxes.push({
        x,
        y
      });
    }
  }
  return boxes;
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeBait(snake) {
  let repeatPoint = snake[0];
  let bait = { x: 0, y: 0 };
  const MAX_TIME = 999;
  let count = 0;

  function findRepeat(bait) {
    return snake.find(s => s.x === bait.x && s.y === bait.y);
  }

  while (repeatPoint) {
    bait = { x: getRndInteger(0, colNum), y: getRndInteger(0, rowNum) };
    repeatPoint = findRepeat(bait);
    // console.log('make-' + count, { bait, snake, repeatPoint });
    count++;
    if (count >= MAX_TIME) {
      break;
    }
  }
  return bait;
}

const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'snake-move':
        if (draft.direction === DIRECTION.NONE) return;

        const snakeHead = draft.snake[0];
        let newX, newY;
        if (draft.direction === DIRECTION.RIGHT) {
          newX = snakeHead.x + 1;
          newY = snakeHead.y;
        } else if (draft.direction === DIRECTION.LEFT) {
          newX = snakeHead.x - 1;
          newY = snakeHead.y;
        } else if (draft.direction === DIRECTION.TOP) {
          newX = snakeHead.x;
          newY = snakeHead.y - 1;
        } else if (draft.direction === DIRECTION.BOTTOM) {
          newX = snakeHead.x;
          newY = snakeHead.y + 1;
        }

        if (newX >= colNum) {
          newX = 0;
        } else if (newX < 0) {
          newX = colNum - 1;
        }
        if (newY >= rowNum) {
          newY = 0;
        } else if (newY < 0) {
          newY = rowNum - 1;
        }

        draft.snake.splice(0, 0, {
          x: newX,
          y: newY
        });
        if (newX === draft.bait.x && newY === draft.bait.y) {
          draft.bait = makeBait(draft.snake);
        } else {
          draft.snake.pop();
        }
        break;
      case 'change-direction':
        if (draft.snake.length > 1) {
          if (
            draft.direction === DIRECTION.TOP &&
            action.direction === DIRECTION.BOTTOM
          ) {
            return;
          }
          if (
            draft.direction === DIRECTION.BOTTOM &&
            action.direction === DIRECTION.TOP
          ) {
            return;
          }
          if (
            draft.direction === DIRECTION.LEFT &&
            action.direction === DIRECTION.RIGHT
          ) {
            return;
          }
          if (
            draft.direction === DIRECTION.RIGHT &&
            action.direction === DIRECTION.LEFT
          ) {
            return;
          }
        }
        draft.direction = action.direction;
        break;
      default:
    }
  });

const initialSnake = [{ x: 3, y: 7 }];
const initialBait = makeBait(initialSnake);

const SandBox = ({ toNextPage, setScore }) => {
  const [canPlay, setCanPlay] = useState(true);
  const boxes = React.useMemo(() => computeBoxes(rowNum, colNum), [
    rowNum,
    colNum
  ]);

  const [state, dispatch] = useReducer(reducer, {
    bait: initialBait,
    snake: initialSnake,
    direction: DIRECTION.NONE
  });
  const { bait, snake, direction } = state;

  useEffect(() => {
    let key = null;
    if (canPlay) {
      dispatch({
        type: 'snake-move'
      });
      key = setInterval(() => {
        dispatch({
          type: 'snake-move'
        });
      }, 200);
    }
    return () => {
      clearInterval(key);
    };
  }, [direction, canPlay]);

  useEffect(() => {
    setScore(snake.length - 1);
  }, [snake.length]);

  useEffect(() => {
    const sHead = snake[0];
    const collapsePoint = snake.find(
      (s, idx) => idx > 0 && (s.x === sHead.x && s.y === sHead.y)
    );
    if (collapsePoint) {
      setCanPlay(false);
      setTimeout(toNextPage, 1000);
    }
  }, [snake]);

  useEffect(() => {
    function onKeyDown(e) {
      switch (e.keyCode) {
        case 38:
        case 104:
          dispatch({
            type: 'change-direction',
            direction: DIRECTION.TOP
          });
          break;
        case 37:
        case 100:
          dispatch({
            type: 'change-direction',
            direction: DIRECTION.LEFT
          });
          break;
        case 40:
        case 98:
          dispatch({
            type: 'change-direction',
            direction: DIRECTION.BOTTOM
          });
          break;
        case 39:
        case 102:
          dispatch({
            type: 'change-direction',
            direction: DIRECTION.RIGHT
          });
          break;
        default:
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

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
      let background = canPlay ? 'rgb(0,255,226)' : 'rgb(255,0,0)';
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
  toNextPage: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired
};

export default SandBox;
