import {Request, Response, Router} from 'express';

export const usersRouter = Router({})

const users = [{id: 1, name: 'Misha'}, {id: 2, name: 'Nastya'}]


usersRouter.get('/', (req: Request, res: Response) => {
    res.send(users)
})

usersRouter.get('/:id', (req: Request, res: Response) => {
    const user = users.find(u => u.id === +req.params.id);
    if (user) {
        res.send(user)
    } else {
        res.send(404)
    }
})