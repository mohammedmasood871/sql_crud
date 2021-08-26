const { decodeBase64 } = require("bcryptjs");
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, passport,db) {
    


    app.post("/login", passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    }), function(req, res, info){
        res.render('login',);   
    });

    app.get('/', (req,res) =>{
        res.render('login.ejs')
    })
    
    app.get('/dashboard',isLoggedIn, (req, res) =>{
    db.query('SELECT * From user' , (e, dat) =>{
        console.log(req.user)

        console.log(dat)
        res.render('dashboard.ejs', {data:dat, message:'', user:req.user.username, role:req.user.role})

    })
    })


    //  post call for user signup

    app.post('/signup', isLoggedIn,(req,res) =>{
        var password =  bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
        var values = [  
            [req.body.username, req.body.email, password, 'Superadmin'],  
            
            ];  
        db.query('INSERT INTO `user` (username, email, password, role) VALUES (?)' , values,(e, dat) =>{
            console.log("inserted successfully")

            res.redirect('/')
    
        })

    })



    // post call for user signup

    //updating user

    app.post('/update' , isLoggedIn,(req,res) =>{
        db.query('UPDATE `user` set role = ?  WHERE id = ?' , [req.body.role, req.body.id],(e, dat) =>{
            console.log("Updated successfully")

            res.redirect('/dashboard')
    
        })
    })



    // updating user


    app.post('/delete' ,isLoggedIn, (req,res) =>{
        db.query('DELETE FROM `user` WHERE id = ? ' , req.body.id,(e, dat) =>{
            console.log("Updated successfully")

            res.redirect('/dashboard')
    
        })
    })

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
      });
}

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}