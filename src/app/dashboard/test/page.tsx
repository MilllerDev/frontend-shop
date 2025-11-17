"use client"
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Trash2, Plus, ShoppingCart, DollarSign } from 'lucide-react';

// Data ficticia
const MOCK_CLIENTS = [
  { id: 'client-1', name: 'Juan', lastName: 'Pérez', documentNumber: '12345678' },
  { id: 'client-2', name: 'María', lastName: 'García', documentNumber: '87654321' },
  { id: 'client-3', name: 'Carlos', lastName: 'López', documentNumber: '11223344' },
  { id: 'client-4', name: 'Ana', lastName: 'Martínez', documentNumber: '55667788' },
];

const MOCK_PRODUCTS = [
  { id: 'prod-1', title: 'Camiseta Básica', sku: 'CAM-001' },
  { id: 'prod-2', title: 'Pantalón Jeans', sku: 'PAN-002' },
  { id: 'prod-3', title: 'Zapatillas Deportivas', sku: 'ZAP-003' },
  { id: 'prod-4', title: 'Chaqueta de Cuero', sku: 'CHA-004' },
  { id: 'prod-5', title: 'Gorra Casual', sku: 'GOR-005' },
];

const MOCK_VARIANTS = {
  'prod-1': [
    { id: 'var-1-1', sizes: 'S', color: 'Rojo', stock: 15 },
    { id: 'var-1-2', sizes: 'M', color: 'Rojo', stock: 20 },
    { id: 'var-1-3', sizes: 'L', color: 'Rojo', stock: 10 },
    { id: 'var-1-4', sizes: 'S', color: 'Azul', stock: 8 },
    { id: 'var-1-5', sizes: 'M', color: 'Azul', stock: 12 },
    { id: 'var-1-6', sizes: 'L', color: 'Azul', stock: 5 },
  ],
  'prod-2': [
    { id: 'var-2-1', sizes: '28', color: 'Negro', stock: 6 },
    { id: 'var-2-2', sizes: '30', color: 'Negro', stock: 10 },
    { id: 'var-2-3', sizes: '32', color: 'Negro', stock: 8 },
    { id: 'var-2-4', sizes: '34', color: 'Azul', stock: 12 },
    { id: 'var-2-5', sizes: '36', color: 'Azul', stock: 4 },
  ],
  'prod-3': [
    { id: 'var-3-1', sizes: '38', color: 'Blanco', stock: 15 },
    { id: 'var-3-2', sizes: '39', color: 'Blanco', stock: 20 },
    { id: 'var-3-3', sizes: '40', color: 'Blanco', stock: 18 },
    { id: 'var-3-4', sizes: '41', color: 'Negro', stock: 25 },
    { id: 'var-3-5', sizes: '42', color: 'Negro', stock: 10 },
    { id: 'var-3-6', sizes: '43', color: 'Negro', stock: 8 },
  ],
  'prod-4': [
    { id: 'var-4-1', sizes: 'S', color: 'Marrón', stock: 3 },
    { id: 'var-4-2', sizes: 'M', color: 'Marrón', stock: 5 },
    { id: 'var-4-3', sizes: 'L', color: 'Marrón', stock: 4 },
    { id: 'var-4-4', sizes: 'XL', color: 'Negro', stock: 6 },
  ],
  'prod-5': [
    { id: 'var-5-1', sizes: 'Única', color: 'Rojo', stock: 30 },
    { id: 'var-5-2', sizes: 'Única', color: 'Negro', stock: 25 },
    { id: 'var-5-3', sizes: 'Única', color: 'Blanco', stock: 20 },
  ],
};

