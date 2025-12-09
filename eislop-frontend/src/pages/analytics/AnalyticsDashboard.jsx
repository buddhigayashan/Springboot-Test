import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { Doughnut, Line } from 'react-chartjs-2';
import StatCard from '../../components/StatCard.jsx';
import ChartCard from '../../components/ChartCard.jsx';
import Loader from '../../components/Loader.jsx';
import analyticsService from '../../services/analyticsService.js';
import { useAnalytics } from '../../context/AnalyticsContext.jsx';
import { formatPercent } from '../../utils/formatters.js';

const AnalyticsDashboard = () => {
  const { summary, loading } = useAnalytics();

  const lateRate = useMemo(() => {
    if (!summary?.totals) return 0;
    return summary.totals.lateDeliveries / Math.max(summary.totals.deliveries, 1);
  }, [summary]);

  const deliveryTrend = useMemo(
    () => ({
      labels: summary.deliveryPerformance.map((item) => item.label),
      datasets: [
        {
          label: 'On Time %',
          data: summary.deliveryPerformance.map((item) => item.onTime),
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.25)',
          fill: true,
          tension: 0.4
        }
      ]
    }),
    [summary.deliveryPerformance]
  );

  const lateRateChart = useMemo(
    () => ({
      labels: ['On-time', 'Late'],
      datasets: [
        {
          data: [1 - lateRate, lateRate],
          backgroundColor: ['#1f6feb', '#ef4444']
        }
      ]
    }),
    [lateRate]
  );

  const handleExport = async (type) => {
    try {
      const blob = await analyticsService.exportReport(type);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `eislop-analytics.${type}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.success(`Exported ${type.toUpperCase()} report`);
    } catch (error) {
      toast.error(error.message || 'Unable to export report');
    }
  };

  if (loading) return <Loader message="Compiling analytics..." />;

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Operational Intelligence</h2>
          <p className="text-sm text-slate-500">Monitor performance KPIs across logistics and supply chain</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleExport('pdf')}
            className="rounded border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-blue-50"
          >
            Export PDF
          </button>
          <button
            type="button"
            onClick={() => handleExport('csv')}
            className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
          >
            Export CSV
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Deliveries" value={summary.totals.deliveries} delta="Rolling 30 days" />
        <StatCard
          title="Late Delivery Rate"
          value={formatPercent(lateRate * 100)}
          delta="Target &lt; 8%"
          color="bg-red-500"
        />
        <StatCard
          title="Active Vehicles"
          value={summary.totals.vehicles}
          delta="Fleet utilization"
          color="bg-amber-500"
        />
        <StatCard
          title="Active Drivers"
          value={summary.totals.drivers}
          delta="Shift coverage"
          color="bg-emerald-500"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <ChartCard title="On-time Delivery Trend" description="Percentage of on-time deliveries by month">
          <Line data={deliveryTrend} options={{ responsive: true, maintainAspectRatio: false }} />
        </ChartCard>
        <ChartCard title="Late Delivery Split" description="Proportion of late vs on-time deliveries">
          <Doughnut data={lateRateChart} options={{ responsive: true, maintainAspectRatio: false }} />
        </ChartCard>
        <ChartCard title="Inventory Distribution" description="Stock allocation across distribution centers">
          <ul className="space-y-3 text-sm text-slate-600">
            {summary.inventoryLevels.map((level) => (
              <li key={level.label} className="flex items-center justify-between rounded bg-slate-50 px-3 py-2">
                <span className="font-medium">{level.label}</span>
                <span>{level.value.toLocaleString()} units</span>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
