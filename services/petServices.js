import { petModel } from "../models/petModel.js"

export const petService = {
    addPet: async (petData) => {
        try {
            const pet = new petModel(petData);
            await pet.save()
            return pet;
        }
        catch (error) {
            throw new Error("error adding pet" + error.message)
        }
    }
}