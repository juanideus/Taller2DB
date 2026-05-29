import { validateTransactionParse } from "../../Schema/Transaction/Transaction.schema.js";
import { validateDetailTransactionParse } from "../../Schema/Transaction/Detail.Transaction.schema.js";
import { HandleError } from "../../Util/Error.js";
import { getDetailsTransaction } from "../../Model/Transaction.js";
import { generateTransaction } from "../../Model/Transaction.js";
export async function Transaction(req, res) {
  const validator = validateTransactionParse(req.body);
  if (!validator.success) {
    return res.status(400).json({
      message: validator.error.errors.map((e) => e.message).join(", "),
    });
  }
  try {
    const result = await generateTransaction(validator.data);
    if (result) {
      res.status(201).json({ message: "Transaccion generada exitosamente" });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al generar la transaccion",
    });
  }
}
export async function getDetailsTransactionById(req, res) {
  const validator = validateDetailTransactionParse(req.body);
  try {
    if (!validator.success) {
      return res.status(400).json({
        message: validator.error.errors.map((e) => e.message).join(", "),
      });
    }
    const result = await getDetailsTransaction(validator.data);
    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message:
        error.message || "Error al obtener los detalles de la transaccion",
    });
  }
}
