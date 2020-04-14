import Sequelize from 'sequelize';
import Courier from '../models/Courier';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

class DeliveryManController {
  async indexPending(req, res) {
    const courier = await Courier.findByPk(req.params.id);

    if (!courier) {
      return res.status(404).json({ error: 'Courier not found' });
    }

    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: null,
        canceled_at: null,
      },
      attributes: ['id', 'created_at', 'start_date'],
      include: [
        {
          model: Recipient,
          attributes: ['cidade'],
        },
      ],
    });
    return res.json(orders);
  }

  async indexCompleted(req, res) {
    const courier = await Courier.findByPk(req.params.id);

    if (!courier) {
      return res.status(404).json({ error: 'Courier not found' });
    }
    const { Op } = Sequelize;
    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: { [Op.ne]: null },
        canceled_at: null,
      },
      attributes: ['id', 'created_at'],
      include: [
        {
          model: Recipient,
          attributes: ['cidade'],
        },
      ],
    });
    return res.json(orders);
  }
}
export default new DeliveryManController();
