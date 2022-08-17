import Product from '../product.model'
import client from '../../database'
import ProductType from '../../types/products.types'

const product = new Product()

describe('Product Model', () => {
  //Check if Methods Exists Or not
  describe('Test Methods Exists', () => {
    it('Should Have An Create Method', () => {
      expect(product.create).toBeDefined()
    })

    it('Should Have An show Method', () => {
      expect(product.show).toBeDefined()
    })

    it('Should Have An index Method', () => {
      expect(product.index).toBeDefined()
    })
  })

  describe('Test Product Model Logic', () => {
    // Create Product
    const ProductCreated = {
      name: 'product One',
      price: 500,
      category: 'Mobiles',
    } as ProductType

    // Add Product To Database Before test
    beforeAll(async () => {
      const createdProduct = await product.create(ProductCreated)
      ProductCreated.id = createdProduct.id
    })

    // Delete Product From Database After test
    afterAll(async () => {
      const connection = await client.connect()
      const sql = 'DELETE FROM Products'
      await connection.query(sql)
      connection.release()
    })

    // Test Create Product
    it('Create Product method should return a New Product', async () => {
      const createdProduct = await product.create({
        name: 'Product Two',
        price: 1000,
        category: 'TV',
      } as ProductType)
      expect(createdProduct).toEqual({
        id: createdProduct.id,
        name: 'Product Two',
        price: 1000,
        category: 'TV',
      } as ProductType)
    })

    // Get All Products
    it('Get All Products Method Should Return All Products', async () => {
      const Products = await product.index()
      expect(Products.length).toBe(2)
    })

    // Return One Product with id
    it('Get One Product method should return test Product when called with ID', async () => {
      const returnedProduct = await product.show('1')
      expect(returnedProduct.id).toBe(1)
      expect(returnedProduct.name).toBe(ProductCreated.name)
      expect(returnedProduct.price).toBe(ProductCreated.price)
      expect(returnedProduct.category).toBe(ProductCreated.category)
    })
  })
})
