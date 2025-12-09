import { Bar, Line } from 'react-chartjs-2';
import { FiBox, FiClock, FiTruck, FiUsers } from 'react-icons/fi';
import StatCard from '../../components/StatCard.jsx';
import ChartCard from '../../components/ChartCard.jsx';
import Loader from '../../components/Loader.jsx';
import { useAnalytics } from '../../context/AnalyticsContext.jsx';

const Overview = () => {
  const { summary, loading } = useAnalytics();

  if (loading) return <Loader message="Loading analytics..." />;

  const performanceData = {
    labels: summary.deliveryPerformance.map((item) => item.label),
    datasets: [
      {
        label: 'On Time %',
        data: summary.deliveryPerformance.map((item) => item.onTime),
        borderColor: '#1f6feb',
        backgroundColor: 'rgba(31, 111, 235, 0.3)',
        tension: 0.4
      },
      {
        label: 'Late %',
        data: summary.deliveryPerformance.map((item) => item.late),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.3)',
        tension: 0.4
      }
    ]
  };

  const inventoryData = {
    labels: summary.inventoryLevels.map((item) => item.label),
    datasets: [
      {
        label: 'Units',
        data: summary.inventoryLevels.map((item) => item.value),
        backgroundColor: '#1f6feb'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Deliveries" value={summary.totals.deliveries} icon={FiTruck} />
        <StatCard title="Late Deliveries" value={summary.totals.lateDeliveries} icon={FiClock} color="bg-red-500" />
        <StatCard title="Vehicles" value={summary.totals.vehicles} icon={FiTruck} color="bg-amber-500" />
        <StatCard title="Drivers" value={summary.totals.drivers} icon={FiUsers} color="bg-emerald-500" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Delivery Performance" description="On-time vs late deliveries (percentage)">
          <Line data={performanceData} options={{ responsive: true, maintainAspectRatio: false }} />
        </ChartCard>
        <ChartCard title="Inventory By Distribution Center" description="Current stock levels (units)">
          <Bar data={inventoryData} options={{ responsive: true, maintainAspectRatio: false }} />
        </ChartCard>
      </div>
    </div>
  );
};

export default Overview;
