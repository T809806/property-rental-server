import Stripe from "stripe";
import dotenv from "dotenv";
import Transaction from "../models/Transaction.js";

dotenv.config();

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

// CREATE PAYMENT INTENT
export const createPayment =
  async (req, res) => {
    try {
      const { amount } = req.body;

      const paymentIntent =
        await stripe.paymentIntents.create(
          {
            amount: amount * 100,
            currency: "usd",
          }
        );

      res.json({
        clientSecret:
          paymentIntent.client_secret,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// SAVE TRANSACTION
export const saveTransaction =
  async (req, res) => {
    try {
      const {
        transactionId,
        property,
        tenant,
        owner,
        amount,
      } = req.body;

      const newTransaction =
        await Transaction.create({
          transactionId,
          property,
          tenant,
          owner,
          amount,
        });

      res.status(201).json({
        message:
          "Transaction saved",
        transaction:
          newTransaction,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// GET ALL TRANSACTIONS (ADMIN)
export const getTransactions =
  async (req, res) => {
    try {

      const transactions =
        await Transaction.find()
          .populate(
            "property tenant owner"
          )
          .sort({ createdAt: -1 });

      res.status(200).json(
        transactions
      );

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };