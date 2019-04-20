import styled from 'styled-components';

const width = 1280;
const height = 800;

function getScale(w, h) {
  const { clientHeight, clientWidth } = document.body;
  if (clientHeight >= h && clientWidth >= w) {
    return 1;
  }

  let newW = clientWidth;
  let newH = (h * newW) / w;
  if (newH > clientHeight) {
    return clientHeight / h;
  } else {
    return clientWidth / w;
  }
}

const Container = styled.div`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  transform: translate(-50%, -50%) scale(${getScale(width, height)});
  background: gray;
`;

export default Container;
