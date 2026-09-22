import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { AlphaSpotlight } from '../types';

const REFETCH_INTERVAL_MS = 3 * 60 * 1000; // pick up newly-created alphas without a restart
const EXPIRY_CHECK_INTERVAL_MS = 30 * 1000; // drop expired ones from the list in near-real-time

function mapRow(row: any): AlphaSpotlight {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    link: row.link,
    category: row.category,
    durationHours: row.duration_hours,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
  };
}

/** Live-fetches active (non-expired) Alpha Spotlight cards, re-fetching periodically
 * to pick up admin changes and locally re-filtering every 30s so an entry disappears
 * on its own the moment its timer runs out, without needing a network round trip. */
export function useAlphaSpotlights(): AlphaSpotlight[] {
  const [alphas, setAlphas] = useState<AlphaSpotlight[]>([]);
  const mounted = useRef(true);

  const fetchAlphas = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('alpha_spotlights')
        .select('*')
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (mounted.current) setAlphas((data ?? []).map(mapRow));
    } catch {
      // Spotlight is a nice-to-have promo strip — never surface an error for it.
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    fetchAlphas();
    const refetchTimer = setInterval(fetchAlphas, REFETCH_INTERVAL_MS);
    const expiryTimer = setInterval(() => {
      setAlphas((prev) => prev.filter((a) => new Date(a.expiresAt).getTime() > Date.now()));
    }, EXPIRY_CHECK_INTERVAL_MS);
    return () => {
      mounted.current = false;
      clearInterval(refetchTimer);
      clearInterval(expiryTimer);
    };
  }, [fetchAlphas]);

  return alphas;
}
