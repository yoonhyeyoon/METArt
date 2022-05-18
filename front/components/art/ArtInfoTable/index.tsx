import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from 'api/art';

function ArtInfoTable() {
  const router = useRouter();
  const { artid } = router.query;
  const { data, error } = useSWR(`/art/${artid}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Container
        sx={{
          paddingTop: 10,
          paddingBottom: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TableContainer sx={{ width: '30%' }}>
          <Table>
            <TableRow hover>
              <TableCell>작가</TableCell>
              <TableCell>
                <Avatar
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    router.push(`/galleries/${data.creator.address}`)
                  }
                  alt={data.creator.name}
                  src={data.creator.profileUrl}
                />
                <span>{data.creator.name}</span>
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>소유자</TableCell>
              <TableCell>
                <Avatar
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    router.push(`/galleries/${data.owner.address}`)
                  }
                  alt={data.owner.name}
                  src={data.owner.profileUrl}
                />
                <span>{data.owner.name}</span>
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>제작일</TableCell>
              <TableCell>
                <span>{data.createdAt.slice(0, 10)}</span>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default ArtInfoTable;
