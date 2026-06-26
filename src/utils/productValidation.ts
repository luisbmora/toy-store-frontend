import type { ProductFormValues } from '../types/product'

export interface ProductFormErrors {
  name?: string
  description?: string
  ageRestriction?: string
  company?: string
  price?: string
  image?: string
}

export function validateProductForm(values: ProductFormValues): ProductFormErrors {
  const errors: ProductFormErrors = {}

  const name = values.name.trim()
  const company = values.company.trim()
  const description = values.description.trim()
  const ageRestriction = values.ageRestriction.trim()
  const price = values.price.trim()

  if (!name) {
    errors.name = 'El nombre del producto es obligatorio.'
  } else if (name.length > 50) {
    errors.name = 'El nombre del producto no puede exceder los 50 caracteres.'
  }

  if (description.length > 100) {
    errors.description = 'La descripción no puede exceder los 100 caracteres.'
  }

  if (ageRestriction) {
    const age = Number(ageRestriction)

    if (Number.isNaN(age)) {
      errors.ageRestriction = 'La restricción de edad debe ser un número.'
    } else if (age < 0 || age > 100) {
      errors.ageRestriction = 'La restricción de edad debe estar entre 0 y 100.'
    }
  }

  if (!company) {
    errors.company = 'La compañía es obligatoria.'
  } else if (company.length > 50) {
    errors.company = 'La compañía no puede exceder los 50 caracteres.'
  }

  if (!price) {
    errors.price = 'El precio es obligatorio.'
  } else {
    const productPrice = Number(price)

    if (Number.isNaN(productPrice)) {
      errors.price = 'El precio debe ser un número.'
    } else if (productPrice < 1 || productPrice > 1000) {
      errors.price = 'El precio debe estar entre 1 y 1000.'
    }
  }

  if (values.image) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (!allowedTypes.includes(values.image.type)) {
      errors.image = 'Solo se permiten imágenes JPG, PNG o WEBP.'
    }
  }

  return errors
}

export function hasProductFormErrors(errors: ProductFormErrors): boolean {
  return Object.keys(errors).length > 0
}