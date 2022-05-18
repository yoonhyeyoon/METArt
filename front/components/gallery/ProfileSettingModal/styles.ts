import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const styledModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const styledInput = css`
  width: 400px;
  /* height: 46px; */
  font-size: 1.2rem;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding: 13px 18px;
  border: 1px solid #e3e7eb;
  /* font-family: Georgia, 'Times New Roman', Times, serif; */
`;

export const styledInputBio = css`
  /* ${styledInput} {
    height: 100px;
    color: red;
  } */
  height: 200px;
`;

export const pictureButton = css`
  display: inline;
  padding-left: 33px;
  padding-bottom: 33px;
`;
