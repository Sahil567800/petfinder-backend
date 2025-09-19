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
    },
    getAllPets: async () => {
        try {
            const allPets = await petModel.find();
            return allPets;
        }
        catch (error) {
            throw new Error("can not fetch pets ", error.message)
        }
    },
    getPet: async (id) => {
        try {
            const pet = await petModel.findById(id)
            return pet
        }
        catch (error) {
            throw new Error("can not find pet by ID "+ error.message)
        }
    },
    deletePet: async (id)=>{
        const deletePet = await petModel.findByIdAndDelete(id)
        if(!deletePet){
            throw new Error('Pet not found')
        }
        return {message:"Pet deleted Successfully"}
    },
    updatePet: async(id,data)=>{
        const updatedpet = await petModel.findByIdAndUpdate(id,data,{new:true})
        return updatedpet 
    }
}