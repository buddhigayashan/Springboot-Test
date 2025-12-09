import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import useFetch from '../../hooks/useFetch.js';
import fleetService from '../../services/fleetService.js';
import { formatDate } from '../../utils/formatters.js';

const fallbackDrivers = [
  { id: 1, name: 'Michael Carter', email: 'mcarter@fleet.io', phone: '+1 555-8113', licenseNumber: 'LIC-99123', hireDate: '2021-06-12' },
  { id: 2, name: 'Felicia Walker', email: 'fwalker@fleet.io', phone: '+1 555-4312', licenseNumber: 'LIC-99310', hireDate: '2022-04-03' }
];

const Drivers = () => {
  const { data, error, loading, refetch } = useFetch(fleetService.getDrivers, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', licenseNumber: '', hireDate: '' });

  const dataSource = useMemo(() => (error ? fallbackDrivers : Array.isArray(data) ? data : fallbackDrivers), [data, error]);

  const columns = [
    { key: 'name', title: 'Driver', dataIndex: 'name' },
    { key: 'email', title: 'Email', dataIndex: 'email' },
    { key: 'phone', title: 'Phone', dataIndex: 'phone' },
    { key: 'licenseNumber', title: 'License', dataIndex: 'licenseNumber' },
    { key: 'hireDate', title: 'Hire Date', dataIndex: 'hireDate', render: formatDate }
  ];

  const openModal = (record = null) => {
    setSelected(record);
    setForm(
      record ?? {
        name: '',
        email: '',
        phone: '',
        licenseNumber: '',
        hireDate: ''
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
        await fleetService.updateDriver(selected.id, form);
        toast.success('Driver updated');
      } else {
        await fleetService.createDriver(form);
        toast.success('Driver created');
      }
      setModalOpen(false);
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to store driver, showing sample data';
      toast.error(message);
      setModalOpen(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      await fleetService.deleteDriver(record.id);
      toast.success('Driver removed');
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to delete driver';
      toast.error(message);
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Fleet Drivers</h2>
          <p className="text-sm text-slate-500">Maintain driver records, licenses, and credentials</p>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Add driver
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

      {loading && <p className="text-xs text-slate-400">Loading drivers...</p>}
      {error && <p className="text-xs text-amber-500">Live service unavailable, showing sample data.</p>}

      <Modal
        title={selected ? 'Edit Driver' : 'Add Driver'}
        description="Capture safety and compliance details"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput name="name" label="Name" value={form.name} onChange={handleChange} required />
          <FormInput name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
          <FormInput name="phone" label="Phone" value={form.phone} onChange={handleChange} required />
          <FormInput
            name="licenseNumber"
            label="License Number"
            value={form.licenseNumber}
            onChange={handleChange}
            required
          />
          <FormInput
            name="hireDate"
            label="Hire Date"
            type="date"
            value={form.hireDate}
            onChange={handleChange}
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

export default Drivers;
