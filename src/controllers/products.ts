import { Request, Response } from 'express';
import Product from '../db/models/product';

// get all products
const getProducts = async (req: Request, res: Response) => {
  Product.find()
  .then(products => {
    const productsList = products.map(product => (
      {
        id: product._id,
        name: product.name,
      }
    ));
    res.send(productsList);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Error. Products list is not exists.'
    });
  });
}

// get product details
const getProductDetails = async (req: Request, res: Response) => {
  const id = req.params.productId;

  Product.findById(id)
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: `Product with Id: ${id} is not found.`
        });
      }
      res.send(product);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Product with Id: ${id} is not found.`
        });
      }
      return res.status(500).send({
        message: `Error retrieving product with Id: ${id}.`
      });
    });
}

// add a product
const addProduct = async (req: Request, res: Response) => {
  if (!req.body.name && !req.body.price) {
    return res.status(400).send({
      message: "Product content can not be empty."
    });
  }

  const { name, price } = req.body;

  const product = new Product({ name, price });

  product.save(err => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Product has been added.');
    }
  });
}

// update a product
const updateProduct = async (req: Request, res: Response) => {
  if (!req.body.name && !req.body.price) {
    return res.status(400).send({
      message: "Product content can not be empty."
    });
  }

  const id = req.params.productId;
  const { name, price } = req.body;

  const updateDate = Date.now();

  const options = {
    runValidator: true,
    upsert: false,
  }

  Product.findByIdAndUpdate(id, { name, price, updateDate }, options, (err) => {
    if (err) {
      res.status(404).send({
        message: `Product with Id: ${id} is not found.`
      });
    } else {
      res.send('Product has been updated.');
    }
  });
}

// delete a product
const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.productId;

  Product.findByIdAndDelete(id, null, (err) => {
    if (err) {
      res.status(404).send({
        message: `Product with Id: ${id} is not found.`
      });
    } else {
      res.send('Product has been deleted.')
    }
  });
}

export default { getProducts, getProductDetails, addProduct, updateProduct, deleteProduct };