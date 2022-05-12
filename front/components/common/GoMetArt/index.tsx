import React from 'react';
import { useState, useEffect } from 'react';
import { MetaArtBtn, MetaArtBtnActive } from './styled';

function GoMetArt() {
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return (
    <div>
      <button css={BtnStatus ? MetaArtBtnActive : MetaArtBtn}>M</button>
    </div>
  );
}

export default GoMetArt;
