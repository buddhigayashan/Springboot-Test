import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import SelectInput from '../../components/SelectInput.jsx';
import useFetch from '../../hooks/useFetch.js';
import supplyService from '../../services/supplyService.js';
import { formatCurrency } from '../../utils/formatters.js';

const fallbackProducts = [
  { id: 1, name: 'Industrial Router', sku: 'SKU-IR-001', category: 'Hardware', unitPrice: 540.5, stock: 120 },
  { id: 2, name: 'Temperature Sensor', sku: 'SKU-TS-104', category: 'IoT', unitPrice: 129.9, stock: 880 }
];

const productCategories = [
  { value: 'Hardware', label: 'Hardware' },
  { value: 'IoT', label: 'IoT' },
  { value: 'Software', label: 'Software' },
  { value: 'Consumables', label: 'Consumables' }
];

const Products = () => {
  const { data: products, loading, error, refetch } = useFetch(supplyService.getProducts, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({ name: '', sku: '', category: '', unitPrice: 0, stock: 0 });

  const dataSource = useMemo(() => {
    if (error) {
      return fallbackProducts;
    }
    return Array.isArray(products) ? products : fallbackProducts;
  }, [products, error]);

  const columns = [
    { key: 'sku', title: 'SKU', dataIndex: 'sku' },
    { key: 'name', title: 'Product', dataIndex: 'name' },
    { key: 'category', title: 'Category', dataIndex: 'category' },
    {
      key: 'unitPrice',
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      render: (value) => formatCurrency(value)
    },
    { key: 'stock', title: 'Stock', dataIndex: 'stock' }
  ];

  const openModal = (product = null) => {
    setSelectedProduct(product);
    setForm(
      product ?? {
        name: '',
        sku: '',
        category: '',
        unitPrice: 0,
        stock: 0
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
      if (selectedProduct) {
        await supplyService.updateProduct(selectedProduct.id, form);
        toast.success('Product updated');
      } else {
        await supplyService.createProduct(form);
        toast.success('Product created');
      }
      setModalOpen(false);
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Operation failed, using mock data';
      toast.error(message);
      setModalOpen(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      await supplyService.deleteProduct(record.id);
      toast.success('Product removed');
      await refetch();
    } catch (err) {
      const message = err?.message || err?.error || 'Deletion failed';
      toast.error(message);
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Product Catalog</h2>
          <p className="text-sm text-slate-500">Maintain inventory profiles and stock levels</p>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Add product
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

      {loading && <p className="text-xs text-slate-400">Refreshing inventory...</p>}
      {error && <p className="text-xs text-amber-500">Live service unavailable, showing sample data.</p>}

      <Modal
        title={selectedProduct ? 'Edit Product' : 'Add Product'}
        description="Define core product attributes"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput name="name" label="Name" value={form.name} onChange={handleChange} required />
          <FormInput name="sku" label="SKU" value={form.sku} onChange={handleChange} required />
          <SelectInput
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
            options={productCategories}
            placeholder="Select category"
            required
          />
          <FormInput
            name="unitPrice"
            label="Unit Price"
            type="number"
            step="0.01"
            value={form.unitPrice}
            onChange={handleChange}
            required
          />
          <FormInput
            name="stock"
            label="Current Stock"
            type="number"
            value={form.stock}
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

export default Products;
