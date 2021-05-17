const Vehicle = require('../models/Vehicle')
const Deliveryman = require('../models/User');

class VehicleController {
    static async index(req, res) {
        const id_deliveryman = req.params.id_deliveryman;
        if (isNaN(parseInt(id_deliveryman))) {
            return res.status(404).send({ success: false, message: 'id de usuário inválido!' })
        }
        const vehicle = await Vehicle.findAll(id_deliveryman)
        vehicle.success ? res.send(vehicle) : res.status(404).send(vehicle)
    }

    static async show(req, res) {
        const id = req.params.id

        if (isNaN(parseInt(id))) {
            res.status(404).send({ success: false, message: 'id inválido!' })
            return
        }

        const vehicle = await Vehicle.findOne(id)
        vehicle.success ? res.send(vehicle) : res.status(404).send(vehicle)
    }

    static async create(req, res) {
        const { alias, license_plate, id_deliveryman } = req.body;

        const deliveryman = await Deliveryman.findOne(id_deliveryman);
        if (!deliveryman.success) return res.status(400).send(deliveryman);

        const data = { alias, id_deliveryman};
        if(license_plate) data.license_plate = license_plate;

        const result = await Vehicle.create(data);
        result.success ? res.send(result) : res.status(400).send(result)
    }

    static async update(req, res) {
        const {
            alias,
            license_plate,
            id
        } = req.body

        const vehicle = await Vehicle.findOne(id)
        if (vehicle.success) {
            const vehicle = await Vehicle.update({alias, license_plate}, id)
            return vehicle.success ? res.send(vehicle) : res.status(400).send(vehicle)
        } else res.status(404).send(vehicle)
    }
}

module.exports = VehicleController