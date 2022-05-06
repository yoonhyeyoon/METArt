import React, { useState } from 'react';
import { deleteButton, stypedInput } from './styled';
import Grid from '@mui/material/Grid';

function ProfileSetting() {
  const [fileImg, setFileImg] = useState('');

  const saveFileImg = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target.files[0]) {
      setFileImg(URL.createObjectURL(e?.target.files[0]));
      console.log(URL.createObjectURL(e?.target.files[0]));
    }
  };

  const deleteFileImg = () => {
    URL.revokeObjectURL(fileImg);
    setFileImg('');
  };

  return (
    <main>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <h1>사진 미리보기</h1>
          <div>
            {fileImg && (
              <img
                src={fileImg}
                alt="sample"
                width={300}
                style={{ borderRadius: '40px' }}
              />
            )}
            <div>
              <input
                name="imgUpload"
                type="file"
                accept="image/*"
                onChange={saveFileImg}
              />
              <button onClick={() => deleteFileImg()} css={deleteButton}>
                삭제
              </button>
            </div>
          </div>
        </Grid>
        <Grid item>
          <input type="text" placeholder="Name" css={stypedInput} />
        </Grid>
        <Grid item>
          <textarea placeholder="Description" css={stypedInput} />
        </Grid>
      </Grid>
    </main>
  );
}

export default ProfileSetting;
