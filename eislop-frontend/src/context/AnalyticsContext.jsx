import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import analyticsService from '../services/analyticsService.js';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, ArcElement);

const AnalyticsContext = createContext({});

const fallbackSummary = {
  totals: {
    deliveries: 128,
    lateDeliveries: 9,
    vehicles: 24,
    drivers: 32,
    stockKeepingUnits: 5400
  },
  deliveryPerformance: [
    { label: 'Jan', onTime: 92, late: 8 },
    { label: 'Feb', onTime: 90, late: 10 },
    { label: 'Mar', onTime: 94, late: 6 },
    { label: 'Apr', onTime: 91, late: 9 }
  ],
  inventoryLevels: [
    { label: 'North DC', value: 1200 },
    { label: 'South DC', value: 980 },
    { label: 'East DC', value: 1430 },
    { label: 'West DC', value: 760 }
  ]
};

const AnalyticsProvider = ({ children }) => {
  const [summary, setSummary] = useState(fallbackSummary);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const data = await analyticsService.fetchSummary();
        if (isMounted) {
          setSummary(data);
        }
      } catch (error) {
        if (isMounted) {
          toast.error('Analytics services unavailable, showing sample data');
          setSummary(fallbackSummary);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(() => ({ summary, loading }), [summary, loading]);

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

const useAnalytics = () => useContext(AnalyticsContext);

export { AnalyticsProvider, useAnalytics };

export default AnalyticsContext;
