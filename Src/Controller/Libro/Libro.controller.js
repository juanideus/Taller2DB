  import e from "express";
  import { executeQuery } from "../../Db/Db.js";
  import  {addLibro, patchPriceBook} from "../../Model/Book.js";
  /*

      "nombre": "El señor de los anillos",
      "autor": "J.R.R. Tolkien",
      "fechaRecepcion": "1954-07-29",
      "edadSugerida": 12,
      "editorial": "Allen & Unwin",
      "precio": 20.99    
  }
  */
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
      try{
        const result = await patchPriceBook(req.body);
        if(result){
          res.status(200).json({ message: "Precio actualizado exitosamente" });
        }
      }catch(error){
        res.status(500).json(error.message);
      }

  }
 
