const User = require('../models/User');
const UserSchema = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET;
const saltRounds = parseInt(process.env.BCRYPT_SALT);
const jwt = require('jsonwebtoken');
const ConfirmationToken = require('../models/ConfirmationToken');
const RecoverTokenSchema = require('../schemas/RecoverTokenSchema');
const RecoverToken = require('../models/RecoverToken');
const Email = require('../models/Email');

class UserController {
    static async index(req, res) {
        let page = req.query.page;

        if (isNaN(parseInt(page))) page = 1;

        const users = await User.findAll();
        return users.success ? res.send(users) : res.status(404).send(users)
    };

    static async show(req, res) {
        const id = req.params.id;
        if (isNaN(parseInt(id)))
            return res.status(400).send({ success: false, message: 'Id inválido!' })

        const user = await User.findOne(id);
        return user.success ? res.send(user) : res.status(404).send(user);
    };

    static async create(req, res) {
        const schema = UserSchema.createValidate();
        const { error } = schema.validate(req.body)

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });

        const { name, surname, email, password, tel, birthdate } = req.body;

        let user = {
            name,
            surname,
            email,
            tel,
            birthdate
        }

        const existEmail = await User.findByEmail(email);
        if (existEmail.success && Object.keys(existEmail.user).length)
            return res.status(400).send({ success: false, message: 'Email já cadastrado!' });

        const existTel = await User.findByTel(tel);
        if (existTel.success && Object.keys(existTel.user).length)
            return res.status(400).send({ success: false, message: 'Telefone já cadastrado!' });

        const salt = bcrypt.genSaltSync(saltRounds);
        user.password = bcrypt.hashSync(password, salt);
        user.type = 'A';

        const result = await User.create(user);
        return result.success ? res.send(result) : res.status(404).send(result);
    };

    static async update(req, res) {
        const userSchema = await UserSchema.updateValidate();
        const { error } = userSchema.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });


        const { id, name, surname, email, tel } = req.body;
        let userData = {};

        const user = await User.findOne(id);
        if (user.success && user.user.id && !user.user.is_deleted) {

            if (name && name != user.user.name) userData['name'] = name;
            if (surname && surname != user.user.surname) userData['surname'] = surname;
            if (email && email != user.user.email) {
                const existEmail = await User.findByEmail(email);
                if (existEmail.user && Object.keys(existEmail.user).length)
                    return res.status(409).send({ success: false, message: 'Email já cadastrado!' });
                userData['email'] = email;
            }

            if (tel && tel != user.user.tel) {
                const existTel = await User.findByTel(tel);
                if (existTel.user && Object.keys(existTel.user).length)
                    return res.status(409).send({ success: false, message: 'Telefone já cadastrado!' });
                userData['tel'] = tel;
            }

            const result = Object.keys(userData).length ? await User.update(id, userData) : user;
            return result.success ? res.send(result) : res.status(400).send(result);
        } else return res.status(409).send({ success: false, message: 'Id inválido!' });
    };

    static async delete(req, res) {
        const id = req.params.id;

        if (isNaN(parseInt(id)))
            res.status(400).send({ success: false, message: 'Id inválido!' })

        const user = await User.findOne(id);

        if (user.success && user.user.is_deleted || !user.success)
            res.status(400).send({ success: false, message: 'Usuário não existe!' });

        const result = await User.delete(id);
        return result.success ? res.send(result) : res.status(400).send(result);
    };

    static async login(req, res) {
        const schema = await UserSchema.loginValidate();
        const { error } = schema.validate(req.body)

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });

        const { email, password } = req.body;
        const user = await User.findUserWithPassword(email);

        if (user.success && Object.keys(user.user).length) {
            let isValid = bcrypt.compareSync(password, user.user.password)
            if (isValid) {

                if (!user.user.is_verified)
                    return res.status(403).send({ success: false, message: 'Usuário deve confirmar o email antes de fazer login!', id_user: user.user.id });

                let data = {
                    email: user.user.email,
                    type: user.user.type,
                    id_user: user.user.id,
                    name: user.user.name
                }

                if (data.type == "C") {
                    const client = await User.findClientByUserId(user.user.id);
                    if (client.success && client.client.id) data['id_client'] = client.client.id;
                    else res.status(400).send({ sucess: false, message: 'Não foi possível fazer login!' })
                } else if (data.type == "V") {
                    const salesman = await User.findSalesmanByUserId(user.user.id);
                    if (salesman.success && salesman.salesman.id) data['id_salesman'] = salesman.salesman.id;
                    else res.status(400).send({ sucess: false, message: 'Não foi possível fazer login!' })
                } else {
                    data['id'] = user.user.id;
                }

                const token = jwt.sign(data, secret);
                return res.status(200).send({ success: true, token, data });
            } else return res.status(401).send({ sucess: false, message: 'Senha inválida!' });
        } else return res.status(400).send({ success: false, message: 'E-mail não cadastrado!' });
    }

    static async confirmEmail(req, res) {
        const token = req.query.token;
        const user = await ConfirmationToken.findUserIdByToken(token);

        if (!user.success)
            res.status(400).send(user);

        if (user.user && user.user.id) {
            const result = await User.confirmUser(user.user.id);
            if (result.success) {
                await ConfirmationToken.delete(user.user.id);
                return res.send({ success: true, message: 'Usuário confirmado!' });
            } else return res.status(400).send({ success: false, message: 'Falha ao confirmar usuário!' });
        } else return res.status(400).send({ success: false, message: 'Email não cadastrado!' });
    }

    static async recoverPassword(req, res) {
        const email = req.body.email;
        const recoverSchema = await RecoverTokenSchema.createValidate();
        const { error } = recoverSchema.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });
        const user = await User.findByEmail(email);
        if (!user.success || user.user.is_deleted)
            return res.status(400).send({ success: false, message: 'Usuário inexistente!' });

        const token = await RecoverToken.create(email, user.user.id);
        if (token.success) {
            await Email.recoverPassword(user.user.name, email, token.token);
            res.send({ success: true, message: 'Email de recuperação enviado!' });
        } else res.status(400).send({ success: false, message: 'Falha ao criar token!' });
    }

    static async changePassword(req, res) {
        const token = req.query.token;
        const { password } = req.body;

        const recoverSchema = await RecoverTokenSchema.changeValidate();
        const { error } = recoverSchema.validate(req.body);

        if (error)
            return res.status(400).send({ success: false, message: error.details[0].message });

        const user = await RecoverToken.findUserIdByToken(token);
        if (!user.success)
            return res.status(400).send(user);

        const salt = bcrypt.genSaltSync(saltRounds);
        const newPassword = bcrypt.hashSync(password, salt);

        const result = await User.changePassword(newPassword, user.user.id);
        await RecoverToken.delete(user.user.id);
        return result.success ? res.send(result) : res.status(400).send(result);
    }

    static async resendConfirm(req, res) {
        const id_user = req.body.id_user;

        const user = await User.findOne(id_user);
        if (!user.success)
            return res.status(400).send({ success: false, message: 'Usuário inexistente!' });

        if (user.user.is_verified)
            return res.status(400).send({ success: false, message: 'Usuário já é verificado!' });

        const token = await ConfirmationToken.create(user.user.id, user.user.email);

        if (!token.success)
            return res.status(400).send({ success: false, message: 'Falha ao criar token!' });

        await Email.confirmAccount(user.user.name, user.user.email, token.token)
        return res.send({ success: true, message: 'Email de confirmação enviado!' });
    }

};

module.exports = UserController;