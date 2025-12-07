const Car = require("../models/Car");
const path = require("path");

// CREATE car with image upload (store only filename in DB)
exports.createCar = async (req, res) => {
  try {
    // ✅ If request body is an ARRAY → INSERT MANY
    if (Array.isArray(req.body)) {
      const carsWithImages = req.body.map((car, index) => {
        // ✅ Validate images per car
        if (!Array.isArray(car.images) || car.images.length === 0) {
          throw new Error(`Car at index ${index} has no images`);
        }

        return {
          name: car.name,
          brand: car.brand,
          model: car.model,
          pricePerDay: Number(car.pricePerDay),
          seats: Number(car.seats) || 5,
          year: Number(car.year),
          fuelType: car.fuelType || "Petrol",
          transmission: car.transmission || "Automatic",
          status: car.status || "available",
          location: car.location || "Unknown",
          rating: Number(car.rating) || 0,
          images: car.images, // ✅ ARRAY ACCEPTED
        };
      });

      const savedCars = await Car.insertMany(carsWithImages);
      return res.status(201).json({
        message: "Multiple cars inserted successfully",
        total: savedCars.length,
        data: savedCars,
      });
    }

    // ✅ Otherwise → INSERT ONE CAR
    let images = [];

    // Case 1: Uploaded files
    if (req.files && req.files.length > 0) {
      images = req.files.map(f => f.filename);
    }
    // Case 2: Images array
    else if (Array.isArray(req.body.images) && req.body.images.length > 0) {
      images = req.body.images;
    }
    // Case 3: Single image string
    else if (req.body.image) {
      images = [req.body.image];
    }
    // ❌ No images
    else {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const newCarData = {
      name: req.body.name,
      brand: req.body.brand,
      model: req.body.model,
      pricePerDay: Number(req.body.pricePerDay),
      seats: Number(req.body.seats) || 5,
      year: Number(req.body.year),
      fuelType: req.body.fuelType || "Petrol",
      transmission: req.body.transmission || "Automatic",
      status: req.body.status || "available",
      location: req.body.location || "Unknown",
      rating: Number(req.body.rating) || 0,
      images: images,
    };

    const newCar = new Car(newCarData);
    await newCar.save();

    res.status(201).json({
      message: "Single car inserted successfully",
      data: newCar,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// CREATE car with image upload (store only filename in DB)
// exports.createCar = async (req, res) => {
//   try {
//     let images = [];

//     if (req.files && req.files.length > 0) {
//       // Haddii user uu upload gareeyo sawir
//       req.files.forEach(file => {
//         images.push(file.filename); // Magaca file-ka kaliya lagu keydinayo DB
//       });
//     } else {
//       // Haddii sawir la gelin, images array waa faaruq
//       images = [];
//     }

//     const newCarData = {
//       ...req.body,
//       images: images // Kaliya filenames la upload gareeyay
//     };

//     const newCar = new Car(newCarData);
//     await newCar.save();

//     res.status(201).json(newCar);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// GET all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single car
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update car
exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) return res.status(404).json({ message: "Car not found" });
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE car
exports.deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
