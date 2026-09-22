import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ContentBundle, fetchRemoteContent, getBundledContent, loadCachedContent } from '../data/contentStore';

interface ContentContextValue extends ContentBundle {
  isLoaded: boolean;
  isRefreshing: boolean;
  refresh: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bundle, setBundle] = useState<ContentBundle>(getBundledContent);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const mounted = useRef(true);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    fetchRemoteContent()
      .then((fresh) => {
        if (mounted.current) setBundle(fresh);
      })
      .catch(() => {
        // Offline or Supabase unreachable — keep whatever content is already showing
        // (cache or the bundled fallback); the app just stays on the last known content.
      })
      .finally(() => {
        if (mounted.current) setIsRefreshing(false);
      });
  }, []);

  useEffect(() => {
    mounted.current = true;
    (async () => {
      const cached = await loadCachedContent();
      if (mounted.current && cached) setBundle(cached);
      if (mounted.current) setIsLoaded(true);
      refresh();
    })();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<ContentContextValue>(
    () => ({ ...bundle, isLoaded, isRefreshing, refresh }),
    [bundle, isLoaded, isRefreshing, refresh]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
