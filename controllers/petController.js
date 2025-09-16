import { sendError, sendSucces } from "../helper/response.js";
import { petValidator } from "../helper/validator.js";
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

export { addPetController }