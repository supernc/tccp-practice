import { useEffect, useState } from 'react';
import { getStatsData, getTodayStats } from '../services/statsService';
import { DATA_CHANGED_EVENT } from '../services/storage';

export default function useStats() {
  const [, refresh] = useState(0);
  useEffect(() => {
    const update = () => refresh(n => n + 1);
    window.addEventListener(DATA_CHANGED_EVENT, update);
    window.addEventListener('storage', update);
    window.addEventListener('focus', update);
    const timer = window.setInterval(update, 60_000);
    return () => {
      window.removeEventListener(DATA_CHANGED_EVENT, update);
      window.removeEventListener('storage', update);
      window.removeEventListener('focus', update);
      window.clearInterval(timer);
    };
  }, []);
  return { ...getStatsData(), todayStats: getTodayStats() };
}
