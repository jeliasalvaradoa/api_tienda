export class CategoryController {
  constructor({ categoryModel }) {
    this.categoryModel = categoryModel
  }

  createCategory = async (req, res, next) => {
    try {
    const body = req.body;
    const newCategory = await this.categoryModel.create(body);
    res.json(newCategory);

  } catch (error) {
    next(error);
  }
  }

  getAll = async (req, res, next) => {
    try {
      const categories = await this.categoryModel.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await this.categoryModel.findOne(id);
     return res.json(category)
    } catch (error) {
      next(error);
    }
  }

  updateCategory = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await this.categoryModel.update(id, body);
      return res.json(category);
      } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await this.categoryModel.delete(id);
      return res.json(rta);
     } catch (error) {
      next(error);
    }
  }
}

