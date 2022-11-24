import {Request, Response, Router} from 'express';
import {productsRepository} from '../repositories/products-repository';
import {inputValidatorResult, titleValidator} from "../middleware/input-validation";

export const productsRouter = Router({})

productsRouter.get('/', async (req: Request, res: Response) => {
    const products = await productsRepository.findProducts(req.query.title?.toString())
    res.send(products)
})

productsRouter.post('/',
    titleValidator,
    inputValidatorResult,
    async (req: Request, res: Response) => {
        const newProduct = await productsRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product = await productsRepository.findProductById(+req.params.id)
    product
        ? res.send(product)
        : res.send(404)
})

productsRouter.put('/:id',
    titleValidator,
    inputValidatorResult,
    async (req: Request, res: Response) => {
        const id = +req.params.id
        await productsRepository.updateProduct(id, req.body.title)
            ? res.send(productsRepository.findProductById(id))
            : res.send(404)
    })

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    await productsRepository.removeProduct(+req.params.id)
        ? res.send(204)
        : res.send(404)
})