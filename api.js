const client = require('./connection')
const express = require('express')
const app = express()
const parser = require('body-parser')
app.use(parser.json())

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})


//#1 get method from database with db commands
app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
client.connect();





//#2 get by id method with db commands
app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


//#3  add user to database 
app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, name, lastName,  dob) 
                       values(${user.id}, '${user.name}','${user.lastName}','${user.dob}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Add user was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

//update users db
app.put('/users/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set name = '${user.name}',
                       lastName = '${user.lastName}'
                       dob = '${user.dob}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update user was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})





//#4 delete by id with db commands 
app.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Delete user was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
