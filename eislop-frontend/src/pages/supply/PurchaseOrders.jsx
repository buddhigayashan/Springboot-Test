import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import SelectInput from '../../components/SelectInput.jsx';
import useFetch from '../../hooks/useFetch.js';
import supplyService from '../../services/supplyService.js';
import { formatCurrency, formatDate } from '../../utils/formatters.js';

const fallbackOrders = [
  {
    id: 1,
    orderNumber: 'PO-2025-0101',
    supplier: 'Apex Materials',
    status: 'IN_PROGRESS',
    totalAmount: 18450,
    expectedDate: '2025-11-30'
  },
  {
    id: 2,
    orderNumber: 'PO-2025-0102',
    supplier: 'Blue Ocean Imports',
    status: 'DELIVERED',
    totalAmount: 10670,
    expectedDate: '2025-11-10'
  }
];

const statusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'IN_PROGRESS', label: 'In progress' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' }
];

const PurchaseOrders = () => {
  const { data, loading, error, refetch } = useFetch(supplyService.getPurchaseOrders, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    orderNumber: '',
    supplier: '',
    status: 'DRAFT',
    totalAmount: 0,
    expectedDate: ''
  });

  const dataSource = useMemo(() => (error ? fallbackOrders : Array.isArray(data) ? data : fallbackOrders), [data, error]);

  const columns = [
    { key: 'orderNumber', title: 'Order', dataIndex: 'orderNumber' },
    { key: 'supplier', title: 'Supplier', dataIndex: 'supplier' },
    { key: 'status', title: 'Status', dataIndex: 'status' },
    {
      key: 'totalAmount',
      title: 'Total',
      dataIndex: 'totalAmount',
      render: (value) => formatCurrency(value)
    },
    {
      key: 'expectedDate',
      title: 'Expected Date',
      dataIndex: 'expectedDate',
      render: (value) => formatDate(value)
    }
  ];

  const openModal = (record = null) => {
    setSelected(record);
    setForm(
      record ?? {
        orderNumber: '',
        supplier: '',
        status: 'DRAFT',
        totalAmount: 0,
        expectedDate: ''
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
        await supplyService.updatePurchaseOrder(selected.id, form);
        toast.success('Purchase order updated');
      } else {
        await supplyService.createPurchaseOrder(form);
        toast.success('Purchase order created');
      }
      setModalOpen(false);
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to save purchase order, using mock data';
      toast.error(message);
      setModalOpen(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      await supplyService.deletePurchaseOrder(record.id);
      toast.success('Purchase order removed');
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Unable to delete order';
      toast.error(message);
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Purchase Orders</h2>
          <p className="text-sm text-slate-500">Track inbound orders across your network</p>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Create order
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

      {loading && <p className="text-xs text-slate-400">Syncing purchase orders...</p>}
      {error && <p className="text-xs text-amber-500">Live service unavailable, showing sample data.</p>}

      <Modal
        title={selected ? 'Edit Purchase Order' : 'Create Purchase Order'}
        description="Maintain lifecycle status and schedules"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput name="orderNumber" label="Order Number" value={form.orderNumber} onChange={handleChange} required />
          <FormInput name="supplier" label="Supplier" value={form.supplier} onChange={handleChange} required />
          <SelectInput
            name="status"
            label="Status"
            value={form.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />
          <FormInput
            name="totalAmount"
            label="Total Amount"
            type="number"
            step="0.01"
            value={form.totalAmount}
            onChange={handleChange}
            required
          />
          <FormInput
            name="expectedDate"
            label="Expected Date"
            type="date"
            value={form.expectedDate}
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

export default PurchaseOrders;
