export class CustomerController {
  constructor({ customerModel }) {
    this.customerModel = customerModel;
  }

  createCustomer = async (req, res, next) => {
    try {
    const body = req.body;
    const newCustomer = await this.customerModel.create(body);
    res.json(newCustomer);

  } catch (error) {
    next(error);
  }
  }

  getAll = async (req, res, next) => {
    try {
      const customers = await this.customerModel.find();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await this.customerModel.findOne(id);
     return res.json(customer)
    } catch (error) {
      next(error);
    }
  }

  updateCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await this.customerModel.update(id, body);
      return res.json(customer);
      } catch (error) {
      next(error);
    }
  };

  deleteCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await this.customerModel.delete(id);
      return res.json(rta);
     } catch (error) {
      next(error);
    }
  }
}
