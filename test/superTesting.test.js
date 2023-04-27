import chai, { expect } from 'chai';
import supertest from 'supertest';

const expext = chai.expect;
const requester = supertest('http://localHost:8080');

describe('Pruebas de integracion con servidor completo',()=>{

    it('El endpoint POST debe registrar correctamente un usuario',async function(){
        const testUser = {
            username:'user2',
            email:'user2@gmail.com',
            password:'123'
        }
        //const response = await requester.post('/api/usuario/signup').send(testUser);//si no hay archivos involucrados
        //expect(response.status).to.be.equal(200);
    })
})