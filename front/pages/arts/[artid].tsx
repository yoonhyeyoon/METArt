import React from 'react';
import { useRouter } from 'next/router';

function Art() {
  const router = useRouter();
  const { artid } = router.query;

  return <div>Art: {artid}</div>;
}

export default Art;
