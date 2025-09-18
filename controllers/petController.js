import { sendError, sendSucces } from "../helper/response.js";
import { petValidator ,idValidator} from "../helper/validator.js";
import { petService } from "../services/petServices.js";

const addPetController = async (req, res) => {
    try {
        const { error } = petValidator(req.body)
        if (error) {
            return sendError(res, 400, error.details[0].message)
        }
        const petData = { ...req.body, image: req.file ? req.file.filename:null}
        const pet = await petService.addPet(petData)
        return sendSucces(res, 201, "Pet added succesfully", pet)
    }
    catch (error) {
        sendError(res, 400, error.message)
    }
}

const getAllPetsController = async(req,res) => {
    try{
        const allpets = await petService.getAllPets();
        sendSucces(res,200,"Pets fetched successfully",allpets)
    }
    catch(error){
        console.error(error)
        sendError(res,400,error.message)
    }
}

const deletePetController =async(req,res)=>{
    try{
        const {error} = idValidator({id:req.params.id})
        if(error){
            return sendError(res,400,error.details[0].message)
        }
        const result = await petService.deletePet(req.params.id)
        sendSucces(res,200,result.message)
    }
    catch(error){
        console.error(error)
        sendError(res,404,error.message)
    }
}
const updatePetController =async(req,res)=>{

}
const getPetController =async(req,res)=>{
    const {error} = idValidator({id:req.params.id})
    if(error){
      return sendError(res,400,error.details[0].message)
    }
    const pet = await petService.getPet(req.params.id)
    if(!pet){
        return sendError(res,400,"couldn't find pet")
    }
    sendSucces(res,200,"pet fetched successfully",pet)
}

export { addPetController ,getAllPetsController,deletePetController,getPetController,updatePetController}

