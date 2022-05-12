import { css } from '@emotion/react';

export const MetaArtBtn = css`
  font-family: Georgia, 'Times New Roman', Times, serif;
  position: fixed;
  opacity: 0;
  bottom: 110px;
  right: 40px;
  z-index: -10;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0 none;
  background: black;
  color: white;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: opacity 0.3s ease-in;
  &:hover {
    outline: 0 none;
    box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, 0.3);
  }
`;

export const MetaArtBtnActive = css`
  ${MetaArtBtn}
  z-index: 10;
  opacity: 1;
`;
