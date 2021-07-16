import { OverlayTrigger, Tooltip } from 'react-bootstrap';
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
    <>
      {['left'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={ placement }
          placement={ placement }
          overlay={
            <Tooltip id={ `tooltip- ${placement} ` }>
              Link
              <strong> Copiado</strong>
            </Tooltip>
          }
        >
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => handleShareButton() }
          >
            <img src={ iconShared } alt="Compartilhar Receita" />
          </button>
          {/* <Button variant="secondary">Popover on {placement}</Button> */}
        </OverlayTrigger>
      ))}
    </>
  );
}

export default ShareButton;
