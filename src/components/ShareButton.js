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
    const locationArray = pathname.split('/');
    if (!locationArray) return;
    const location = `/${locationArray[1]}/${locationArray[2]}`;
    copy(`http://localhost:3000${location}`);
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
