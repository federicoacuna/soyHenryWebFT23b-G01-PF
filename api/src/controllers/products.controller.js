const productsService = require('../services/products.service')
const usersService = require('../services/users.service')
const reviewsService = require('../services/reviews.service')
const fs = require('fs/promises')

async function get (req, res, next) {
  try {
    const retrievedProducts = await productsService.getProducts(req.query)
    retrievedProducts ? res.status(200).json({ data: retrievedProducts }) : res.status(400).json({ error: 'No products where found' })
  } catch (error) {
    res.status(400).json(error)
  }
}
async function getById (req, res, next) {
  try {
    const retrievedProduct = await productsService.getProductDetail(req.params.id)
    const productReviews = await reviewsService.getReviewsForId(req.params.id)
    retrievedProduct.reviews = productReviews

    if (req.user) {
      const user = req.user.email
      const canReview = await productsService.canReview(req.params.id, user)
      retrievedProduct.canReview = canReview
    }
    retrievedProduct ? res.status(200).json({ data: retrievedProduct }) : res.status(400).json({ error: 'Requested product was not found' })
  } catch (error) {
    res.status(400).json(error)
  }
}

async function create (req, res, next) {
  const user = await usersService.getUserByEmail(req.user.email)
  if (!user.isAdmin) return res.status(401).json({ error: 'You are not an admin' })

  const {
    name,
    description,
    model,
    price,
    categoryId,
    brandId
  } = req.body || {}
  let { image } = req.files || {}

  if (!name || !description || !price || !image || !categoryId || !brandId) return res.status(400).json({ error: 'Missing required fields' })

  !Array.isArray(image) && (image = [image])

  try {
    // Array de promesas para subir las imágenes del array a Cloudinary
    const uploadImagesPromises = image.map(img => productsService.uploadImage(img.tempFilePath))
    // Subida de todas la imágenes a Cloduinary en paralelo
    image = await Promise.all(uploadImagesPromises)
    // Array de strings para guardar la url de las imágenes en la base de datos con su id en el formato url|id, el id es necesario para eliminar la imagen de Cloudinary
    image = image.map(({ secure_url: url, public_id: id }) => `${url}|${id}`)

    // Borra la carpeta temporal donde se guardan las imágenes antes de subirlas a Cloudinary
    await fs.rmdir('./tmp', { recursive: true })

    // Guarda el producto en la base de datos
    await productsService.saveProduct({ name, description, model, price, image, categoryId, brandId })
    const allProducts = await productsService.getProducts()

    res.status(201).json({ data: allProducts, message: 'El producto ha sido creado' })
  } catch (error) {
    if (image.every(img => typeof img === 'string')) {
      const deleteCloudinaryImagesPromises = image.map(img => productsService.deleteImage(img.split('|')[1]))
      await Promise.all(deleteCloudinaryImagesPromises)
    }

    res.status(500).json(error)
  }
}

async function update (req, res, next) {
  const user = await usersService.getUserByEmail(req.user.email)
  if (!user.isAdmin) return res.status(401).json({ error: 'You are not an admin' })

  const { id } = req.params
  const {
    name,
    description,
    model,
    price,
    categoryId,
    brandId,
    page
  } = req.body || {}
  let { image } = req.files || {}

  if (!page) return res.status(400).json({ error: 'Missing required fields' })

  try {
    if (image !== undefined) {
      !Array.isArray(image) && (image = [image])
      // Array de promesas para subir las imágenes del array a Cloudinary
      const uploadImagesPromises = image.map(img => productsService.uploadImage(img.tempFilePath))
      // Subida de todas la imágenes a Cloduinary en paralelo
      image = await Promise.all(uploadImagesPromises)
      // Array de strings para guardar la url de las imágenes en la base de datos con su id en el formato url|id, el id es necesario para eliminar la imagen de Cloudinary
      image = image.map(({ secure_url: url, public_id: id }) => `${url}|${id}`)

      // Borra la carpeta temporal donde se guardan las imágenes antes de subirlas a Cloudinary
      await fs.rmdir('./tmp', { recursive: true })
    }

    // Guarda el producto en la base de datos
    const [updatedRows] = await productsService.updateProduct({ name, description, model, price, image, categoryId, brandId }, id)
    const allProducts = await productsService.getProducts({ page })

    updatedRows === 1
      ? res.status(200).json({ data: allProducts, message: 'El producto ha sido actualizado' })
      : res.status(400).json({ error: 'No se pudo actualizar el producto' })
  } catch (error) {
    console.log(error)
    if (image !== undefined && image.every(img => typeof img === 'string')) {
      const deleteCloudinaryImagesPromises = image.map(img => productsService.deleteImage(img.split('|')[1]))
      await Promise.all(deleteCloudinaryImagesPromises)
    }

    res.status(500).json(error)
  }
}

async function remove (req, res, next) {
  // placeholder
}

module.exports = {
  get,
  create,
  update,
  remove,
  getById
}
