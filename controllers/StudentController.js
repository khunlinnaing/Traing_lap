const db= require('../DBConnection/connector');
const {RegisterValidation} = require('./Validations/validation');
const Register=(req, res) =>{
    var check= RegisterValidation(req.body);
    if(check.message!=0) res.json({Message: check, status:0});
    db.query('Select * from Student Where email=? or phone=?',[req.body.email, req.body.phone], (error, data)=>{
        if(data) return res.json({message:'email or phone is already exit.', status: 0});
        const q='Insert into Student(name, email, phone, address, city) values(?)';
        const values= [req.body.name, req.body.email, req.body.phone, req.body.address, req.body.city];
        db.query(q,[values], (err, data)=>{
            if(err) return res.json({message: 'something Error'+err, status: 0});
            return res.json({message: 'Create is successful', status: 1});
        });
    });
}
const Student = (req,res) =>{
    db.query('select * from Student', (error, data) =>{
        if(error) return res.json({message: 'Something Error From Database', status: 0});
        return res.json({data: data, status: 1});
    });
}

const StudentDetail = (req, res) =>{
    if(!req.query.studentid) return res.json({message: 'Please Enter Your Student Id in url', status: 0});
    db.query('select * from Student Where id=?',[req.query.studentid], (error, data) =>{
        if(error) return res.json({message: 'Something Error From DataBase', status: 0});
        if(data =='') return res.json({message: 'Student is not Foune', status: 0});
        return res.json({data: data[0], status: 1});
    });
}
const Update =(req, res) =>{
    if(!req.query.studentid) return res.json({message: 'Please Enter Your Student Id in url', status: 0});
    
    db.query('select email, phone from Student Where NOT id=?',[ req.query.studentid], (error, data) =>{
        if(error) return res.send(error);
        var check_email=data.filter(item => item.email === req.body.email);
        var check_phone=data.filter(item => item.phone === req.body.phone);
        if(check_email !='') return res.json({message:'email is already exit.', status: 0});
        if(check_phone !='') return res.json({message:'phone is already exit.', status: 0});
        db.query('select * from Student Where id=?',[req.query.studentid], (error, data) =>{
            var validate= RegisterValidation(req.body);
            if(validate!= 0) {
                res.send({Message: validate, status:0});
            }else if(error){
                 return res.json({message: 'Something Error From DataBase', status: 0});
            }else if(data ==''){
                return res.json({message: 'Student is not Foune', status: 0});
            }else{
                db.query('Update Student set name=?,email=?, phone=?, address=?, city=? Where id=?',[req.body.name, req.body.email, req.body.phone, req.body.address, req.body.city, req.query.studentid], (error, data) =>{
                    if(error) return res.json({message: 'Something Error From DataBase', status: 0});
                    return res.json({message: 'Update is Successfully', status: 1});
                });
            }
        });
    });    
}
const Delete=(req, res) =>{
    if(!req.query.studentid) return res.json({message: 'Please Enter Your Student Id in url', status: 0});
    db.query('select * from Student Where id=?',[req.query.studentid], (error, data) =>{
        if(error) return res.json({message: 'Something Error From DataBase', status: 0});
        if(data =='') return res.json({message: 'Student is not found.', status: 0});
        db.query("Delete FROM Student WHERE id=?", [req.query.studentid], (err,val) =>{
            if(err) return res.json('err');
            return res.json({ message: `delete is successful`, status: 1});
        });
    });
}
module.exports={
    Register,
    Student,
    StudentDetail,
    Update,
    Delete
}