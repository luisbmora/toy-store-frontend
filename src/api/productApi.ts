import { httpClient } from './httpClient'
import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from '../types/product'

const productsEndpoint = '/api/products'

export const productApi = {
  async getAll(): Promise<Product[]> {
    const response = await httpClient.get<Product[]>(productsEndpoint)

    return response.data
  },

  async getById(id: number): Promise<Product> {
    const response = await httpClient.get<Product>(`${productsEndpoint}/${id}`)

    return response.data
  },

  async create(product: CreateProductRequest): Promise<Product> {
    const response = await httpClient.post<Product>(productsEndpoint, product)

    return response.data
  },

  async update(id: number, product: UpdateProductRequest): Promise<void> {
    await httpClient.put(`${productsEndpoint}/${id}`, product)
  },

  async delete(id: number): Promise<void> {
    await httpClient.delete(`${productsEndpoint}/${id}`)
  },

  async uploadImage(id: number, image: File): Promise<Product> {
    const formData = new FormData()

    formData.append('image', image)

    const response = await httpClient.post<Product>(
      `${productsEndpoint}/${id}/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return response.data
  },
}