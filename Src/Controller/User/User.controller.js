import addUser  from "../../Model/User.js";
/*
    if (!nombre || !edad || !rut || !direccion) 
*/
export default async function addUsuario(req, res) {
    console.log("req.body", req.body);
    
    try{
        const result = await addUser(req.body);
        if (result.affectedRows > 0) {
            return res.status(201).json({ message: "Usuario agregado exitosamente" });
        }
    }catch(error){
        return res.status(500).json({ error: error.message });
    }

}