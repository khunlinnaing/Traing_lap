const express = require('express');
const {Register, Student, StudentDetail, Update, Delete} = require('../controllers/StudentController');
const route = express.Router();
route.post('/', Register);
route.get('/', Student);
route.get('/detail', StudentDetail);
route.put('/', Update);
route.delete('/', Delete);
module.exports = route;