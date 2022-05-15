import { useState, useEffect } from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';
function webglIndex() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const unityContent = new UnityContent(
    '/Build/Build.json',
    '/Build/UnityLoader.js',
  );
  return (
    <div>
      {' '}
      <Unity unityContent={unityContent} />{' '}
    </div>
  );
}
export default webglIndex;
