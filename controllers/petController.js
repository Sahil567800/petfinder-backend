import { sendError, sendSucces } from "../helper/response.js";
import { petValidator, idValidator, updatePetValidator } from "../helper/validator.js";
import { petService } from "../services/petServices.js";

const addPetController = async (req, res) => {
    try {
        const { error } = petValidator(req.body)
        if (error) {
            return sendError(res, 400, error.details[0].message)
        }
        if (!req.file) {
            return sendError(res, 400, "Image is required");
        }
        const petData = { ...req.body, image: req.file.filename}
        const pet = await petService.addPet(petData)
        return sendSucces(res, 201, "Pet added succesfully", pet)
    }
    catch (error) {
        sendError(res, 400, error.message)
    }
}

const getAllPetsController = async (req, res) => {
    try {
        const allpets = await petService.getAllPets();
        sendSucces(res, 200, "Pets fetched successfully", allpets)
    }
    catch (error) {
        console.error(error)
        sendError(res, 400, error.message)
    }
}

const deletePetController = async (req, res) => {
    try {
        const { error } = idValidator({ id: req.params.id })
        if (error) {
            return sendError(res, 400, error.details[0].message)
        }
        const result = await petService.deletePet(req.params.id)
        sendSucces(res, 200, result.message)
    }
    catch (error) {
        console.error(error)
        sendError(res, 404, error.message)
    }
}
const updatePetController = async (req, res) => {
    try {
        const { error: idError } = idValidator({ id: req.params.id })
        if (idError) {
          return sendError(res, 400, "Invalid pet ID")
        }
        const { error: bodyError } = updatePetValidator(req.body)
        if (bodyError) {
           return sendError(res, 400, bodyError.details[0].message)
        }

         const updateData = { 
            ...req.body, 
            ...(req.file && { image: req.file.filename }) 
        };
        const updatedPet = await petService.updatePet(req.params.id, updateData)
        if (!updatedPet) {
          return sendError(res, 404, "Pet not found")
        }
        sendSucces(res, 200, "Pet updated successfully", updatedPet);
    }
    catch (error) {
        console.error(error.message)
        sendError(res, 400, error.message)
    }
}
const getPetController = async (req, res) => {
    const { error } = idValidator({ id: req.params.id })
    if (error) {
        return sendError(res, 400, error.details[0].message)
    }
    const pet = await petService.getPet(req.params.id)
    if (!pet) {
        return sendError(res, 400, "couldn't find pet")
    }
    sendSucces(res, 200, "pet fetched successfully", pet)
}

export { addPetController, getAllPetsController, deletePetController, getPetController, updatePetController }

