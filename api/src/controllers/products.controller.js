const productsService = require('../services/products.service')
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
  const { name, description, model, price, categoryId, brandId } = req.body
  let { image } = req.files || {}

  if (!name || !description || !price || !image || !categoryId || !brandId) return res.status(400).json({ error: 'Missing required fields' })

  !Array.isArray(image) && (image = [image])

  try {
    // Array de promesas para subir las imágenes del array a Cloudinary
    const uploadImagesPromises = image.map(img => productsService.uploadImage(img.tempFilePath))
    // Subida de todas la imágenes a Cloduinary en paralelo
    image = await Promise.all(uploadImagesPromises)
    // Array de strings para guardar la url de las imágenes en la base de datos con su id en el formato url|id, el id es necesario para eleminar la imagen de Cloudinary
    image = image.map(({ secure_url: url, public_id: id }) => `${url}|${id}`)

    // Borra la carpeta temporal donde se guardan las imágenes antes de subirlas a Cloudinary
    await fs.rmdir('./tmp', { recursive: true })

    // Guarda el producto en la base de datos
    const newProduct = await productsService.saveProduct({ name, description, model, price, image, categoryId, brandId })

    res.json({ data: newProduct, message: 'El producto ha sido creado' })
  } catch (error) {
    console.log(error)
    if (image.every(img => typeof img === 'string')) {
      const deleteCloudinaryImagesPromises = image.map(img => productsService.deleteImage(img.split('|')[1]))
      await Promise.all(deleteCloudinaryImagesPromises)
    }

    res.status(500).json(error)
  }
}

async function update (req, res, next) {
  // placeholder
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
