import Vehicle from "../models/vehicleModel.js";

export const createVehicle = async (req, res) => {
    try{
    
        const vehicle=await Vehicle.create(req.body)

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

export const getAllVehicles = async (req, res) => {
  try {
    const { type, brand } = req.query;

    let filter = {};

    if (type) {
      filter.type = type;
    }

    if (brand) {
      filter.brand = brand;
    }

   

    const vehicles = await Vehicle.find(filter).sort("-createdAt");

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getSingleVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};