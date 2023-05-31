const { Motorcycle, PriceList, Service } = require("../models");
const axios = require("axios");
const request = require("request");

class MotorcycleController {
  static async GetAllMotorcycles(req, res, next) {
    try {
      const { make, model } = req.body;

      request.get(
        {
          url: `https://api.api-ninjas.com/v1/motorcycles?make=${make}&model=${model}`,
          headers: {
            "X-Api-Key": process.env.API_KEY_NINJA,
          },
        },
        function (error, response, body) {
          if (error) return console.error("Request failed:", error);
          else if (response.statusCode != 200)
            return console.error(
              "Error:",
              response.statusCode,
              body.toString("utf8")
            );
          else {
            // console.log(body);
            res.status(200).json(JSON.parse(body));
          }
        }
      );
    } catch (err) {
      next(err);
    }
  }
  static async GetAvailableMotorcycles(req, res, next) {
    try {
      const motorcycles = await Motorcycle.findAll();
      res.status(200).json(motorcycles);
    } catch (err) {
      next(err);
    }
  }
  static async GetMotorcyclePriceLists(req, res, next) {
    try {
      const { IdMotorcycle } = req.body;
      const pricelist = await Service.findAll({
        include: {
          model: PriceList,
          where: {
            IdMotorcycle,
          },
        },
      });
      res.status(200).json(pricelist);
    } catch (err) {
      next(err);
    }
  }
  static async GetMotorcycle(req, res, next) {
    try {
      const { model } = req.params;
      const motorcycle = await Motorcycle.findOne({
        where: {
          model,
        },
      });

      if (!motorcycle) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ motorcycle });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  MotorcycleController,
};
