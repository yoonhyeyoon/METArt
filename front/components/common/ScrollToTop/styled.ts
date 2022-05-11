import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const topBtn = css`
  position: fixed;
  opacity: 0;
  bottom: 40px;
  right: 40px;
  z-index: -10;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0 none;
  background: whiteSmoke;
  color: #444;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: opacity 0.3s ease-in;
  &:hover &:focus &:active {
    outline: 0 none;
    box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, 0.3);
  }
`;

export const topBtnActive = css`
  ${topBtn}
  z-index: 10;
  opacity: 1;
`;
