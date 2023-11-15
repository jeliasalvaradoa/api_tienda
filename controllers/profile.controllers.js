export class ProfileController {

  constructor({customerModel, orderModel}) {
    this.customerModel = customerModel
    this.orderModel = orderModel
  }

 getMyProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const customer = await this.customerModel.findByUser(user.sub);
    res.json(customer);
  } catch (error) {
    next(error);
  }
}
  getMyOrders = async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await this.orderModel.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

}

