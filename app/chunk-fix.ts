// Fix for ChunkLoadError in Next.js App Router
// This script intercepts chunk loading errors and retries with correct paths

if (typeof window !== 'undefined') {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-fix.ts:5',message:'Chunk fix script loaded',data:{timestamp:Date.now(),nextData:!!(window as any).__NEXT_DATA__},sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  // Patch webpack chunk loading function
  if ((window as any).__webpack_require__) {
    const webpackRequire = (window as any).__webpack_require__;
    if (webpackRequire.e) {
      const originalE = webpackRequire.e;
      webpackRequire.e = function(chunkId: string) {
        // #region agent log
        if (chunkId && chunkId.includes('layout')) {
          fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-fix.ts:13',message:'Webpack chunk load attempt',data:{chunkId,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        }
        // #endregion
        return originalE.apply(this, arguments).catch((err: any) => {
          // #region agent log
          fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-fix.ts:18',message:'Webpack chunk load failed',data:{chunkId,error:err?.message,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          if (err?.message?.includes('chunk') || err?.message?.includes('ChunkLoadError')) {
            // Reload page to get fresh chunks
            setTimeout(() => window.location.reload(), 100);
          }
          throw err;
        });
      };
    }
  }

  // Handle webpack chunk loading errors
  const handleChunkError = (error: any) => {
    if (error?.message?.includes('chunk') || error?.message?.includes('ChunkLoadError')) {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-fix.ts:30',message:'Chunk error detected in script',data:{error:error?.message,stack:error?.stack,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      // Reload page to get fresh chunks
      setTimeout(() => window.location.reload(), 100);
    }
  };

  window.addEventListener('error', (e) => handleChunkError(e.error));
  window.addEventListener('unhandledrejection', (e) => handleChunkError(e.reason));
}
