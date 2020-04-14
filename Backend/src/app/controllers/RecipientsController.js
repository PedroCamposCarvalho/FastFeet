import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class RecipientsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const recipients = await Recipient.findAll({
      limit: 5,
      offset: (page - 1) * 5,
      attributes: ['id', 'nome', 'rua', 'numero', 'cidade', 'estado'],
    });

    return res.json(recipients);
  }

  async getForRegister(req, res) {
    const recipients = await Recipient.findAll({
      attributes: [
        ['id', 'value'],
        ['nome', 'label'],
      ],
    });
    return res.json(recipients);
  }

  async getByNameForRegister(req, res) {
    const { name } = req.params;
    const recipients = await Recipient.findAll({
      attributes: [
        ['id', 'value'],
        ['nome', 'label'],
      ],
      where: {
        nome: { [Op.like]: `%${name}%` },
      },
    });
    return res.json({ recipients });
  }

  async getByNameForSearch(req, res) {
    const { name } = req.params;
    const recipient = await Recipient.findAll({
      attributes: ['id', 'nome', 'rua', 'numero', 'cidade', 'estado'],
      where: {
        nome: { [Op.like]: `%${name}%` },
      },
    });
    return res.json({ recipient });
  }

  async getById(req, res) {
    const recipient = await Recipient.findByPk(req.params.id, {
      attributes: [
        'nome',
        'rua',
        'numero',
        'complemento',
        'cidade',
        'estado',
        'cep',
      ],
    });

    return res.json(recipient);
  }

  async store(req, res) {
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const recipientExists = await Recipient.findOne({
      where: { id: req.params.id },
    });
    if (!recipientExists) {
      return res.status(404).json({ error: 'Destinatário não encontrado' });
    }
    const recipient = await recipientExists.update(req.body);
    return res.json(recipient);
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }
    const order = await Order.findOne({
      where: { recipient_id: req.params.id },
    });
    if (order) {
      return res.status(400).json({ error: 'Recipient cannot be deleted' });
    }
    await recipient.destroy();
    return res.json({ ok: true });
  }
}

export default new RecipientsController();
