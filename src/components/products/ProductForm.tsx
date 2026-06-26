import { ImagePlus, Save, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import type { ProductFormValues } from '../../types/product'
import type { ProductFormErrors } from '../../utils/productValidation'
import { Button } from '../ui/Button'
import { FormField } from '../ui/FormField'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/TextArea'

interface ProductFormProps {
  values: ProductFormValues
  errors: ProductFormErrors
  isSubmitting: boolean
  submitLabel?: string
  description?: string
  currentImageUrl?: string | null
  apiBaseUrl?: string
  onChange: (field: keyof ProductFormValues, value: string | File | null) => void
  onSubmit: () => void
  onCancel: () => void
}

export function ProductForm({
  values,
  errors,
  isSubmitting,
  submitLabel = 'Guardar producto',
  description = 'Captura la información del juguete que deseas registrar.',
  currentImageUrl,
  apiBaseUrl = '',
  onChange,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!values.image) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(values.image)
    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [values.image])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  function handleRemoveSelectedImage() {
    onChange('image', null)

    const fileInput = document.getElementById('image') as HTMLInputElement | null

    if (fileInput) {
      fileInput.value = ''
    }
  }

  const currentImageSource = currentImageUrl ? `${apiBaseUrl}${currentImageUrl}` : null

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-sm text-slate-500">
        {description}
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label="Nombre *"
          htmlFor="name"
          error={errors.name}
        >
          <Input
            id="name"
            value={values.name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="Ej. Carro Hot Wheels"
            hasError={Boolean(errors.name)}
          />
        </FormField>

        <FormField
          label="Compañía *"
          htmlFor="company"
          error={errors.company}
        >
          <Input
            id="company"
            value={values.company}
            onChange={(event) => onChange('company', event.target.value)}
            placeholder="Ej. Mattel"
            hasError={Boolean(errors.company)}
          />
        </FormField>

        <FormField
          label="Precio *"
          htmlFor="price"
          error={errors.price}
        >
          <Input
            id="price"
            type="number"
            min="1"
            max="1000"
            step="0.01"
            value={values.price}
            onChange={(event) => onChange('price', event.target.value)}
            placeholder="Ej. 249.99"
            hasError={Boolean(errors.price)}
          />
        </FormField>

        <FormField
          label="Restricción de edad"
          htmlFor="ageRestriction"
          error={errors.ageRestriction}
          helperText="Opcional. Debe estar entre 0 y 100."
        >
          <Input
            id="ageRestriction"
            type="number"
            min="0"
            max="100"
            value={values.ageRestriction}
            onChange={(event) => onChange('ageRestriction', event.target.value)}
            placeholder="Ej. 3"
            hasError={Boolean(errors.ageRestriction)}
          />
        </FormField>
      </div>

      <FormField
        label="Descripción"
        htmlFor="description"
        error={errors.description}
        helperText={`${values.description.length}/100 caracteres`}
      >
        <Textarea
          id="description"
          maxLength={100}
          value={values.description}
          onChange={(event) => onChange('description', event.target.value)}
          placeholder="Descripción breve del producto"
          hasError={Boolean(errors.description)}
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-[220px_1fr]">
        <div>
          <p className="mb-2 block text-sm font-semibold text-slate-700">
            Vista previa
          </p>

          <div className="flex h-44 items-center justify-center overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-slate-50">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Vista previa de imagen seleccionada"
                className="h-full w-full object-cover"
              />
            ) : currentImageSource ? (
              <img
                src={currentImageSource}
                alt="Imagen actual del producto"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <ImagePlus size={38} />
                <span className="mt-2 text-sm font-medium">
                  Sin imagen
                </span>
              </div>
            )}
          </div>

          {currentImageSource && !previewUrl ? (
            <p className="mt-2 text-xs text-slate-400">
              Esta es la imagen actual del producto.
            </p>
          ) : null}

          {previewUrl ? (
            <button
              type="button"
              onClick={handleRemoveSelectedImage}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
            >
              <X size={14} />
              Quitar imagen seleccionada
            </button>
          ) : null}
        </div>

        <FormField
          label="Imagen"
          htmlFor="image"
          error={errors.image}
          helperText="Opcional. Formatos permitidos: JPG, PNG o WEBP."
        >
          <Input
            id="image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => onChange('image', event.target.files?.[0] ?? null)}
            hasError={Boolean(errors.image)}
            className="pt-3"
          />

          <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700">
            Al seleccionar una imagen podrás verla antes de guardar. Si estás editando un producto, la nueva imagen reemplazará visualmente a la anterior después de guardar.
          </div>
        </FormField>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          <Save size={18} />
          {isSubmitting ? 'Guardando...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}