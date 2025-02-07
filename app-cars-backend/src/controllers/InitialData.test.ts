import { Request, Response } from "express";
import Models from "../models/model"

const { User, GarageStaff, Garage, GarageOwner } = Models;

export async function TestData(req: Request, res: Response) {
    try {

        const numGarages = Math.floor(Math.random() * 11) + 10; // Between 10 and 20
        const garages = [];

        for (let i = 0; i < numGarages; i++) {
            const owner = new User({
                names: `Owner ${i + 1}`,
                email: `owner${i + 1}@example.com`,
                phoneNumber: `+123456789${i}`,
                password: "hashedpassword",
            });
            await owner.save();

            const garage = new Garage({
                garageName: `Garage ${i + 1}`,
                owner: owner._id,
                location: `Location ${i + 1}`,
                tel: `+123456789${i}`,
                license: `LIC${i + 1}`,
                registrationProof: `REG${i + 1}`,
                workingTime: "8 AM - 6 PM",
            });
            await garage.save();

            const garageOwner = new GarageOwner({ details: owner._id, garage: garage._id });
            await garageOwner.save();

            const mechanics = [];
            const numMechanics = Math.floor(Math.random() * 5) + 1; // 1 to 5 mechanics per garage

            for (let j = 0; j < numMechanics; j++) {
                const mechanic = new User({
                    names: `Mechanic ${i + 1}-${j + 1}`,
                    email: `mechanic${i + 1}-${j + 1}@example.com`,
                    phoneNumber: `+987654321${j}`,
                    password: "hashedpassword",
                });
                await mechanic.save();

                const garageStaff = new GarageStaff({ details: mechanic._id, garage: garage._id });
                await garageStaff.save();
                mechanics.push(garageStaff._id);
            }

            garage.mechanics = mechanics;
            await garage.save();
            garages.push(garage);
        }
        res.status(200).json({ message: "Test data created successfully" });
    } catch (error) {
        console.error("Error creating test data:", error);
        res.status(500).json({ message: "Error creating test data" });
    }
};
