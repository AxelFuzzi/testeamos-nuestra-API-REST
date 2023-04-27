import { ProductoDao } from '../src/dao/ProductoDao.js';
import { UsuarioDao } from '../src/dao/UsuarioDao.js';
import mongoose from 'mongoose';

import {strict as assert} from 'assert';

mongoose.connect("mongodb+srv://coderUser:123@cluster0.ldzjuyz.mongodb.net/DBtesting?retryWrites=true&w=majority")
const productoDao = new ProductoDao();
const userDao = new UsuarioDao(); 

describe('Test generados del productDAO', ()=>{

    it('El DAO debe obtener a los usuarios en formato de array', async function(){
        const result = await productoDao.getAll();
        //console.log(result);
        assert.ok(result);
        assert.strictEqual(Array.isArray(result), true);
    })
})

describe('Test generados de UserDao', ()=>{

    it('El DAO debe generar un usuario e insertarlo en la DB', async function(){
        const genericUser = {
            username:'user',
            email:'user@gmail.com',
            password:'123'
        }
        const result = await userDao.createUser(genericUser);
        assert.ok(result._id);
    })
})