import { css } from '@emotion/react';

export const profileBox = css`
  padding-top: 5%;
  width: 100%;
  /* padding-right: 10%; */
  /* padding-left: 10%; */
  /* margin-right: auto;
  margin-left: auto; */
`;

export const profileContainer = css`
  display: flex;
  flex-wrap: wrap;
`;

export const profileDiv = css`
  /* padding: 0 30px; */
  width: 50%;
  text-align: center;
  /* font-size: 2rem; */
`;

export const profileImgDiv = css`
  margin: auto;
  overflow: hidden;
  width: 400px;
  border-radius: 10%;
`;

export const profileImg = css`
  max-width: 100%;
  /* transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.4);
  } */
  border-radius: 10%;
`;

export const profileDescription = css`
  text-align: left;
`;

export const profileName = css`
  font-size: 4.2rem;
  margin-top: 1.5rem;
  margin-bottom: 4rem;
`;

export const profileInfo = css`
  font-size: 1.5rem;
  line-height: 2.2rem;
  padding-bottom: 2rem;
  padding-left: 1px;
`;
