const express = require('express');
const port = 8080;
const path = require('path');


const db = require('./config/mongoose');
const Contacts = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('assets'));

// Using inbuilt mmiddleware
app.use(express.urlencoded());  //app.use() --> used to access middleware as parser is a middleware


//defining custom middleware 

app.use(function (request, response, next) {
    console.log("from middleware 1");
    next();
}); //here by default first 3 arguments are request,response,next...


var contactList = [
    {
        'name': 'Abhimanyu',
        'phone': 9971199353
    },
    {
        'name': 'Arun',
        'phone': 9818297875
    },
    {
        'name': 'Madhu',
        'phone': 9350885502
    },
    {
        'name': 'Rahul',
        'phone': 9999077541
    },
    {
        'name': 'Govind Prasad',
        'phone': 9313876777
    }
];

app.get('/', function (request, response) {

    Contacts.find(
        //{name:"Mridula"},
        {},
        function(err,contacts){
            if(err){
                console.log(`${err} in finding`);
                return;
            }
            else{
                return response.render('home', {
                    contact_list: contacts
                });

            }
        }
    );
});

app.get('/practice', function (request, response) {
    return response.render('practice', { 'title': "Practice Page" });
})


// for querry params
// app.get('/delete',function(req,response){
//     console.log(req.querry);
//     console.log(req.querry.phone);
//     console.log(req.querry.name);

// });

//for string param
app.get('/delete/:id', function (req, response) {
    console.log(req.params);
    let id = req.params.id;

    Contacts.findByIdAndDelete(id,function(err){
        if(err){
            console.log(`${err} in deleting`);
            return;
        }
        else{
            console.log("Sucesfully deleted document with id "+id);
        }
    });
    //let index = contactList.findIndex(find = (contact) => contact.phone == phone);
    //console.log(index);
    //if (index != -1) {
    //    contactList.splice(index, 1);
    //}
    return response.redirect('back');   
});

app.post('/create-contact', function (request, response) {
    console.log(request.body);
    //contactList.push(request.body);
    //return response.redirect('/');
    Contacts.create({
        name: request.body.name,
        phone: request.body.phone
    },
        function (err, newContact) {
            if (err) { console.log(`${err} in creating contact`); return; }
        
            else {
                console.log(`********* new contact created ${newContact}`);
            }
        }
    );

    // we can also use url as 'back' using this we can be redirected to the previous page
    return response.redirect('back');
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log("Server Started at port ", port);
    }
});