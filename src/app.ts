import express from 'express'
import userRouter from './routes/userRoutes'
import loginRouter from './routes/loginRouter'

const app = express()
app.use(express.json())

app.use('/users', userRouter)
app.use('/user', loginRouter)


export default app