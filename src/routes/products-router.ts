import {Request, Response, Router} from 'express';

export const productsRouter = Router({})

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

productsRouter.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
        const searchString = req.query.title.toString()
        res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})

productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.put('/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id);
    if (product) {
        product.title = req.body.title
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})