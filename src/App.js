import React, { useState, useEffect } from 'react';
import StartPage from './pages/StartPage';
import PlayPage from './pages/PlayPage';
import EndPage from './pages/EndPage';

const PAGE = {
  START_PAGE: 'start-page',
  PLAY_PAGE: 'play-page',
  END_PAGE: 'end--page'
};

const LO_BEST_KEY = 'best_snake_game_score';

const App = () => {
  const [page, setPage] = useState(PAGE.START_PAGE);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(
    parseInt(localStorage.getItem(LO_BEST_KEY) || 0)
  );

  useEffect(() => {
    localStorage.setItem(LO_BEST_KEY, best);
  }, [best]);

  function toPlayPage() {
    setScore(0);
    setPage(PAGE.PLAY_PAGE);
  }

  function toEndPage() {
    setBest(Math.max(best, score));
    setPage(PAGE.END_PAGE);
  }

  function toStartPage() {
    setPage(PAGE.START_PAGE);
  }

  switch (page) {
    case PAGE.START_PAGE:
      return <StartPage toNextPage={toPlayPage} />;
    case PAGE.PLAY_PAGE:
      return (
        <PlayPage
          toNextPage={toEndPage}
          best={best}
          score={score}
          setScore={setScore}
        />
      );
    case PAGE.END_PAGE:
      return (
        <EndPage
          toNextPage={toStartPage}
          toPrevPage={toPlayPage}
          best={best}
          score={score}
        />
      );
    default:
      return null;
  }
};

export default App;
