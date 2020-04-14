import { Op } from 'sequelize';
import Courier from '../models/Courier';
import File from '../models/File';
import Order from '../models/Order';

class CouriersController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const couriers = await Courier.findAll({
      limit: 5,
      offset: (page - 1) * 5,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(couriers);
  }

  async getForRegister(req, res) {
    const couriers = await Courier.findAll({
      attributes: [
        ['id', 'value'],
        ['name', 'label'],
      ],
    });

    return res.json(couriers);
  }

  async getByNameForRegister(req, res) {
    const { name } = req.params;
    const courier = await Courier.findAll({
      attributes: [
        ['id', 'value'],
        ['name', 'label'],
      ],
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });
    return res.json({ courier });
  }

  async getByNameForSearch(req, res) {
    const { name } = req.params;
    const courier = await Courier.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          attributes: ['name', 'path', 'url'],
        },
      ],
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });
    return res.json({ courier });
  }

  async getByid(req, res) {
    const courier = await Courier.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'avatar_id', 'createdAt'],
      include: [
        {
          model: File,
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    if (!courier) {
      return res.status(404).json({ error: 'Courier not found' });
    }
    return res.json(courier);
  }

  async store(req, res) {
    const emailExists = await Courier.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      return res.status(401).json({ error: 'Email already exists' });
    }
    const courier = await Courier.create(req.body);
    return res.json(courier);
  }

  async update(req, res) {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      return res.status(404).json({ error: 'Courier not found' });
    }
    const emailExists = await Courier.findOne({
      where: { email: req.body.email },
    });
    if (emailExists && Number(emailExists.id) !== Number(req.params.id)) {
      return res
        .status(401)
        .json({ error: 'Email already exists. Choose another one' });
    }

    const { name, email, avatar_id } = await courier.update(req.body);
    return res.json({ name, email, avatar_id });
  }

  async delete(req, res) {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      return res.status(400).json({ error: 'Courier not found' });
    }
    const order = await Order.findOne({
      where: { deliveryman_id: req.params.id },
    });
    if (order) {
      return res.status(400).json({ error: 'Courier cannot be deleted' });
    }
    await courier.destroy();
    return res.json({ ok: true });
  }
}

export default new CouriersController();
