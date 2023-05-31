const { Transaction, Service, Customer, PriceList } = require("../models");
const Xendit = require("xendit-node");

class TransactionController {
  static async CreateInvoice(req, res, next) {
    try {
      const IdCustomer = req.customer.id;

      const { IdService, IdMotorcycle, towingFee } = req.body;

      if (!IdCustomer) {
        throw { name: "InvalidToken" };
      }

      const service = await Service.findByPk(IdService, {
        include: {
          model: PriceList,
          where: {
            IdMotorcycle,
          },
        },
      });
      // console.log(service.PriceLists[0].price);

      const price = Number(service.PriceLists[0].price) + Number(towingFee);

      const customer = await Customer.findByPk(IdCustomer);

      const maxId = await Transaction.max("id");

      const x = new Xendit({
        secretKey: process.env.API_KEY_XENDIT,
      });

      const { Invoice } = x;
      const invoiceSpecificOptions = {};
      const i = new Invoice(invoiceSpecificOptions);

      const resp = await i.createInvoice({
        externalID: `va-success-${new Date()}`,
        amount: price,
        description: `Invoice for ID Transaction ${maxId + 1}`,
        invoice_duration: 86400,
        payer_email: customer.email,
        customer: {
          email: customer.email,
        },
        customer_notification_preference: {
          invoice_created: ["email"],
          invoice_reminder: ["email"],
          invoice_paid: ["email"],
          invoice_expired: ["email"],
        },
        success_redirect_url: "https://www.facebook.com/",
        failure_redirect_url: "https://www.google.com",
        currency: "IDR",
        items: [
          {
            name: service.title,
            quantity: 1,
            price: price,
            url: "ini URL untuk detail barang",
          },
        ],
        fees: [
          {
            type: "ADMIN",
            value: 5000,
          },
        ],
      });

      const newInvoice = await Transaction.create({
        IdService,
        IdCustomer,
        status: resp.status,
        invoiceId: resp.id,
      });

      res.status(201).json({ resp });
    } catch (err) {
      next(err);
    }
  }
  static async CheckInvoice(req, res, next) {
    try {
      const { invoiceID } = req.params;

      const x = new Xendit({
        secretKey: process.env.API_KEY_XENDIT,
      });

      const { Invoice } = x;
      const invoiceSpecificOptions = {};
      const i = new Invoice(invoiceSpecificOptions);

      const resp = await i.getInvoice({
        invoiceID,
      });

      res.status(200).json({ resp });
    } catch (err) {
      next(err);
    }
  }
  static async UpdateInvoice(req, res, next) {
    try {
      const { id } = req.params;

      const invoice = await Transaction.findOne({
        where: {
          id,
        },
      });

      if (!invoice) {
        throw { name: "NotFound" };
      }

      if (invoice.status === "PENDING") {
        throw { name: "Forbidden" };
      }

      const updatedRows = await Transaction.update(
        {
          status: true,
        },
        { where: { id: invoice.id } }
      );

      res.status(200).json({
        message: `Success update Invoice ID ${invoice.id}`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async GetAllTransaction(req, res, next) {
    try {
      const { id } = req.customer;
      const transactions = await Transaction.findAll({
        where: {
          IdCustomer: id,
        },
      });
      res.status(200).json({ transactions });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  TransactionController,
};
