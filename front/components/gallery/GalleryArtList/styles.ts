import { css } from '@emotion/react';

export const galleryArtContent = css`
  max-width: 100%;
  margin: 0 auto;
`;

export const galleryArtBox = css`
  display: flex;
  flex-wrap: wrap;
  display: grid;
  grid-gap: 0.2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(20vh, 200px);
`;