const SalesForm = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [variantsByProduct, setVariantsByProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [saleResult, setSaleResult] = useState(null);

  const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      clientId: '',
      status: 'COMPLETED',
      details: [{ productId: '', variantProductId: '', quantity: 1, unitPrice: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details'
  });

  const watchDetails = watch('details');

  // Simular carga de datos iniciales
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingData(true);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setClients(MOCK_CLIENTS);
      setProducts(MOCK_PRODUCTS);
      setLoadingData(false);
    };

    fetchInitialData();
  }, []);

  // Cargar variantes cuando se selecciona un producto
  const loadVariants = async (productId) => {
    if (!productId) return;

    // Si ya tenemos las variantes en cache, no volver a cargarlas
    if (variantsByProduct[productId]) return;

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setVariantsByProduct(prev => ({
      ...prev,
      [productId]: MOCK_VARIANTS[productId] || []
    }));
  };

  // Calcular el total de la venta
  const calculateTotal = () => {
    return watchDetails.reduce((total, detail) => {
      const quantity = parseFloat(detail.quantity) || 0;
      const unitPrice = parseFloat(detail.unitPrice) || 0;
      return total + (quantity * unitPrice);
    }, 0);
  };

  // Obtener información de la variante seleccionada
  const getVariantInfo = (productId, variantId) => {
    const variants = variantsByProduct[productId] || [];
    return variants.find(v => v.id === variantId);
  };

  // Obtener nombre del producto
  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.title : '';
  };

  // Enviar el formulario (simulado)
  const onSubmit = async (data) => {
    // Validar que haya al menos un detalle
    if (data.details.length === 0) {
      alert('Debes agregar al menos un producto a la venta');
      return;
    }

    // Validar que todos los detalles tengan variante seleccionada
    const hasInvalidDetails = data.details.some(
      detail => !detail.variantProductId || detail.quantity <= 0 || detail.unitPrice <= 0
    );

    if (hasInvalidDetails) {
      alert('Todos los productos deben tener variante, cantidad y precio válidos');
      return;
    }

    setLoading(true);

    try {
      // Preparar el payload
      const salePayload = {
        clientId: data.clientId,
        status: data.status,
        details: data.details.map(({ variantProductId, quantity, unitPrice }) => ({
          variantProductId,
          quantity: parseFloat(quantity),
          unitPrice: parseFloat(unitPrice)
        }))
      };

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simular respuesta exitosa
      const selectedClient = clients.find(c => c.id === data.clientId);
      const detailsWithNames = data.details.map(detail => {
        const variantInfo = getVariantInfo(detail.productId, detail.variantProductId);
        const productName = getProductName(detail.productId);
        const quantity = parseFloat(detail.quantity);
        const unitPrice = parseFloat(detail.unitPrice);
        return {
          ...detail,
          quantity,
          unitPrice,
          productName,
          variantInfo,
          subtotal: quantity * unitPrice
        };
      });

      const result = {
        message: 'Venta creada exitosamente',
        sale: {
          id: `sale-${Date.now()}`,
          total: calculateTotal(),
          client: selectedClient,
          details: detailsWithNames,
          createdAt: new Date().toISOString()
        },
        payload: salePayload
      };

      setSaleResult(result);
      
      // Resetear el formulario
      reset();
      setVariantsByProduct({});

      // Scroll al resultado
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('Error:', error);
      alert(`Error al crear la venta: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Nueva Venta</h1>
          </div>

          <div className="space-y-6">
            {/* Información del Cliente */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Información del Cliente</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cliente <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('clientId', { required: 'Selecciona un cliente' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un cliente</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} {client.lastName} - DNI: {client.documentNumber}
                      </option>
                    ))}
                  </select>
                  {errors.clientId && (
                    <p className="mt-1 text-sm text-red-600">{errors.clientId.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado de la Venta
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="COMPLETED">Completada</option>
                    <option value="PENDING">Pendiente</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Detalles de la Venta */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Productos</h2>
                <button
                  type="button"
                  onClick={() => append({ productId: '', variantProductId: '', quantity: 1, unitPrice: 0 })}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Producto
                </button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => {
                  const selectedProductId = watchDetails[index]?.productId;
                  const selectedVariantId = watchDetails[index]?.variantProductId;
                  const variants = variantsByProduct[selectedProductId] || [];
                  const variantInfo = getVariantInfo(selectedProductId, selectedVariantId);

                  return (
                    <div key={field.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Producto #{index + 1}</span>
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:text-red-700 transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Seleccionar Producto */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Producto <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register(`details.${index}.productId`, { 
                              required: 'Selecciona un producto',
                              onChange: (e) => loadVariants(e.target.value)
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Selecciona un producto</option>
                            {products.map(product => (
                              <option key={product.id} value={product.id}>
                                {product.title} - {product.sku}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Seleccionar Variante */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Variante <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register(`details.${index}.variantProductId`, { 
                              required: 'Selecciona una variante' 
                            })}
                            disabled={!selectedProductId}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">
                              {selectedProductId ? 'Selecciona una variante' : 'Primero selecciona un producto'}
                            </option>
                            {variants.map(variant => (
                              <option key={variant.id} value={variant.id}>
                                Talla: {variant.sizes} | Color: {variant.color} | Stock: {variant.stock}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Cantidad */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cantidad <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            {...register(`details.${index}.quantity`, { 
                              required: 'Ingresa la cantidad',
                              min: { value: 1, message: 'Mínimo 1' },
                              max: variantInfo ? { 
                                value: variantInfo.stock, 
                                message: `Stock disponible: ${variantInfo.stock}` 
                              } : undefined
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {variantInfo && (
                            <p className="mt-1 text-xs text-gray-500">
                              Stock disponible: {variantInfo.stock} unidades
                            </p>
                          )}
                          {errors.details?.[index]?.quantity && (
                            <p className="mt-1 text-xs text-red-600">
                              {errors.details[index].quantity.message}
                            </p>
                          )}
                        </div>

                        {/* Precio Unitario */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio Unitario (S/.) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            {...register(`details.${index}.unitPrice`, { 
                              required: 'Ingresa el precio',
                              min: { value: 0.01, message: 'Precio debe ser mayor a 0' }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Subtotal */}
                      {watchDetails[index]?.quantity > 0 && watchDetails[index]?.unitPrice > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Subtotal:</span>
                            <span className="text-lg font-bold text-blue-600">
                              S/. {(watchDetails[index].quantity * watchDetails[index].unitPrice).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <span className="text-lg font-semibold text-gray-700">Total de la Venta:</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  S/. {calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Crear Venta'}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setVariantsByProduct({});
                  setSaleResult(null);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Resultado de la Venta */}
        {saleResult && (
          <div id="result-section" className="bg-green-50 rounded-lg shadow-md p-6 border-2 border-green-200">
            <h2 className="text-xl font-bold text-green-800 mb-4">✅ {saleResult.message}</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Información de la Venta</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="font-medium">ID:</span> {saleResult.sale.id}</p>
                  <p><span className="font-medium">Total:</span> S/. {saleResult.sale.total.toFixed(2)}</p>
                  <p><span className="font-medium">Cliente:</span> {saleResult.sale.client.name} {saleResult.sale.client.lastName}</p>
                  <p><span className="font-medium">DNI:</span> {saleResult.sale.client.documentNumber}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Productos Vendidos</h3>
                <div className="space-y-2">
                  {saleResult.sale.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-start p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{detail.productName}</p>
                        <p className="text-xs text-gray-600">
                          Talla: {detail.variantInfo?.sizes} | Color: {detail.variantInfo?.color}
                        </p>
                        <p className="text-xs text-gray-600">
                          Cantidad: {detail.quantity} × S/. {detail.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-bold text-blue-600">S/. {detail.subtotal.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Payload Enviado al Backend</h3>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(saleResult.payload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesForm;