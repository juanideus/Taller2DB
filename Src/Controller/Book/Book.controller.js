import e from "express";
import { executeQuery } from "../../Db/Db.js";
import {
  addLibro,
  patchPriceBook,
  postGenerateCopy,
  disableCopyBook,
  showBook,
} from "../../Model/Book.js";
import { validateBookParse } from "../../Schema/Book/Book.schema.js";
import { validateCopyBookParse } from "../../Schema/Book/copyBook.schema.js";
import { validateBookPatchPriceParse } from "../../Schema/Book/bookPatch.schema.js";
import { validateCopyBookDisableParse } from "../../Schema/Book/copyBookDisable.schema.js";
export async function addLibros(req, res) {
  try {
    const validator = validateBookParse(req.body);
    if (!validator.success) {
      return res.status(400).json({
        message: validator.error.errors.map((e) => e.message).join(", "),
      });
    }
    const result = await addLibro(req.body);
    if (result) {
      res.status(201).json({ message: "Libro agregado exitosamente" });
    }
  } catch (error) {
    console.error(error.statusCode);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error al agregar el libro" });
  }
}

export async function patchPriceBooks(req, res) {
  console.log("Patch executed with body:", req.body);
  try {
    const validator = validateBookPatchPriceParse(req.body);
    if (!validator.success) {
      return res.status(400).json({
        message: validator.error.errors.map((e) => e.message).join(", "),
      });
    }

    const result = await patchPriceBook(validator.data);
    if (result) {
      res.status(200).json({ message: "Precio actualizado exitosamente" });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al generar la copia del libro",
    });
  }
}

export async function generateCopy(req, res) {
  const validator = validateCopyBookParse(req.body);

  if (!validator.success) {
    return res.status(400).json({
      message: validator.error.errors.map((e) => e.message).join(", "),
    });
  }

  try {
    const result = await postGenerateCopy(validator.data);
    if (result) {
      res.status(201).json({ message: "Copia generada exitosamente" });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al generar la copia del libro",
    });
  }
}
export async function disableBook(req, res) {
  try {
    const validator = validateCopyBookDisableParse(req.body);
    if (!validator.success) {
      return res.status(400).json({
        message: validator.error.errors.map((e) => e.message).join(", "),
      });
    }
    const result = await disableCopyBook(validator.data);
    if (result) {
      res.status(200).json({ message: "Copia deshabilitada exitosamente" });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al deshabilitar la copia del libro",
    });
  }
}

export async function getAllBooks(req, res) {
  try {
    const result = await showBook();
    if (result) {
      return res.status(200).json({
        message: "Libros encontrados exitosamente",
        data: result,
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al encontrar los libro",
    });
  }
}
