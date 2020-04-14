import Problem from '../models/Problems';
import Order from '../models/Order';

class ProblemsController {
  async indexall(req, res) {
    const { page = 1 } = req.query;
    const problem = await Problem.findAll({ limit: 5, offset: (page - 1) * 5 });
    return res.json(problem);
  }

  async indexId(req, res) {
    const problems = await Problem.findAll({
      where: {
        delivery_id: req.params.id,
      },
    });
    return res.json(problems);
  }

  async store(req, res) {
    const order = await Order.findOne({
      where: {
        id: req.body.delivery_id,
      },
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const problem = await Problem.create(req.body);
    return res.json(problem);
  }
}

export default new ProblemsController();
