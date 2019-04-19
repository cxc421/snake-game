import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import PlayPage from './pages/PlayPage';
import EndPage from './pages/EndPage';

const PAGE = {
  START_PAGE: 'start-page',
  PLAY_PAGE: 'play-page',
  END_PAGE: 'end--page'
};

const App = () => {
  const [page, setPage] = useState(PAGE.END_PAGE);

  function toPlayPage() {
    setPage(PAGE.PLAY_PAGE);
  }

  function toEndPage() {
    setPage(PAGE.END_PAGE);
  }

  function toStartPage() {
    setPage(PAGE.START_PAGE);
  }

  switch (page) {
    case PAGE.START_PAGE:
      return <StartPage toNextPage={toPlayPage} />;
    case PAGE.PLAY_PAGE:
      return <PlayPage toNextPage={toEndPage} />;
    case PAGE.END_PAGE:
      return <EndPage toNextPage={toStartPage} toPrevPage={toPlayPage} />;
    default:
      return null;
  }
};

export default App;
