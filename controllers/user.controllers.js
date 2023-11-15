export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  createUser = async (req, res, next) => {
    try {
    const body = req.body;
    const newUser = await this.userModel.create(body);
    res.json(newUser);

  } catch (error) {
    next(error);
  }
  }

  getAll = async (req, res, next) => {
    try {
      const users = await this.userModel.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.userModel.findOne(id);
     return res.json(user)
    } catch (error) {
      next(error);
    }
  }

  getByEmail = async (req, res, next) => {
    try {
      const { email } = req.params;
      const user = await this.userModel.findByEmail(email);
     return res.json(user)
    } catch (error) {
      next(error);
    }
  }

  updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await this.userModel.update(id, body);
      return res.json(user);
      } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await this.userModel.delete(id);
      return res.json(rta);
     } catch (error) {
      next(error);
    }
  }
}
