import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import {productsRouter} from './routes/products-router';
import {usersRouter} from './routes/users-router';

const app = express()

const port = process.env.PORT || 5000

app.use(bodyParser())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!')
})

app.use('/products', productsRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})