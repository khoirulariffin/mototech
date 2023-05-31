const { Customer, Profile } = require("../models");
const { checkPassword, signToken } = require("../helpers/helper");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

class CustomerController {
  static async registerCustomer(req, res, next) {
    try {
      const { username, email, password, firstname, lastname, address, city } =
        req.body;
      const customer = await Customer.create({ username, email, password });

      const profile = await Profile.create({
        firstname,
        lastname,
        address,
        city,
        IdCustomer: customer.id,
      });

      res.status(201).json({
        id: customer.id,
        username: customer.username,
        email: customer.email,
      });
    } catch (err) {
      next(err);
    }
  }
  static async loginCustomer(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username) {
        throw { name: "Username is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const customer = await Customer.findOne({
        where: { username },
      });

      if (!customer) {
        throw { name: "NotFound" };
      }

      const comparePassword = checkPassword(password, customer.password);

      if (!comparePassword) {
        throw { name: "InvalidPassword" };
      }

      const access_token = signToken({
        id: customer.id,
        username: customer.username,
        email: customer.email,
      });

      res.status(200).json({
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const { google_token } = req.body;
      const client = new OAuth2Client({
        clientId: process.env.GOOGLE_CLIENT_ID,
      });
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const email = payload.email;
      const password = "password";

      const [user, create] = await Customer.findOrCreate({
        where: { email },
        defaults: { password },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      response.status(200).json({
        statusCode: 200,
        message: "Login sukses",
        access_token: access_token,
      });
    } catch (err) {
      next(err);
    }
  }
  static async detail(req, res, next) {
    try {
      const { id } = req.customer;

      const data = await Customer.findByPk(id, {
        include: {
          model: Profile,
        },
      });

      if (!data) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }
  static async updateProfile(req, res, next) {
    try {
      const { username, email, password, firstname, lastname, address, city } =
        req.body;

      const { id } = req.customer;

      const customer = await Customer.findByPk(id, {
        include: {
          model: Profile,
        },
      });

      if (!customer) {
        throw { name: "NotFound" };
      }

      const updatedCust = await Customer.update(
        {
          username,
          email,
          password,
        },
        { where: { id } }
      );

      const updatedProfile = await Profile.update(
        {
          firstname,
          lastname,
          address,
          city,
        },
        { where: { IdCustomer: id } }
      );

      res.status(202).json({
        customer,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getMaps(req, res, next) {
    try {
      const { id } = req.customer;

      const customer = await Profile.findOne({
        where: {
          IdCustomer: id,
        },
      });

      // console.log(customer.city);

      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/distancematrix/json",
        {
          params: {
            origins: "Bekasi",
            destinations: customer.city,
            key: process.env.API_KEY_MAPS,
          },
        }
      );

      if (!response) {
        throw { name: "NotFound" };
      }

      const data = response.data;
      const tujuan = data.destination_addresses[0];
      const asal = data.origin_addresses[0];
      const jarak = data.rows[0].elements[0].distance.text;
      const waktu = data.rows[0].elements[0].duration.text;

      res.status(200).json({
        tujuan,
        asal,
        jarak,
        waktu,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  CustomerController,
};
