import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Product } from '../../types/product'
import { ProductGrid } from './ProductGrid'

const products: Product[] = [
  {
    id: 1,
    name: 'Lego Classic',
    description: 'Caja de bloques de construcción',
    ageRestriction: 6,
    company: 'Lego',
    price: 499,
    imageUrl: null,
  },
]

describe('ProductGrid', () => {
  it('shows empty state when there are no products', () => {
    render(
      <ProductGrid
        products={[]}
        apiBaseUrl="http://localhost:5238"
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    )

    expect(screen.getByText('No hay productos registrados')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Cuando agregues productos, aparecerán en esta sección del inventario.',
      ),
    ).toBeInTheDocument()
  })

  it('renders product information', () => {
    render(
      <ProductGrid
        products={products}
        apiBaseUrl="http://localhost:5238"
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    )

    expect(screen.getByText('Lego Classic')).toBeInTheDocument()
    expect(screen.getByText('Lego')).toBeInTheDocument()
    expect(screen.getByText('$499.00')).toBeInTheDocument()
    expect(screen.getByText('+6 años')).toBeInTheDocument()
  })

  it('calls edit and delete actions when buttons are clicked', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(
      <ProductGrid
        products={products}
        apiBaseUrl="http://localhost:5238"
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    )

    await user.click(screen.getByRole('button', { name: /editar/i }))
    await user.click(screen.getByRole('button', { name: /eliminar/i }))

    expect(onEdit).toHaveBeenCalledWith(products[0])
    expect(onDelete).toHaveBeenCalledWith(products[0])
  })
})