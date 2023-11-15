export class OrderController {

  constructor({ orderModel }) {
    this.orderModel = orderModel
  }

      createOrder = async (req, res, next) => {
      try {
        // const body = {
        //   userId: req.user.sub
        // }
        const body = req.body
        const newOrder = await this.orderModel.create(body)
        res.status(201).json(newOrder)
      } catch (err) {
        next(err)
      }
    }

  addNewIdtem = async (req, res, next) => {
      try {
        const body = req.body
        const newItem = await this.orderModel.addItem(body)
        res.status(201).json(newItem)
      } catch (error) {
        next(error)
      }
    }

    getById = async (req, res, next) => {
      try {
        const { id } = req.params
        const order = await this.orderModel.findOne(id)
        res.json(order)
      } catch (error) {
        next(error)
      }
    }

  deleteOrder = async (req, res, next) => {
    try {
      const { id } = req.params
      const rta = await this.orderModel.delete(id)
      return res.json(rta)
     } catch (error) {
      next(error)
    }
  }
}
