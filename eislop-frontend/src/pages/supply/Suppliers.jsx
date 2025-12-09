import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import useFetch from '../../hooks/useFetch.js';
import supplyService from '../../services/supplyService.js';
import { formatDate } from '../../utils/formatters.js';

const fallbackSuppliers = [
  { id: 1, name: 'Apex Materials', email: 'sales@apex.com', phone: '+1 555-1234', leadTimeDays: 6, lastDelivery: '2025-10-12' },
  { id: 2, name: 'Blue Ocean Imports', email: 'hello@blueocean.io', phone: '+1 555-3321', leadTimeDays: 9, lastDelivery: '2025-09-27' }
];

const Suppliers = () => {
  const { data, error, loading, refetch } = useFetch(supplyService.getSuppliers, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', leadTimeDays: 0 });

  const dataSource = useMemo(() => (error ? fallbackSuppliers : Array.isArray(data) ? data : fallbackSuppliers), [data, error]);

  const columns = [
    { key: 'name', title: 'Supplier', dataIndex: 'name' },
    { key: 'email', title: 'Email', dataIndex: 'email' },
    { key: 'phone', title: 'Phone', dataIndex: 'phone' },
    { key: 'leadTimeDays', title: 'Lead Time (days)', dataIndex: 'leadTimeDays' },
    {
      key: 'lastDelivery',
      title: 'Last Delivery',
      dataIndex: 'lastDelivery',
      render: (value) => formatDate(value)
    }
  ];

  const openModal = (record = null) => {
    setSelected(record);
    setForm(
      record ?? {
        name: '',
        email: '',
        phone: '',
        leadTimeDays: 0
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
        await supplyService.updateSupplier(selected.id, form);
        toast.success('Supplier updated');
      } else {
        await supplyService.createSupplier(form);
        toast.success('Supplier added');
      }
      setModalOpen(false);
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to persist supplier, using mock data';
      toast.error(message);
      setModalOpen(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      await supplyService.deleteSupplier(record.id);
      toast.success('Supplier removed');
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to delete supplier';
      toast.error(message);
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Supply Partners</h2>
          <p className="text-sm text-slate-500">Manage vendor profiles and lead times</p>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Add supplier
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

      {loading && <p className="text-xs text-slate-400">Loading suppliers...</p>}
      {error && <p className="text-xs text-amber-500">Live service unavailable, showing sample records.</p>}

      <Modal
        title={selected ? 'Edit Supplier' : 'Add Supplier'}
        description="Capture key supplier metadata"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput name="name" label="Name" value={form.name} onChange={handleChange} required />
          <FormInput name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
          <FormInput name="phone" label="Phone" value={form.phone} onChange={handleChange} required />
          <FormInput
            name="leadTimeDays"
            label="Lead Time (days)"
            type="number"
            value={form.leadTimeDays}
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

export default Suppliers;
