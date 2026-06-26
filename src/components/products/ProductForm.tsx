import { Save } from 'lucide-react'
import type { FormEvent } from 'react'
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
  onChange: (field: keyof ProductFormValues, value: string | File | null) => void
  onSubmit: () => void
  onCancel: () => void
}

export function ProductForm({
  values,
  errors,
  isSubmitting,
  onChange,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-sm text-slate-500">
        Captura la información del juguete que deseas registrar.
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
      </FormField>

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
          {isSubmitting ? 'Guardando...' : 'Guardar producto'}
        </Button>
      </div>
    </form>
  )
}