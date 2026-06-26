import { useEffect, useMemo, useState } from 'react'
import { Filter, Plus, RefreshCw, X } from 'lucide-react'
import { AppLayout } from '../components/layout/Applayout'
import { ProductForm } from '../components/products/ProductForm'
import { ProductGrid } from '../components/products/ProductGrid'
import { ProductStats } from '../components/products/ProductStats'
import { Button } from '../components/ui/Button'
import { productApi } from '../api/productApi'
import { Modal } from '../components/ui/Modal'
import { Toast } from '../components/ui/Toast'
import { DeleteProductModal } from '../components/products/DeleteProductModal'
import type {
  ActivityNotification,
  ActivityNotificationType,
  Product,
  ProductFormValues,
  ToastMessage,
  ToastType,
} from '../types/product'
import {
  hasProductFormErrors,
  validateProductForm,
  type ProductFormErrors,
} from '../utils/productValidation'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

type SortOption = 'none' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

const sortLabels: Record<SortOption, string> = {
  none: 'Sin orden',
  'name-asc': 'Nombre A-Z',
  'name-desc': 'Nombre Z-A',
  'price-asc': 'Precio menor a mayor',
  'price-desc': 'Precio mayor a menor',
}

const initialFormValues: ProductFormValues = {
  name: '',
  description: '',
  ageRestriction: '',
  company: '',
  price: '',
  image: null,
}

export function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formValues, setFormValues] = useState<ProductFormValues>(initialFormValues)
  const [formErrors, setFormErrors] = useState<ProductFormErrors>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<ActivityNotification[]>([])
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const [sortOption, setSortOption] = useState<SortOption>('none')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

    
    function showToast(type: ToastType, message: string) {
    setToast({
      id: Date.now(),
      type,
      message,
    })
  }
  function addActivityNotification(
    type: ActivityNotificationType,
    productName: string,
  ) {
    const actionMessages: Record<ActivityNotificationType, string> = {
      created: `Se dio de alta el producto "${productName}".`,
      updated: `Se actualizó el producto "${productName}".`,
      deleted: `Se eliminó el producto "${productName}".`,
    }

    const now = new Date()

    const notification: ActivityNotification = {
      id: now.getTime(),
      type,
      message: actionMessages[type],
      createdAt: now.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setNotifications((currentNotifications) => [
      notification,
      ...currentNotifications,
    ])
  }

  function handleClearNotifications() {
    setNotifications([])
  }
  
  async function loadProducts() {
    try {
      setIsLoading(true)
      setErrorMessage(null)

      const data = await productApi.getAll()

      setProducts(data)
    } catch {
      setErrorMessage(
        'No fue posible cargar los productos. Verifica que la API esté encendida y que la URL sea correcta.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
  if (!toast) {
    return
  }

  const timeoutId = window.setTimeout(() => {
    setToast(null)
  }, 3500)

  return () => {
    window.clearTimeout(timeoutId)
  }
}, [toast])

const filteredProducts = useMemo(() => {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const searchedProducts = products.filter((product) => {
    if (!normalizedSearchTerm) {
      return true
    }

    return product.name.toLowerCase().includes(normalizedSearchTerm)
  })

  const sortedProducts = [...searchedProducts]

  switch (sortOption) {
    case 'name-asc':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
      break

    case 'name-desc':
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
      break

    case 'price-asc':
      sortedProducts.sort((a, b) => a.price - b.price)
      break

    case 'price-desc':
      sortedProducts.sort((a, b) => b.price - a.price)
      break

    default:
      break
  }

  return sortedProducts
}, [products, searchTerm, sortOption])

function handleOpenCreateForm() {
  setEditingProduct(null)
  setFormValues(initialFormValues)
  setFormErrors({})
  setErrorMessage(null)
  setIsFormOpen(true)
}

function handleOpenEditForm(product: Product) {
  setEditingProduct(product)
  setFormValues({
    name: product.name,
    description: product.description ?? '',
    ageRestriction:
      product.ageRestriction !== null && product.ageRestriction !== undefined
        ? product.ageRestriction.toString()
        : '',
    company: product.company,
    price: product.price.toString(),
    image: null,
  })
  setFormErrors({})
  setErrorMessage(null)
  setIsFormOpen(true)
}
function handleCloseForm() {
  setIsFormOpen(false)
  setEditingProduct(null)
  setFormValues(initialFormValues)
  setFormErrors({})
}

function handleOpenDeleteModal(product: Product) {
  setProductToDelete(product)
  setErrorMessage(null)
}

function handleCloseDeleteModal() {
  setProductToDelete(null)
}

  function handleFormChange(
    field: keyof ProductFormValues,
    value: string | File | null,
  ) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }))
  }

  function handleClearFilters() {
  setSearchTerm('')
  setSortOption('none')
  setIsFilterOpen(false)
}

