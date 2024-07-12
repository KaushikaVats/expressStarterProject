 //const { getProductById } = require('../repositories/productRepository');
 //const { createProduct, getProductById, deleteProductById } = require('../services/productService');

const { createProduct,  getProductById, deleteProductById} = require('../services/productService');
const AppError = require('../utils/appError');
 
 async function addProduct(req, res) {
    try{
        const product = await createProduct({
            productName : req.body.productName,
            imagePath: req.file.path,
             description: req.body.description,
             price: req.body.price,
             category: req.body.category,
             inStock: req.body.inStock
        });
        //console.log("Back to controler" , product)
        return res.status(201).json({
            success: true,
            message : "successfully created ",
            error : {},
            data : product
        })
    }catch(error){

        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message : error.message,
                data:{},
                error:error
            })
        }
         console.log(error);
         return res.status(500).json({
            success: false,
            message : 'Something went wrong ',
            data:{},
            error:error
        });
    }

 }
    async function getProduct(req,res){
        try{
            const response = await getProductById(req.params.id);
            return res.status(200).json({
                success:true,
                message:"Succesfully fetched the product",
                error:{},
                data: response
            })

        }catch(error){
            if(error instanceof AppError){
                return res.status(error.statusCode).json({
                    success: false,
                    message : error.message,
                    data:{},
                    error:error
                });
            }
        }
    }


    async function deleteProduct(req,res){
        try{
            const response = await deleteProductById(req.params.id);
            return res.status(200).json({
                success:true,
                message:"Succesfully deleted the product",
                error:{},
                data: response
            })

        }catch (error) {
            if(error instanceof AppError){
                return res.status(error.statusCode).json({
                    success: false,
                    message : error.message,
                    data:{},
                    error:error
                });
            }
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
                data: {},
                error: error
        });
    }

}
    module.exports = {
        addProduct,
        getProduct,
        deleteProduct
    
    }
    