import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import SelectInput from '../../components/SelectInput.jsx';
import useFetch from '../../hooks/useFetch.js';
import fleetService from '../../services/fleetService.js';

const fallbackVehicles = [
  { id: 1, registrationNumber: 'NY-2381', type: 'Trailer', capacityKg: 18000, status: 'AVAILABLE' },
  { id: 2, registrationNumber: 'CA-7745', type: 'Box Truck', capacityKg: 12000, status: 'IN_TRANSIT' }
];

const statusOptions = [
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'IN_TRANSIT', label: 'In transit' },
  { value: 'UNAVAILABLE', label: 'Unavailable' }
];

const Vehicles = () => {
  const { data, error, loading, refetch } = useFetch(fleetService.getVehicles, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ registrationNumber: '', type: '', capacityKg: 0, status: 'AVAILABLE' });

  const dataSource = useMemo(() => (error ? fallbackVehicles : Array.isArray(data) ? data : fallbackVehicles), [data, error]);

  const columns = [
    { key: 'registrationNumber', title: 'Registration', dataIndex: 'registrationNumber' },
    { key: 'type', title: 'Type', dataIndex: 'type' },
    { key: 'capacityKg', title: 'Capacity (kg)', dataIndex: 'capacityKg' },
    { key: 'status', title: 'Status', dataIndex: 'status' }
  ];

  const openModal = (record = null) => {
    setSelected(record);
    setForm(
      record ?? {
        registrationNumber: '',
        type: '',
        capacityKg: 0,
        status: 'AVAILABLE'
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
        await fleetService.updateVehicle(selected.id, form);
        toast.success('Vehicle updated');
      } else {
        await fleetService.createVehicle(form);
        toast.success('Vehicle created');
      }
      setModalOpen(false);
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to store vehicle, showing sample data';
      toast.error(message);
      setModalOpen(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      await fleetService.deleteVehicle(record.id);
      toast.success('Vehicle deleted');
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to delete vehicle';
      toast.error(message);
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Fleet Vehicles</h2>
          <p className="text-sm text-slate-500">Track availability and capacity across the fleet</p>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Add vehicle
        </button>
      </header>

      <DataTable
        columns={columns}
        data={dataSource}
        actions={[
          { label: 'Edit', onClick: openModal, intent: 'secondary' },
          { label: 'Delete', onClick: handleDelete, intent: 'danger' }
        ]}
      />

      {loading && <p className="text-xs text-slate-400">Loading vehicles...</p>}
      {error && <p className="text-xs text-amber-500">Live service unavailable, showing sample data.</p>}

      <Modal
        title={selected ? 'Edit Vehicle' : 'Add Vehicle'}
        description="Capture fleet asset metadata"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            name="registrationNumber"
            label="Registration"
            value={form.registrationNumber}
            onChange={handleChange}
            required
          />
          <FormInput name="type" label="Type" value={form.type} onChange={handleChange} required />
          <FormInput
            name="capacityKg"
            label="Capacity (kg)"
            type="number"
            value={form.capacityKg}
            onChange={handleChange}
            required
          />
          <SelectInput
            name="status"
            label="Status"
            value={form.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />
          <div className="flex justify-end gap-2">
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

export default Vehicles;
