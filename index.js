/*Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/

//Vincent Shi; Period 7/8; Even

/*Reflections
The program communicate with each other through the get requests and the constant array genres and date. 
When one method changes certain information of the array, we can use the get requests to check the information changed via post, put, and delete requests. 
The information that is being obtained and changed is from the constant arrays below. 

In this project, I have learned how to utilize basic http backend requests and how to create a basic backend that sets the foundation for future, bigger projects.
In addition to the http requests, I have also learned the important of node and express in creating a function program. 
Without installing node or express, this entire program would not be able to run.


This project can be further extended by creating a better output value for the get requests. When you get a value inside the array, it would include the entire object inside (id, name). 
In a real world situation, we just wanted specific information. In this case, we just wanted the genre names and not really the id. 
*/
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id:1, name: "Pop"},
    {id:2, name: "Classical"},
    {id:3, name: "Rap"},
    {id:4, name: "Hip Hop"}
];

const date =[
    {name: "Light-Switch", year:"2022",month:"Janurary"},
    {name: "Für Elise", year:"1867",month:"April"},
    {name: "Lucid-Dream", year:"2018",month:"May"},
    {name: "Mockingbird", year:"2005",month:"April"}
];
//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get('/',(req,res)=>{
    res.send("Welcome to the best song app in the world!");
});
app.get('/api/genres',(req,res)=>{
    res.send(genres);
});

app.get('/api/genres/:id',(req,res)=>{
    const gen = genres.find(c=> c.id === parseInt(req.params.id));
    if(!gen){
        res.status(404).send("The genre with the given ID was not found");
        return
    }
    res.send(gen);
});

//date route for songs

app.get('/api/date',(req,res)=>{
    res.send(date);
})
app.get('/api/date/:name',(req,res)=>{
    const gen = date.find(c=> c.name === String(req.params.name));
    if(!gen){
        res.status(404).send("The genre with the given ID was not found");
        return
    }
    res.send(gen);
});


//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/genres',(req,res)=>{
    if(req.body.name.length > 2){
        const gen={
            id:genres.length +1,
            name: req.body.name
        }
        genres.push(gen);
        res.send(gen);
    }
    else{
        res.send("The genre name should have at least 3 characters.");
    }
});




//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/genres/:id', (req,res)=>{
    const gen = genres.find(c => c.id === parseInt(req.params.id));
    if(!gen){
        res.status(404).send('The genre with the given ID was not found');
        return
    }
    if(req.body.length > 2){
        res.status(404).send('name of the character should be at least three, or more characters long');
        return
    }
    const pos = genres.findIndex(c => c.id === parseInt(req.params.id));
    const put = {
        id:req.params.id,
        name:req.body.name
    };
    genres[pos] = put;
    res.status(200).send(put);
});



//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/genres/:id', (req,res)=>{
    const gen = genres.find(c =>c.id === parseInt(req.params.id));
    if(!gen){
        res.status(404).send("The genre with the given ID was not found");
        return
    }
    const pos = genres.findIndex(c => c.id === parseInt(req.params.id));
    genres.splice(pos,1);
    res.send(genres[pos]);
});



app.listen(3000, ()=>{
    console.log('Listening on port 3000')
});
