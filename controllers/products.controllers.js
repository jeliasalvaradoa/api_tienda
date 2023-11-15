export class ProductController {
  constructor({ productModel }) {
    this.productModel = productModel;
  }

  createProduct = async (req, res, next) => {
    try {
    const body = req.body;
    const newProduct = await this.productModel.create(body);
    res.json(newProduct);

  } catch (error) {
    next(error);
  }
  }

  getAll = async (req, res, next) => {
    try {
      const products = await this.productModel.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.productModel.findOne(id);
     return res.json(product)
    } catch (error) {
      next(error);
    }
  }

  updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await this.productModel.update(id, body);
      return res.json(product);
      } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await this.productModel.delete(id);
      return res.json(rta);
     } catch (error) {
      next(error);
    }
  }
}
