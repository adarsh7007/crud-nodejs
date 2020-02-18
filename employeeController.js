
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee =require('./employee-model.js');
//const Employee = mongoose.model('employee')


router.get('/',function (req, res){
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    })
});

router.post('/', (req, res) => {
    console.log('body',req.body);
    if (!req.body._id){
        insertRecord(req, res);
    }
        else(req.body._id)
        updateRecord(req, res); 
    
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.number = req.body.number;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) =>{
        if (!err) { 
            console.log('..............');
            res.redirect('employee/list');
         }
        else {
            console.log('..............' + err);
            if (err.name == 'ValidationError') 
            {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", 
                {
                    viewTitle: 'Update Employee',
                    employee: req.body
                })
            }
            else
            
                console.log('Error during record update : ' + err);
        
    }
});
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        console.log('console')
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    })
})


module.exports = router;
