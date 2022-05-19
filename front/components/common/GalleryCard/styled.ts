import { css } from '@emotion/react';

export const transParentBox = css`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  transform: background-color 0.3s ease;
  font-size: 2em;
`;

export const caption = css`
  position: absolute;
  bottom: 5px;
  left: 20px;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

export const artPrice = css`
  opacity: 0.5;
  font-size: 0.8em;
`;

export const artPriceUp = css`
  position: relative;
  /* opacity: 0.5; */
  font-size: 0.8em;
  padding-bottom: 2rem;
`;
