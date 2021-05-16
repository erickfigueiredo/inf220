const Vehicle = require('../models/Vehicle')
const Deliveryman = require('../models/User');

class VehicleController {
    static async index(req, res) {
        const id_user = req.params.id_client
        if (isNaN(parseInt(id_client))) {
            res
                .status(404)
                .send({ success: false, message: 'id de usuário inválido!' })
            return
        }
        const vehicle = await Vehicle.findAll(id_client)
        vehicle.success ? res.send(vehicle) : res.status(404).send(vehicle)
    }

    static async show(req, res) {
        const id_vehicle = req.params.id_vehicle

        if (isNaN(parseInt(id_vehicle))) {
            res.status(404).send({ success: false, message: 'id inválido!' })
            return
        }

        const vehicle = await Vehicle.findOne(id_vehicle)
        vehicle.success ? res.send(vehicle) : res.status(404).send(vehicle)
    }

    static async create(req, res) {
        const { alias, license_plate, id_deliveryman } = req.body;

        const deliveryman = await Deliveryman.findOne(id_deliveryman);
        if (!deliveryman.success) return res.status(400).send(deliveryman);

        const result = await Vehicle.create({ alias, license_plate, id_deliveryman});
        result.success ? res.send(result) : res.status(400).send(result)
    }

    static async update(req, res) {
        const {
            alias,
            license_plate,
            id_vehicle
        } = req.body

        const vehicle = await Vehicle.findOne(id_vehicle)
        if (vehicle.success) {
            const vehicle = await Vehicle.update({alias, license_plate}, id_vehicle)
            return vehicle.success ? res.send(vehicle) : res.status(400).send(vehicle)
        } else res.status(400).send(vehicle)
    }
}

module.exports = VehicleController