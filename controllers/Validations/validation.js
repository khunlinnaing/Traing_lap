const RegisterValidation=(values) =>{
    var check={};
    if(values.name ==''){
        check.name='Please Enter Your Name.';
    }
    else{
        check.name='';
    }
    if(values.email ==''){
        check.email='Please Enter Your Email.';
    }
    else{
        check.email='';
    }
    if(values.phone ==''){
        check.phone='Please Enter Your Phone';
    }
    else{
        check.phone='';
    }
    if(values.address ==''){
        check.address='Please Enter Your Address';
    }
    else{
        check.address='';
    }
    if(values.city ==''){
        check.city='Please Enter Your City';
    }
    else{
        check.city='';
    }
    if(check.name == '' && check.email=='' && check.phone=='' && check.address == '' && check.city ==''){
        return check.message=0
    }else{
        check.message=1;
        return check;
    }
}
module.exports={
    RegisterValidation
}