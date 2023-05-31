const { Service, PriceList, Motorcycle } = require("../models");

class ServiceController {
  static async GetAllServices(req, res, next) {
    try {
      const { model } = req.body;

      const services = await Motorcycle.findAll({
        where: {
          model,
        },
        include: {
          model: PriceList,
          include: {
            model: Service,
          },
        },
      });
      res.status(200).json(services);
    } catch (err) {
      next(err);
    }
  }
  static async GetServiceById(req, res, next) {
    try {
      const { id } = req.params;

      const service = await Service.findByPk(id);
      res.status(200).json(service);
    } catch (err) {
      next(err);
    }
  }
  static async AllServices(req, res, next) {
    try {
      const data = await Service.findAll();
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  ServiceController,
};
