import ProductModel from '../product.model'
import db from '../../database'
import Product from '../../types/product.type'

const productModel = new ProductModel()

describe('Product Model', () => {
  //Check if Methods Exists Or not
  describe('Test Methods Exists', () => {
    it('Should Have An Create Product Method', () => {
      expect(productModel.create).toBeDefined()
    })

    it('Should Have An Get One Product Method', () => {
      expect(productModel.getOneProduct).toBeDefined()
    })

    it('Should Have An Get All Products Method', () => {
      expect(productModel.getAllProducts).toBeDefined()
    })

    it('Should Have An Update Product Method', () => {
      expect(productModel.updateProduct).toBeDefined()
    })

    it('Should Have An Delete Product Method', () => {
      expect(productModel.deleteProduct).toBeDefined()
    })
  })

  describe('Test Product Model Logic', () => {
    // Create Product
    const product = {
      name: 'test_product',
      price: 500,
    } as Product

    // Add Product To Database Before test
    beforeAll(async () => {
      const createdProduct = await productModel.create(product)
      product.id = createdProduct.id
    })

    // Delete Product From Database After test
    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM product'
      await connection.query(sql)
      connection.release()
    })

    // Test Create Product
    it('Create Product method should return a New Product', async () => {
      const createdProduct = await productModel.create({
        name: 'Test_product_2',
        price: 600,
      } as Product)
      expect(createdProduct).toEqual({
        id: createdProduct.id,
        name: 'Test_product_2',
        price: 600,
      } as Product)
    })

    // Get All Products
    it('Get All Products Method Should Return All Products', async () => {
      const products = await productModel.getAllProducts()
      expect(products.length).toBe(2)
    })

    // Return One Product
    it('Get One Product method should return test Product when called with ID', async () => {
      const returnedProduct = await productModel.getOneProduct(product.id as string)
      expect(returnedProduct.id).toBe(product.id)
      expect(returnedProduct.name).toBe(product.name)
      expect(returnedProduct.price).toBe(product.price)
    })

    // Update Product
    it('Update Product method should return a Product with Updated attributes', async () => {
      const updatedProduct = await productModel.updateProduct({
        ...product,
        name: 'product_updated',
        price: 600,
      })
      expect(updatedProduct.id).toBe(product.id)
      expect(updatedProduct.name).toBe('product_updated')
      expect(updatedProduct.price).toBe(600)
    })

    // Delete Product
    it('Delete Product method should delete Product from DB', async () => {
      const deletedProduct = await productModel.deleteProduct(product.id as string)
      expect(deletedProduct.id).toBe(product.id)
    })
  })
})
