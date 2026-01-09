'use client'

import { useEffect } from 'react'

export function ChunkErrorHandler() {
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-error-handler.tsx:7',message:'ChunkErrorHandler mounted',data:{timestamp:Date.now(),userAgent:navigator.userAgent},sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion

    // Patch webpack chunk loading function early
    if (typeof window !== 'undefined' && (window as any).__webpack_require__) {
      const webpackRequire = (window as any).__webpack_require__;
      if (webpackRequire.e) {
        const originalE = webpackRequire.e;
        webpackRequire.e = function(chunkId: string) {
          // #region agent log
          if (chunkId && (chunkId.includes('layout') || chunkId.includes('app'))) {
            fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-error-handler.tsx:15',message:'Webpack chunk load attempt',data:{chunkId,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          }
          // #endregion
          return originalE.apply(this, arguments).catch((err: any) => {
            // #region agent log
            fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-error-handler.tsx:20',message:'Webpack chunk load failed',data:{chunkId,error:err?.message,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            if (err?.message?.includes('chunk') || err?.message?.includes('ChunkLoadError')) {
              // #region agent log
              fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-error-handler.tsx:24',message:'Chunk error in webpack - reloading',data:{chunkId,error:err?.message,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
              // #endregion
              // Reload page to get fresh chunks
              setTimeout(() => window.location.reload(), 100);
            }
            throw err;
          });
        };
      }
    }

    const handleError = (event: ErrorEvent) => {
      const errorMsg = event.error?.message || event.message || '';
      const isChunkError = errorMsg.includes('chunk') || errorMsg.includes('ChunkLoadError') || errorMsg.includes('Loading chunk');
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-error-handler.tsx:12',message:'Global error caught',data:{error:errorMsg,filename:event.filename,lineno:event.lineno,colno:event.colno,isChunkError,stack:event.error?.stack,url:window.location.href,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      if (isChunkError) {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-error-handler.tsx:17',message:'Chunk error detected - attempting reload',data:{nextData:(window as any).__NEXT_DATA__,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        // Force page reload to clear stale chunk references
        window.location.reload();
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reasonStr = event.reason?.toString() || '';
      const isChunkError = reasonStr.includes('chunk') || reasonStr.includes('ChunkLoadError') || reasonStr.includes('Loading chunk');
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-error-handler.tsx:25',message:'Unhandled promise rejection',data:{reason:reasonStr,isChunkError,stack:event.reason?.stack,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      if (isChunkError) {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-error-handler.tsx:30',message:'Chunk error in promise rejection - attempting reload',data:{timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        window.location.reload();
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Check for existing chunk loading issues
    if (typeof window !== 'undefined' && (window as any).__NEXT_DATA__) {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/589d0932-3351-42d0-9342-063b2eb428ce',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/chunk-error-handler.tsx:40',message:'Next.js data check',data:{hasNextData:!!(window as any).__NEXT_DATA__,buildId:(window as any).__NEXT_DATA__?.buildId,timestamp:Date.now()},sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
    }

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}