async function handleSubmitProduct() {
  const errors = validateProductForm(formValues)

  setFormErrors(errors)

  if (hasProductFormErrors(errors)) {
    return
  }

  try {
    setIsSubmitting(true)
    setErrorMessage(null)

    const productPayload = {
      name: formValues.name.trim(),
      description: formValues.description.trim() || null,
      ageRestriction: formValues.ageRestriction
        ? Number(formValues.ageRestriction)
        : null,
      company: formValues.company.trim(),
      price: Number(formValues.price),
      imageUrl: editingProduct?.imageUrl ?? null,
    }

    if (editingProduct) {
      await productApi.update(editingProduct.id, productPayload)

      if (formValues.image) {
        await productApi.uploadImage(editingProduct.id, formValues.image)
      }

    addActivityNotification('updated', productPayload.name)
    showToast('success', 'Producto actualizado correctamente.')
    } else {
      const createdProduct = await productApi.create(productPayload)

      if (formValues.image) {
        await productApi.uploadImage(createdProduct.id, formValues.image)
      }

      addActivityNotification('created', createdProduct.name)
      showToast('success', 'Producto creado correctamente.')
    }

    handleCloseForm()
    await loadProducts()
  } catch {
    setErrorMessage('No fue posible guardar el producto. Intenta nuevamente.')
  } finally {
    setIsSubmitting(false)
  }
}

async function handleDeleteProduct() {
  if (!productToDelete) {
    return
  }

  try {
    setIsDeleting(true)
    setErrorMessage(null)

  await productApi.delete(productToDelete.id)

  addActivityNotification('deleted', productToDelete.name)
  showToast('success', 'Producto eliminado correctamente.')
  handleCloseDeleteModal()
  await loadProducts()
  } catch {
    showToast('error', 'No fue posible guardar el producto. Intenta nuevamente.')
  } finally {
    setIsDeleting(false)
  }
}

  return (
      <AppLayout
        title="Inventario de juguetes"
        subtitle="Productos disponibles en la tienda"
        searchTerm={searchTerm}
        notifications={notifications}
        onSearchChange={setSearchTerm}
        onClearNotifications={handleClearNotifications}
      >
      <Toast
      toast={toast}
      onClose={() => setToast(null)}
      />
      <section className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Catálogo de productos
            </h1>

            <p className="mt-2 text-slate-500">
              Vista general del inventario disponible en la tienda.
            </p>
          </div>

          <Button onClick={handleOpenCreateForm} className="w-full sm:w-auto">
            <Plus size={20} />
            Agregar producto
          </Button>
        </div>

        <Modal
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          title={editingProduct ? 'Editar producto' : 'Agregar producto'}
        >
        <ProductForm
          values={formValues}
          errors={formErrors}
          isSubmitting={isSubmitting}
          submitLabel={editingProduct ? 'Actualizar producto' : 'Guardar producto'}
          description={
            editingProduct
              ? 'Actualiza la información del juguete seleccionado.'
              : 'Captura la información del juguete que deseas registrar.'
          }
          currentImageUrl={editingProduct?.imageUrl}
          apiBaseUrl={apiBaseUrl}
          onChange={handleFormChange}
          onSubmit={handleSubmitProduct}
          onCancel={handleCloseForm}
        />
        </Modal>

        <DeleteProductModal
          isOpen={Boolean(productToDelete)}
          product={productToDelete}
          isDeleting={isDeleting}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteProduct}
        />

        <div className="mt-6">
          <ProductStats products={products} />
        </div>

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Productos
              </h2>

              <p className="mt-1 text-slate-500">
                Productos cargados desde Toy Store API.
              </p>
            </div>

          <div className="relative flex flex-col gap-3 sm:flex-row">
            <Button
              variant="ghost"
              onClick={() => setIsFilterOpen((currentValue) => !currentValue)}
            >
              <Filter size={18} />
              Filtros
            </Button>

            <Button
              variant="ghost"
              onClick={loadProducts}
              disabled={isLoading}
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              Recargar
            </Button>

            {isFilterOpen ? (
              <div className="absolute right-0 top-28 z-30 w-full rounded-3xl border border-slate-100 bg-white p-4 shadow-xl sm:top-14 sm:w-80">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Filtros y orden
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Ordena los productos mostrados.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                    aria-label="Cerrar filtros"
                  >
                    <X size={17} />
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSortOption(option)
                        setIsFilterOpen(false)
                      }}
                      className={[
                        'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition',
                        sortOption === option
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100',
                      ].join(' ')}
                    >
                      {sortLabels[option]}

                      {sortOption === option ? (
                        <span className="text-xs">
                          Activo
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="mt-4 w-full"
                  onClick={handleClearFilters}
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : null}
          </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Mostrando{' '}
              <strong className="text-slate-900">
                {filteredProducts.length}
              </strong>{' '}
              de{' '}
              <strong className="text-slate-900">
                {products.length}
              </strong>{' '}
              productos
            </span>

            <span>
              Orden actual:{' '}
              <strong className="text-blue-500">
                {sortLabels[sortOption]}
              </strong>
            </span>
          </div>

          <div className="mt-6">
            {isLoading ? (
              <div className="flex min-h-72 items-center justify-center rounded-3xl bg-slate-50">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />

                  <p className="mt-4 font-medium text-slate-500">
                    Cargando productos...
                  </p>
                </div>
              </div>
            ) : errorMessage ? (
              <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-red-600">
                <p className="font-semibold">
                  Ocurrió un problema
                </p>

                <p className="mt-1 text-sm">
                  {errorMessage}
                </p>
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                apiBaseUrl={apiBaseUrl}
                onEdit={handleOpenEditForm}
                onDelete={handleOpenDeleteModal}
              />
            )}
          </div>
        </section>
      </section>
    </AppLayout>
  )
}