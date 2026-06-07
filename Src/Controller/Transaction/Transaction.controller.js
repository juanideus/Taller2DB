import { validateTransactionParse } from "../../Schema/Transaction/Transaction.schema.js";
import { validateDetailTransactionParse } from "../../Schema/Transaction/Detail.Transaction.schema.js";
import { HandleError } from "../../Util/Error.js";
import { getDetailsTransaction } from "../../Model/Transaction/Transaction.js";
import { generateTransaction } from "../../Model/Transaction/Transaction.js";
import { showLessLoanComedy } from "../../Model/Transaction/Transaction.js";
export async function Transaction(req, res) {
  const validator = validateTransactionParse(req.body);
  console.log("validator: ", validator.data);
  if (!validator.success) {
    return res.status(400).json({
      message: validator.error.errors.map((e) => e.message).join(", "),
    });
  }
  try {
    const result = await generateTransaction(validator.data);
    if (result) {
      res.status(201).json({
        status: 201,
        message: "Transaccion generada exitosamente",
        data: {
          idTransaccion: result.idsTransaccion,
        },
      });
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
export async function getlibrains(req, res) {
  try {
    const result = await showLessLoanComedy();
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
export async function showComedy(req, res) {
  try {
    const result = await showLessLoanComedy();
   
    res.status(200).json({
      status: 200,
      message: "Comedias obtenidas exitosamente",
      data: result,
    }
    );
}catch (error) {
    res.status(error.statusCode || 500).json({
      message:
        error.message || "Error al obtener los detalles de la transaccion",
    });
  }}
