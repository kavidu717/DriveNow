import Vehicle from "../models/vehicleModel";

export const createVehicle = async (req, res) => {
    try{
    
        const vehicle=await Vehicle.create(...req.body)

        res.status(200)
        .json({
            success:"true",
            vehicle
        })


    }catch(error){
        res.status(500)
        .json({
            message:error.message
        })
    }
}