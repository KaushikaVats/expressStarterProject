///basic server configuration
const express = require('express')
const cookieParser = require('cookie-parser');
const ServerConfig = require('./config/serverConfig');
const cors = require('cors')
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');


const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoutes');


const app = express();
app.use(cors({
  origin : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

 app.use('/users', userRouter);
 app.use('/carts', cartRouter);
 app.use('/auth', authRouter );
 app.use('/products', productRouter);
app.use('/orders', orderRouter)

app.get('/ping', (req,res)=> {
   console.log(req.body);
   console.log(req.cookies);
   return res.json({message : "hello"})
})

app.listen(ServerConfig.PORT , async() => {
    
 await connectDB();
   console.log(`Server started at port ${ServerConfig.PORT}`);

 })
