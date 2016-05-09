var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
var User = require('../../model/user.model');
var jwt = require('../../services/jwt.js');
// routes
router.post('/authenticate', authenticateUser); //ok
router.post('/register', registerUser); 
router.get('/current', getCurrentUser);
router.get('/:login', getUser); 
// router.put('/:_id', updateUser);
// router.delete('/:_id', deleteUser);
router.get('/', getUsers);
module.exports = router;

function authenticateUser(req, res) {
    userService.authenticate(req.body.login, req.body.password)
          .then(function (user) {

            var payload = {
                iss: req.hostname,
                sub: user._id
            }
            var token = jwt.encode(payload, "secret");
            res.status(200).send({
                user: user,
                token: token
            });
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function helloWorld(req, res) {
    res.send('helloWorld');
}


function registerUser(req, res) {
        newUser = new User;
        
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.login = req.body.login;
        newUser.password = req.body.password;
        newUser.coin = JSON.stringify(req.body.coin);

        userService.create(newUser)
        .then(function () {
            var payload = {
                iss: req.hostname,
                sub: newUser._id
            }
            var token = jwt.encode(payload, "secret");
            res.status(200).send({
                user: newUser,
                token: token
            });
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getUsers(req, res) {
getUsers()
        .then(function (users) {
            if(users){
                console.log("teste");
                res.send(users);
            }
            res.sendStatus(200);
        })

}



function getCurrentUser(req, res) {
    userService.getByLogin(req.params.login)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getUser(req, res) {
    userService.getByLogin(req.params.login)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

