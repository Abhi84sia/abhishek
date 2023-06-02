const express = require('express')
const app = express()
const user = require('./schema');




app.get('/details', async (req, res) => {
    try {
        const users = await user.find({});
        console.log(users)

        res.send({
            status: 1,
            message: 'details retrieved',
            users: users,
        })
    } catch (error) {
        console.err()
        res.send({
            status: 0,
            message: 'details not retrieve',
            error: err.message,
        })
    }
})

app.get('/details/:id', async (req, res) => {
    try {
        const userId = req.params.id;
     
        const users = await user.findById(userId);
        console.log(users)
        if (!users) {
            res.send({
                status: 0,
                message: 'user not found',
            })
        } else {
            res.send({
                status: 1,
                message: 'Successfully retrieve user',
                users: users,

            })
        }
    } catch (error) {
        console.error(error)

        res.send({
            status: 0,
            message: 'Error retrieving detail',
            error: err.message,

        })
    }
});


app.post('/create', async (req, res) => {
    try {
        const userData = user(req.body);
        const newUser = await userData.save();
        console.log(newUser);

        res.send({
            status: 1,
            message: 'User created successfully',
            user: newUser,
        });
    } catch (error) {
        console.error(error);

        res.send({
            status: 0,
            message: 'Error creating user',
            error: error.message,
        });
    }
});



app.post('/update/:id', async (req,res)=>{
    try{
        const userId = req.params.id;
        const updatedUsers = req.body;
        console.log(updatedUsers)
        const users = await user.findByIdAndUpdate(userId,updatedUsers, {new:true})
        if (!users){
            res.send({
                status: 0,
                message:'User not found',
            });
        }else{
            res.send({
                status:1,
                message:'Updated sucessfully',
                users:users,
            })
        }
    }catch(err){
        console.error(err)

        res.send({
            status:0,
            message:'Something went wrong',
            error:err.message,
        })
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        const userId = req.params.id;
        const users = await user.findByIdAndRemove(userId)
        console.log(users)
    if(!users){
        res.send({
            status: 0,
            message:'User not found',

        })

    }else{
        res.send({
            status: 0,
            message : 'User deleted sucessfully',
            users:users,
        })
    }
    }catch(error){
        console.error(error)
        res.send({
            status: 0,
            message:'error on deleting user',
            error : err.message,
        })
    }
});
module.exports = app;