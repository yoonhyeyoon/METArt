import { css } from '@emotion/react';

export const artBox = css`
  padding-top: 5%;
  width: 100%;
  /* padding-right: 10%; */
  /* padding-left: 10%; */
  /* margin-right: auto;
  margin-left: auto; */
`;

export const artContainer = css`
  display: flex;
  flex-wrap: wrap;
`;

export const artDiv = css`
  width: 100%;
  text-align: center;
`;

export const artImgDiv = css`
  margin: auto;
  overflow: hidden;
  /* width: auto; */
  display: inline-block;
  /* border-radius: 10%; */
`;

export const artImg = css`
  max-width: 100%;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
  /* border-radius: 10%; */
`;

export const artDescription = css`
  padding-top: 5%;
  text-align: center;
`;

export const artName = css`
  font-size: 2.5rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

export const artPrice = css`
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  color: #424242;
`;

export const artInfo = css`
  padding-top: 10%;
  font-size: 1.3rem;
  line-height: 2rem;
`;

export const artButton = css`
  background-color: #1aab8a;
  color: #fff;
  border: none;
  position: relative;
  height: 60px;
  font-size: 1.2rem;
  padding: 0.2rem;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  &:hover {
    background: #fff;
    color: #1aab8a;
  }
`;

export const artButtonSize = css`
  margin-top: 10px;
`;
