import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import iconShared from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [copyClipboard, setCopyClipboard] = useState(false);

  function handleShareButton() {
    setCopyClipboard(true);
    copy(`http://localhost:3000${pathname}`);
  }

  return (
    <button data-testid="share-btn" type="button" onClick={ () => handleShareButton() }>
      { copyClipboard
        ? <span>Link copiado!</span>
        : <img src={ iconShared } alt="Compartilhar Receita" />}
    </button>
  );
}

export default ShareButton;
