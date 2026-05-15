import e from "express";
import { executeQuery } from "../../Db/Db.js";
import { addLibro, patchPriceBook,postGenerateCopy } from "../../Model/Book.js";

export async function addLibros(req, res) {
  try {
    const result = await addLibro(req.body);
    if (result) {
      res.status(201).json({ message: "Libro agregado exitosamente" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}
export async function patchPriceBooks(req, res) {
  try {
    const result = await patchPriceBook(req.body);
    if (result) {
      res.status(200).json({ message: "Precio actualizado exitosamente" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}
export async function generateCopy(req, res) {
  const { id } = req.params;
  const {codBarra} = req.body;
  try {
    const result = await postGenerateCopy(id, codBarra);
    if (result) {
      res.status(201).json({ message: "Copia generada exitosamente" });
    }
  }catch (error) {
    res.status(500).json(error.message);
  }
}
