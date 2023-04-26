import { ProductosModel } from "../modules/productos.modules.js";
import { UsuarioDao } from '../dao/UsuarioDao.js';
import { sendGmail } from "../notifications/gmail/EmailSender.js";
import { htmlNewUserTemplate } from "../notifications/gmail/htmltemplates/NewUserCreatedTemplate.js";

const userDao = new UsuarioDao();

const home = async(req, res) => {
    const productos = await ProductosModel.find().lean();
    console.log(productos);
    res.render('pages/home', {status: req.session.login, productos});
}

const getSignup = (req, res) => {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/signup', {status: false})
    }
}

const postSignup = async(req,res) => {
    const { body } = req;
    const newUser = await userDao.createUser(body);
    
    if (newUser) {
        const now = new Date();
        const newUserTemplateEmail = htmlNewUserTemplate(newUser._id, now.toLocaleString());
        // Descomentar si has llenado el .env con tu email y password.
        //await sendGmail('Nuevo usuario creado', newUserTemplateEmail);
        res.status(200).json({"success": "User added with ID " + newUser._id})
    } else {
        res.status(400).json({"error": "there was an error, please verify the body content match the schema"})
    }
    
}

const getLogin = async(req, res) => {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('pages/login', {status: false})
    }
}

const postLogin = async(req, res) => {
    const {user, pass} = req.body;
    const loggedUser = await userDao.loginUser({
        username: user,
        password: pass
    });
    
    if (loggedUser) {
        req.session.login=true;
        res.redirect('/api/usuario')
    } else {
        req.session.login=false;
        res.redirect('/api/usuario/login')
    }
}

const logout = async(req, res) => {
    if (!req.session.login) {
        res.redirect('/api/usuario')
    } else {
        req.session.destroy( (err) => {
            if (err) {
                res.json(err);
            } else {
                res.render('pages/logout', {status: false});
            }
        })
    }
}

export default {home, logout, getSignup, postSignup, getLogin, postLogin};







