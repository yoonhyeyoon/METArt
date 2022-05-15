import { useState, useEffect } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
function webglIndex() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const unityContext = new UnityContext({
    loaderUrl: 'Build/build.loader.js',
    dataUrl: 'Build/build.data',
    frameworkUrl: 'Build/build.framework.js',
    codeUrl: 'Build/build.wasm',
  });

  return <Unity unityContext={unityContext} style={{ width: '100%' }} />;
}
export default webglIndex;
