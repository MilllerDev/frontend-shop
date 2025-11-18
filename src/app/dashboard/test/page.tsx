"use client"
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Trash2, Plus, ShoppingCart, DollarSign } from 'lucide-react';

const MOCK_CLIENTS = [
  {
    id: 'c665c00d-287c-4b28-9cd2-6d3325ed9942',
    name: 'Rodrigo',
    lastname: 'Gamarra',
    phone: '987654321',
    direccion: 'Huacho'
  },
  {
    id: 'eed7efcb-c15b-4851-9949-f6c21548282d',
    name: 'Harold',
    lastname: 'Colan',
    phone: '987654321',
    direccion: 'Lima'
  },
  {
    id: '055fc618-2feb-4d8a-a70b-0939e9b20455',
    name: 'ALAN',
    lastname: 'DADWAD',
    phone: '987654321',
    direccion: 'HUACHO'
  },
  {
    id: 'b769c3b4-d968-4e95-900d-5bc9be4aa771',
    name: 'dadwda',
    lastname: 'dawdawdwa',
    phone: '987654321',
    direccion: 'Lima'
  },
];

const MOCK_PRODUCTS = [
  {
    id: '68421261-a6c9-4e3e-99ef-7593d1f21c9d',
    title: 'Nike Air Force',
    sku: 'nike_air_force',
    price: 400,
    imageUrl: 'https://res.cloudinary.com/dn59rxcsm/image/upload/v1763334747/r3vldkw5y6n23t7hkv2q.webp',
    category: {
      id: '407c3595-a56f-45f3-898b-9e0d62d0a84f',
      name: 'sneaker',
      description: 'All sneaker models'
    },
    variantProduct: [
      {
        id: 'b4dfaa19-7492-4e29-8d6f-77e603814e97',
        sizes: '42',
        color: 'White',
        stock: 1
      },
      {
        id: '59ce8acb-f94b-4024-b046-a48482c97af2',
        sizes: '40',
        color: 'Red',
        stock: 1
      }
    ]
  },
  {
    id: '04798664-5eb6-406a-89f3-d1bb2d1d321c',
    title: 'Adidas Campus V1',
    sku: 'adidas_campus_v1',
    price: 450,
    imageUrl: 'https://res.cloudinary.com/dn59rxcsm/image/upload/v1763334796/saaslviqaeslgrzcmxqx.jpg',
    category: {
      id: '407c3595-a56f-45f3-898b-9e0d62d0a84f',
      name: 'sneaker',
      description: 'All sneaker models'
    },
    variantProduct: [
      {
        id: '9588d488-beae-46b1-bc06-87b9028e888c',
        sizes: '42',
        color: 'Militar',
        stock: 20
      }
    ]
  },
  {
    id: '6b7dcb97-7d82-43ad-8e37-bd2336ffcaf8',
    title: 'Adidas Stan Smith',
    sku: 'adidas_stan_smith',
    price: 250,
    imageUrl: 'https://res.cloudinary.com/dn59rxcsm/image/upload/v1763334822/qurlot1nsc4r3veoq5hb.webp',
    category: {
      id: '407c3595-a56f-45f3-898b-9e0d62d0a84f',
      name: 'sneaker',
      description: 'All sneaker models'
    },
    variantProduct: [
      {
        id: '39b400f4-69c6-490d-a171-c5e754a78d27',
        sizes: '39',
        color: 'White',
        stock: 10
      }
    ]
  }
];

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
  const loadVariants = (productId) => {
    if (!productId) return;

    // Si ya tenemos las variantes en cache, no volver a cargarlas
    if (variantsByProduct[productId]) return;

    const product = products.find(p => p.id === productId);

    if (product && product.variantProduct) {
      setVariantsByProduct(prev => ({
        ...prev,
        [productId]: product.variantProduct
      }));
    }
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

  // Obtener precio del producto
  const getProductPrice = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.price : 0;
  };

  // Auto-completar precio cuando se selecciona un producto
  const handleProductChange = (productId, index) => {
    loadVariants(productId);
    // El precio se puede autocompletar si quieres
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"></div>
          <p className="mt-4">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <ShoppingCart className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Nueva Venta</h1>
          </div>

          <div className="space-y-6">
            {/* Información del Cliente */}
            <div className="p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Información del Cliente</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cliente <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('clientId', { required: 'Selecciona un cliente' })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                  >
                    <option value="">Selecciona un cliente</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} {client.lastname} - {client.phone}
                      </option>
                    ))}
                  </select>
                  {errors.clientId && (
                    <p className="mt-1 text-sm text-red-600">{errors.clientId.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Estado de la Venta
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
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
                <h2 className="text-lg font-semibold">Productos</h2>
                <button
                  type="button"
                  onClick={() => append({ productId: '', variantProductId: '', quantity: 1, unitPrice: 0 })}
                  className="flex items-center gap-2 px-4 py-2 transition"
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
                  const selectedProduct = products.find(p => p.id === selectedProductId);

                  return (
                    <div key={field.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-medium">Producto #{index + 1}</span>
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
                          <label className="block text-sm font-medium mb-1">
                            Producto <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register(`details.${index}.productId`, {
                              required: 'Selecciona un producto',
                              onChange: (e) => handleProductChange(e.target.value, index)
                            })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                          >
                            <option value="">Selecciona un producto</option>
                            {products.map(product => (
                              <option key={product.id} value={product.id}>
                                {product.title} - {product.sku} (S/. {product.price})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Seleccionar Variante */}
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Variante <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register(`details.${index}.variantProductId`, {
                              required: 'Selecciona una variante'
                            })}
                            disabled={!selectedProductId}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          <label className="block text-sm font-medium mb-1">
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
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                          />
                          {variantInfo && (
                            <p className="mt-1 text-xs">
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
                          <label className="block text-sm font-medium mb-1">
                            Precio Unitario (S/.) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            defaultValue={selectedProduct?.price || 0}
                            {...register(`details.${index}.unitPrice`, {
                              required: 'Ingresa el precio',
                              min: { value: 0.01, message: 'Precio debe ser mayor a 0' }
                            })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                          />
                          {selectedProduct && (
                            <p className="mt-1 text-xs">
                              Precio sugerido: S/. {selectedProduct.price}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Imagen del Producto */}
                      {selectedProduct && (
                        <div className="mt-3 flex items-center gap-3 pt-3 border-t">
                          <img
                            src={selectedProduct.imageUrl}
                            alt={selectedProduct.title}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{selectedProduct.title}</p>
                            <p className="text-xs">SKU: {selectedProduct.sku}</p>
                            <p className="text-xs">Categoría: {selectedProduct.category.name}</p>
                          </div>
                        </div>
                      )}

                      {/* Subtotal */}
                      {watchDetails[index]?.quantity > 0 && watchDetails[index]?.unitPrice > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Subtotal:</span>
                            <span className="text-lg font-bold">
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
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  <span className="text-lg font-semibold">Total de la Venta:</span>
                </div>
                <span className="text-2xl font-bold">
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
                className="flex-1 px-6 py-3 font-medium rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                className="px-6 py-3 font-medium rounded-md transition"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Resultado de la Venta */}
        {saleResult && (
          <div id="result-section" className="rounded-lg shadow-md p-6 border-2">
            <h2 className="text-xl font-bold mb-4">✅ {saleResult.message}</h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Información de la Venta</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="font-medium">ID:</span> {saleResult.sale.id}</p>
                  <p><span className="font-medium">Total:</span> S/. {saleResult.sale.total.toFixed(2)}</p>
                  <p><span className="font-medium">Cliente:</span> {saleResult.sale.client.name} {saleResult.sale.client.lastname}</p>
                  <p><span className="font-medium">Teléfono:</span> {saleResult.sale.client.phone}</p>
                  <p className="col-span-2"><span className="font-medium">Dirección:</span> {saleResult.sale.client.direccion}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Productos Vendidos</h3>
                <div className="space-y-2">
                  {saleResult.sale.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-start p-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{detail.productName}</p>
                        <p className="text-xs">
                          Talla: {detail.variantInfo?.sizes} | Color: {detail.variantInfo?.color}
                        </p>
                        <p className="text-xs">
                          Cantidad: {detail.quantity} × S/. {detail.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-bold">S/. {detail.subtotal.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Payload Enviado al Backend</h3>
                <pre className="p-3 rounded text-xs overflow-x-auto">
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