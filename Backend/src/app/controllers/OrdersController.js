import {
  isBefore,
  isAfter,
  parseISO,
  startOfHour,
  isSameHour,
  startOfDay,
  endOfDay,
} from 'date-fns';
import Sequelize, { Op } from 'sequelize';
import Order from '../models/Order';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import Mail from '../../lib/Mail';
import Problem from '../models/Problems';

function getTwoDigitDateFormat(monthOrDate) {
  return monthOrDate < 10 ? `0${monthOrDate}` : `${monthOrDate}`;
}
function verificaHoraRetirada(start_date) {
  const hourStart = startOfHour(parseISO(start_date));
  const data = new Date();
  const dataDia = getTwoDigitDateFormat(String(data.getDate()));
  const dataMes = getTwoDigitDateFormat(String(data.getMonth() + 1));
  const dataAno = String(data.getFullYear());
  const stringDataInicio = `${dataAno}-${dataMes}-${dataDia}T08:00:00-03:00`;
  const stringDataFim = `${dataAno}-${dataMes}-${dataDia}T18:00:00-03:00`;
  const horaInicio = startOfHour(parseISO(stringDataInicio));
  const horafim = startOfHour(parseISO(stringDataFim));
  const horasInicioIguais = isSameHour(hourStart, horaInicio);
  const horasFimIguais = isSameHour(hourStart, horafim);
  const horaDepoisDas8 = isAfter(hourStart, horaInicio);
  const horaAntesDas18 = isBefore(hourStart, horafim);
  if (
    horasInicioIguais ||
    horasFimIguais ||
    (horaDepoisDas8 && horaAntesDas18)
  ) {
    return true;
  }
  return false;
}

class OrdersController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const orders = await Order.findAll({
      limit: 5,
      offset: (page - 1) * 5,
      attributes: [
        'id',
        'start_date',
        'canceled_at',
        'end_date',
        'product',
        'recipient_id',
        'deliveryman_id',
      ],
      include: [
        {
          model: Recipient,
          attributes: [
            'nome',
            'cidade',
            'estado',
            'rua',
            'numero',
            'complemento',
            'cep',
          ],
        },
        {
          model: Courier,
          attributes: ['avatar_id', 'name'],
          include: [
            {
              model: File,
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(orders);
  }

  async getOrderWithProblems(req, res) {
    const problems = await Problem.findAll({
      attributes: ['delivery_id'],
      group: [
        'delivery_id',
        'Order.id',
        'Order.start_date',
        'Order.canceled_at',
        'Order.end_date',
        'Order.product',
        'Order.recipient_id',
        'Order.deliveryman_id',
        'Order->Recipient.id',
        'Order->Recipient.nome',
        'Order->Recipient.cidade',
        'Order->Recipient.estado',
        'Order->Recipient.rua',
        'Order->Recipient.numero',
        'Order->Recipient.complemento',
        'Order->Recipient.cep',
        'Order->File.id',
        'Order->File.name',
        'Order->File.path',
      ],
      include: [
        {
          model: Order,
          attributes: [
            'id',
            'start_date',
            'canceled_at',
            'end_date',
            'product',
            'recipient_id',
            'deliveryman_id',
          ],
          include: [
            {
              model: Recipient,
              attributes: [
                'nome',
                'cidade',
                'estado',
                'rua',
                'numero',
                'complemento',
                'cep',
              ],
            },
            {
              model: File,
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(problems);
  }

  async getById(req, res) {
    const order = await Order.findByPk(req.params.id, {
      attributes: [
        'id',
        'start_date',
        'canceled_at',
        'end_date',
        'product',
        'recipient_id',
        'deliveryman_id',
      ],
      include: [
        {
          model: Recipient,
          attributes: [
            'nome',
            'cidade',
            'estado',
            'rua',
            'numero',
            'complemento',
            'cep',
          ],
        },
        {
          model: Courier,
          attributes: ['avatar_id', 'name'],
          include: [
            {
              model: File,
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(order);
  }

  async getByName(req, res) {
    const { Op } = Sequelize;
    const order = await Order.findAll({
      where: { product: { [Op.like]: `%${req.params.product}%` } },
      attributes: ['id', 'start_date', 'canceled_at', 'end_date', 'product'],
      include: [
        {
          model: Recipient,
          attributes: [
            'nome',
            'cidade',
            'estado',
            'rua',
            'numero',
            'complemento',
            'cep',
          ],
        },
        {
          model: Courier,
          attributes: ['avatar_id', 'name'],
          include: [
            {
              model: File,
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(order);
  }

  async store(req, res) {
    const { recipient_id, deliveryman_id, product } = req.body;
    const courier = await Courier.findByPk(req.body.deliveryman_id);
    const recipient = await Recipient.findByPk(req.body.recipient_id);
    const { name, email } = courier;
    const { rua, cep, cidade } = recipient;
    const order = await Order.create({ recipient_id, deliveryman_id, product });

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Novo pedido',
      template: 'neworder',
      context: {
        courier: name,
        logradouro: rua,
        cep,
        cidade,
      },
    });
    return res.json(order);
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);
    const { id } = await order.update(req.body);
    return res.json({ id });
  }

  async updateDates(req, res) {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (req.body.start_date) {
      const parsedDate = parseISO(req.body.start_date);
      const retiradas = await Order.findAll({
        where: {
          deliveryman_id: req.body.deliveryman_id,
          start_date: {
            [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
          },
        },
      });
      if (retiradas.length === 5) {
        return res
          .status(401)
          .json({ error: 'Você não pode fazer mais de 5 entregas por dia' });
      }
      const HorarioValido = verificaHoraRetirada(req.body.start_date);
      if (!HorarioValido) {
        return res
          .status(401)
          .json({ error: 'Você só pode retirar entregas entre 08:00 e 18:00' });
      }
      const { id, start_date } = await order.update(req.body);
      return res.json({ id, start_date });
    }
    if (req.body.canceled_at) {
      const { id, canceled_at } = await order.update(req.body);
      const { recipient_id, deliveryman_id } = order;
      const courier = await Courier.findByPk(deliveryman_id);
      const recipient = await Recipient.findByPk(recipient_id);
      const { name, email } = courier;
      const { nome, rua, cep, cidade } = recipient;
      await Mail.sendMail({
        to: `${name} <${email}>`,
        subject: 'Cancelamento de pedido',
        template: 'cancel',
        context: {
          courier: name,
          logradouro: rua,
          cep,
          cidade,
          destinatario: nome,
        },
      });
      return res.json({ id, canceled_at });
    }
    if (req.body.end_date) {
      const { id, signature_id, end_date } = await order.update(req.body);
      return res.json({ id, signature_id, end_date });
    }
    return res.status(404).json({ error: 'Cannot update' });
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }
    Problem.destroy({ where: { delivery_id: order.id } });

    await order.destroy();
    return res.json({ ok: true });
  }
}

export default new OrdersController();
