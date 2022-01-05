import { Request, Response, NextFunction } from 'express';
import Product from '../db/models/product';

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Produkty");
  Product.find()
  .then(products => {
    res.send(products);
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Error. Products list is not exists.'
    })
  })
}

const getProductDetails = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Szczegóły produktu");

  const { id } = req.body;

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
        message: `Error retrieving note with Id: ${id}.`
      });
    });
};

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Dodawanie produktu");

  if (!req.body.content) {
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

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Aktualizowanie produktu");

  if (!req.body.content) {
    return res.status(400).send({
      message: "Product content can not be empty."
    });
  }

  const { id, name, price } = req.body;

  const options = {
    runValidator: true,
    upsert: false,
  }

  Product.findByIdAndUpdate(id, { name, price }, options, (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send('Product has been updated.');
    }
  });
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Usuwanie produktu");

  const { id } = req.body;

  Product.findByIdAndDelete(id, null, (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send('Product has been deleted.')
    }
  });
}

export default { getProducts, getProductDetails, addProduct, updateProduct, deleteProduct };