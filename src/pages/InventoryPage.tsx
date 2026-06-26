import { useEffect, useMemo, useState } from 'react'
import { Plus, RefreshCw } from 'lucide-react'
import { AppLayout } from '../components/layout/Applayout'
import { ProductForm } from '../components/products/ProductForm'
import { ProductGrid } from '../components/products/ProductGrid'
import { ProductStats } from '../components/products/ProductStats'
import { Button } from '../components/ui/Button'
import { productApi } from '../api/productApi'
import { Modal } from '../components/ui/Modal'
import { DeleteProductModal } from '../components/products/DeleteProductModal'
import type { Product, ProductFormValues } from '../types/product'
import {
  hasProductFormErrors,
  validateProductForm,
  type ProductFormErrors,
} from '../utils/productValidation'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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

  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase()

    if (!normalizedSearchTerm) {
      return products
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedSearchTerm) ||
        product.company.toLowerCase().includes(normalizedSearchTerm) ||
        product.description?.toLowerCase().includes(normalizedSearchTerm)
      )
    })
  }, [products, searchTerm])

function handleOpenCreateForm() {
  setEditingProduct(null)
  setFormValues(initialFormValues)
  setFormErrors({})
  setSuccessMessage(null)
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
  setSuccessMessage(null)
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
  setSuccessMessage(null)
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

async function handleSubmitProduct() {
  const errors = validateProductForm(formValues)

  setFormErrors(errors)

  if (hasProductFormErrors(errors)) {
    return
  }

  try {
    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

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

      setSuccessMessage('Producto actualizado correctamente.')
    } else {
      const createdProduct = await productApi.create(productPayload)

      if (formValues.image) {
        await productApi.uploadImage(createdProduct.id, formValues.image)
      }

      setSuccessMessage('Producto creado correctamente.')
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
    setSuccessMessage(null)

    await productApi.delete(productToDelete.id)

    setSuccessMessage('Producto eliminado correctamente.')
    handleCloseDeleteModal()
    await loadProducts()
  } catch {
    setErrorMessage('No fue posible eliminar el producto. Intenta nuevamente.')
  } finally {
    setIsDeleting(false)
  }
}

  return (
    <AppLayout
      title="Inventario de juguetes"
      subtitle="Administra productos, precios, compañías e imágenes desde un solo lugar."
    >
      <section className="mx-auto max-w-7xl">
        {successMessage ? (
          <div className="mb-5 rounded-3xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-600">
            {successMessage}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Catálogo de productos
            </h1>

            <p className="mt-2 text-slate-500">
              Vista general del inventario disponible en la tienda.
            </p>
          </div>

          <Button onClick={handleOpenCreateForm}>
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

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Productos
              </h2>

              <p className="mt-1 text-slate-500">
                Productos cargados desde Toy Store API.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nombre, compañía o descripción..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:w-80"
              />

              <Button
                variant="ghost"
                onClick={loadProducts}
                disabled={isLoading}
              >
                <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                Recargar
              </Button>
            </div>
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