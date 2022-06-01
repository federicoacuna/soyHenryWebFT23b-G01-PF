import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  InputLeftElement,
  InputGroup,
  Icon,
  Select,
  HStack,
  Image,
  Spinner
} from '@chakra-ui/react'
import { HiOutlineUpload } from 'react-icons/hi'
import { createNewProduct, updateProduct } from '../../redux/actions/products.actions'

function ProductModal ({ isOpen, onClose, product, setProduct }) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const firstRender = useRef(true)
  const inputRef = useRef(null)
  const categories = useSelector(state => state.categories.data)
  const brands = useSelector(state => state.brands.data)
  const products = useSelector(state => state.products.data)
  const toast = useSelector(state => state.system.toast)
  const dispatch = useDispatch()

  useEffect(() => {
    if (firstRender.current) return
    setLoading(false)
    onClose()
  }, [products,toast])//eslint-disable-line

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    validateForm()
  }, [product])//eslint-disable-line

  const validateForm = () => {
    const errors = {}

    if (product.name === '') errors.name = 'El nombre del producto es obligatorio'
    if (product.description === '') errors.description = 'La descripción del producto es obligatoria'
    if (product.price === '') errors.price = 'El precio del producto es obligatorio'
    if (isNaN(product.price)) errors.price = 'El precio del producto debe ser un número'
    if (product.price !== '' && product.price <= 0) errors.price = 'El precio del producto debe ser mayor a 0'
    if (product.image.length === 0) errors.image = 'Cargue minímo una imagen'
    if (product.categoryId === '') errors.categoryId = 'Seleccione una categoría'
    if (product.brandId === '') errors.brandId = 'Seleccione una marca'

    setErrors(errors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0) {
      return
    }
    if (product.isNew)dispatch(createNewProduct(product))
    else dispatch(updateProduct(product))

    setLoading(true)
  }

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const imageValue = () => {
    if (product.image.length === 0) return ''

    if (typeof product.image[0] === 'string') {
      return product.image.map((file) => file.name).join(', ')
    }

    if (product.image[0] instanceof File) {
      return product.image.map((file) => file.name).join(', ')
    }
  }

  const handleImageChange = (e) => {
    const image = Array.from(e.target.files)

    if (image.length === 0) return
    if (!image.every(img => img.type.startsWith('image/'))) {
      setErrors({ ...errors, image: 'Solo se permiten imágenes' })
      return
    }

    setProduct({
      ...product,
      image
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='scale'
      size='full'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          maxW='75ch'
          mx='auto'
          textAlign='center'
        >
          {product.isNew ? 'Crear Producto' : 'Editar Producto'}
        </ModalHeader>
        {!loading && <ModalCloseButton />}
        <ModalBody>
          <form style={{ maxWidth: '75ch', margin: '0 auto' }} id='createProduct' onSubmit={handleSubmit}>
            <FormControl isRequired isDisabled={loading} isInvalid={errors.name !== undefined} mb='1rem'>
              <FormLabel htmlFor='name'>Nombre</FormLabel>
              <Input
                type='text'
                id='productName'
                name='name'
                placeholder='Computador portátil HP'
                value={product.name}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isDisabled={loading} isInvalid={errors.description !== undefined} mb='1rem'>
              <FormLabel htmlFor='description'>Descripción</FormLabel>
              <Textarea
                resize='none'
                id='productDescription'
                name='description'
                placeholder='Computadora portátil de alto rendimiento'
                value={product.description}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

            <FormControl isDisabled={loading} isInvalid={errors.model !== undefined} mb='1rem'>
              <FormLabel htmlFor='model'>Modelo</FormLabel>
              <Input
                type='text'
                id='productModel'
                name='model'
                placeholder='HP-12345'
                value={product.model}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.model}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isDisabled={loading} isInvalid={errors.price !== undefined} mb='1rem'>
              <FormLabel htmlFor='price'>Precio</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  $
                </InputLeftElement>
                <Input
                  id='productPrice'
                  name='price'
                  placeholder='499.99'
                  value={product.price}
                  onChange={handleChange}
                />
              </InputGroup>
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            <FormControl isDisabled={loading} isInvalid={errors.categoryId !== undefined} isRequired mb='1rem'>
              <FormLabel htmlFor='country'>Categoría</FormLabel>
              <Select
                name='categoryId'
                id='productCategory' placeholder='Selecciona una categoría'
                value={categories.find(category => category.id === product.categoryId)?.id ||
                  product.categoryId}
                onChange={handleChange}
              >
                {
                  categories.map(category =>
                    (<option key={Date.now().toString() + category.name} value={category.id}>{category.name}</option>)
                  )
                }
              </Select>
            </FormControl>

            <FormControl isDisabled={loading} isInvalid={errors.brandId !== undefined} isRequired mb='1rem'>
              <FormLabel htmlFor='country'>Marca</FormLabel>
              <Select
                name='brandId'
                id='productBrand' placeholder='Selecciona una marca'
                value={brands.find(brand => brand.id === product.brandId)?.id ||
                product.brandId}
                onChange={handleChange}
              >
                {
                  brands.map(brand =>
                    (<option key={Date.now().toString() + brand.name} value={brand.id}>{brand.name}</option>)
                  )
                }
              </Select>
            </FormControl>

            {product.image.length > 0 && (
              <HStack gap='1rem' wrap='wrap'>
                {product.image.length > 0 && product.image.map((img) => {
                  const src = img instanceof File ? window.URL.createObjectURL(img) : img
                  return (
                    <Image
                      key={Date.now().toString() + img.name + Math.random()}
                      boxSize='150px'
                      objectFit='contain'
                      src={src}
                      alt={img.name}
                    />
                  )
                })}
              </HStack>)}

            <FormControl isInvalid={errors.image !== undefined} mb='1rem'>
              <FormLabel htmlFor='productImages'>Imágenes</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Icon as={HiOutlineUpload} />
                </InputLeftElement>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  name='image'
                  ref={inputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <Input
                  id='productImages'
                  placeholder='HP-12345.jpg'
                  onClick={() => inputRef.current.click()}
                  value={imageValue()}
                  cursor='pointer'
                  readOnly
                  isRequired
                  isDisabled={loading}
                />
              </InputGroup>
              <FormErrorMessage>{errors.image}</FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter width='100%' maxW='75ch' mx='auto' p='0' justifyContent='space-between' my='1rem'>
          <Button colorScheme='red' onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            disabled={loading}
            type='submit'
            form='createProduct'
            bg='primary'
            color='secondary'
            _hover={{ bg: 'secondary', color: 'primary' }}
            rightIcon={loading ? <Spinner /> : undefined}
          >
            {product.isNew ? 'Crear' : 'Actualizar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ProductModal
