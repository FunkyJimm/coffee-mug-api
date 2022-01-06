import { Schema, model, Date } from 'mongoose';

interface Product {
  name: string;
  price: number;
  updateDate: Date;
}

const schema = new Schema<Product>({
  name: {
    type: String,
    required: [true, 'Product name is required!'],
    minlength: [2, 'Product name must have 2 letters or more!'],
    maxlength: [100, 'Product name must have less than 101 characters!'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required!'],
    min: [0, 'Price must be higher than 0!'],
  },
  updateDate: {
    type: Date,
    required: false,
  },
});

const ProductModel = model<Product>('Product', schema);

export default ProductModel;