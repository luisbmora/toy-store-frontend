export interface Product {
  id: number
  name: string
  description?: string | null
  ageRestriction?: number | null
  company: string
  price: number
  imageUrl?: string | null
}

export interface CreateProductRequest {
  name: string
  description?: string | null
  ageRestriction?: number | null
  company: string
  price: number
  imageUrl?: string | null
}

export interface UpdateProductRequest {
  name: string
  description?: string | null
  ageRestriction?: number | null
  company: string
  price: number
  imageUrl?: string | null
}

export interface ProductFormValues {
  name: string
  description: string
  ageRestriction: string
  company: string
  price: string
  image: File | null
}