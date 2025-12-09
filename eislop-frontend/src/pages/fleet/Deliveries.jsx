import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import SelectInput from '../../components/SelectInput.jsx';
import MapEmbed from '../../components/MapEmbed.jsx';
import useFetch from '../../hooks/useFetch.js';
import fleetService from '../../services/fleetService.js';
import { formatDate } from '../../utils/formatters.js';

const fallbackDeliveries = [
  {
    id: 1,
    reference: 'DLV-4521',
    customer: 'Nova Retailers',
    status: 'SCHEDULED',
    plannedDate: '2025-11-27',
    driverId: 1,
    vehicleId: 2,
    latitude: 40.7128,
    longitude: -74.006
  },
  {
    id: 2,
    reference: 'DLV-4530',
    customer: 'Helios Manufacturing',
    status: 'IN_TRANSIT',
    plannedDate: '2025-11-26',
    driverId: 2,
    vehicleId: 1,
    latitude: 34.0522,
    longitude: -118.2437
  }
];

const fallbackDrivers = [
  { id: 1, name: 'Michael Carter' },
  { id: 2, name: 'Felicia Walker' }
];

const fallbackVehicles = [
  { id: 1, registrationNumber: 'NY-2381' },
  { id: 2, registrationNumber: 'CA-7745' }
];

const statusOptions = [
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'IN_TRANSIT', label: 'In transit' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'FAILED', label: 'Failed' }
];

const Deliveries = () => {
  const deliveriesQuery = useFetch(fleetService.getDeliveries, []);
  const driversQuery = useFetch(fleetService.getDrivers, []);
  const vehiclesQuery = useFetch(fleetService.getVehicles, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    reference: '',
    customer: '',
    status: 'SCHEDULED',
    plannedDate: '',
    driverId: '',
    vehicleId: '',
    latitude: 40.7128,
    longitude: -74.006
  });

  const deliveries = useMemo(
    () =>
      deliveriesQuery.error
        ? fallbackDeliveries
        : Array.isArray(deliveriesQuery.data)
        ? deliveriesQuery.data
        : fallbackDeliveries,
    [deliveriesQuery.data, deliveriesQuery.error]
  );

  const drivers = useMemo(
    () =>
      driversQuery.error
        ? fallbackDrivers
        : Array.isArray(driversQuery.data)
        ? driversQuery.data
        : fallbackDrivers,
    [driversQuery.data, driversQuery.error]
  );

  const vehicles = useMemo(
    () =>
      vehiclesQuery.error
        ? fallbackVehicles
        : Array.isArray(vehiclesQuery.data)
        ? vehiclesQuery.data
        : fallbackVehicles,
    [vehiclesQuery.data, vehiclesQuery.error]
  );

  const columns = [
    { key: 'reference', title: 'Reference', dataIndex: 'reference' },
    { key: 'customer', title: 'Customer', dataIndex: 'customer' },
    { key: 'status', title: 'Status', dataIndex: 'status' },
    {
      key: 'plannedDate',
      title: 'Planned Date',
      dataIndex: 'plannedDate',
      render: formatDate
    },
    {
      key: 'driverId',
      title: 'Driver',
      dataIndex: 'driverId',
      render: (value) => drivers.find((driver) => driver.id === value)?.name ?? 'Unassigned'
    },
    {
      key: 'vehicleId',
      title: 'Vehicle',
      dataIndex: 'vehicleId',
      render: (value) => vehicles.find((vehicle) => vehicle.id === value)?.registrationNumber ?? 'Unassigned'
    }
  ];

  const openModal = (record = null) => {
    setSelected(record);
    setForm(
      record ?? {
        reference: '',
        customer: '',
        status: 'SCHEDULED',
        plannedDate: '',
        driverId: drivers[0]?.id ?? '',
        vehicleId: vehicles[0]?.id ?? '',
        latitude: 40.7128,
        longitude: -74.006
      }
    );
    setModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selected) {
        await fleetService.updateDelivery(selected.id, form);
        toast.success('Delivery updated');
      } else {
        await fleetService.createDelivery(form);
        toast.success('Delivery created');
      }
      setModalOpen(false);
      await deliveriesQuery.refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to store delivery, showing sample data';
      toast.error(message);
      setModalOpen(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      await fleetService.deleteDelivery(record.id);
      toast.success('Delivery deleted');
      await deliveriesQuery.refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to delete delivery';
      toast.error(message);
    }
  };

  const handleAssign = async (event) => {
    event.preventDefault();
    try {
      await fleetService.assignRoute({
        deliveryId: selected.id,
        driverId: form.driverId,
        vehicleId: form.vehicleId
      });
      toast.success('Route assignment confirmed');
      setModalOpen(false);
      await deliveriesQuery.refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to assign route';
      toast.error(message);
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Delivery Orchestration</h2>
          <p className="text-sm text-slate-500">Assign drivers, track status, visualize routes</p>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Schedule delivery
        </button>
      </header>

      <DataTable
        columns={columns}
        data={deliveries}
        actions={[
          { label: 'Edit', onClick: openModal, intent: 'secondary' },
          { label: 'Delete', onClick: handleDelete, intent: 'danger' }
        ]}
      />

      {(deliveriesQuery.loading || driversQuery.loading || vehiclesQuery.loading) && (
        <p className="text-xs text-slate-400">Synchronizing delivery network...</p>
      )}
      {(deliveriesQuery.error || driversQuery.error || vehiclesQuery.error) && (
        <p className="text-xs text-amber-500">Live services unavailable, showing sample data.</p>
      )}

      <Modal
        title={selected ? 'Edit Delivery' : 'Schedule Delivery'}
        description="Plan, assign, and monitor delivery execution"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput name="reference" label="Reference" value={form.reference} onChange={handleChange} required />
          <FormInput name="customer" label="Customer" value={form.customer} onChange={handleChange} required />
          <SelectInput
            name="status"
            label="Status"
            value={form.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />
          <FormInput
            name="plannedDate"
            label="Planned Date"
            type="date"
            value={form.plannedDate}
            onChange={handleChange}
            required
          />
          <SelectInput
            name="driverId"
            label="Driver"
            value={form.driverId}
            onChange={handleChange}
            options={drivers.map((driver) => ({ value: driver.id, label: driver.name }))}
            placeholder="Select driver"
            required
          />
          <SelectInput
            name="vehicleId"
            label="Vehicle"
            value={form.vehicleId}
            onChange={handleChange}
            options={vehicles.map((vehicle) => ({ value: vehicle.id, label: vehicle.registrationNumber }))}
            placeholder="Select vehicle"
            required
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              name="latitude"
              label="Latitude"
              type="number"
              step="0.0001"
              value={form.latitude}
              onChange={handleChange}
              required
            />
            <FormInput
              name="longitude"
              label="Longitude"
              type="number"
              step="0.0001"
              value={form.longitude}
              onChange={handleChange}
              required
            />
          </div>

          <MapEmbed latitude={form.latitude} longitude={form.longitude} label="Delivery drop-off" />

          <div className="flex flex-wrap justify-end gap-2">
            {selected && (
              <button
                type="button"
                onClick={handleAssign}
                className="rounded border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-blue-50"
              >
                Confirm assignment
              </button>
            )}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button type="submit" className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Deliveries;
