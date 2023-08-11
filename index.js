const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    fs = require('fs'),  
    path = require('path'),
    uuid = require('uuid');

let users =[
    
]

let topMovies = [
    {
        title: 'The Boondock Saints',
        director: 'Troy Duffy',
        stars: [ 'Willem Dafoe', 'Sean Patrick Flanery', 'Norman Reedus', 'David Della Rocco'],
        year: '1999'
    },

    {
        title: 'Fight Club',
        director: 'David Fincher',
        stars: ['Brad Pitt', 'Edward Norton', 'Meat Loaf', 'Zack Grenier'],
        year: '1999'
    },

    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        stars: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
        year: '1994'
    },

    {
        title: 'Inglourious Basterds',
        director: 'Quentin Tarantino',
        stars: ['Brad Pitt', 'Diane Kruger', 'Eli Roth', 'Mélanie Laurent'],
        year: '2009'
    },

    {
        title: 'Snatch',
        director: 'Guy Ritchie',
        stars:['Jason Statham', 'Brad Pitt', 'Stephen Graham', 'Vinnie Jones'],
        year: '2000'
    },

    {
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        stars: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Diane Keaton'],
        year: '1972'
    },

    {
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        stars: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
        year: '1994'
    },

    {
        title: 'Teenage Mutant Ninja Turtles',
        director: 'Steve Barron',
        stars:['Judith Hoag', 'Elias Koteas', 'David Forman'],//add more stars 
        year: '1990'
    },

    {
        title: 'GoldenEye',
        director: 'Martin Campbell',
        stars:['Pierce Brosnan', 'Sean Bean', 'Izabella Scorupco', 'Framke Janssen'],
        year: '1995'
    },

    {
        title: 'Deadpool',
        director: 'Tim Miller',
        stars:['Ryan Reynolds', 'Morena Baccarin', 'T.J. Miller', 'Ed Skrein'],
        year: '2016'
    }
]


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));

app.get('/movies', (req, res) => {res.json(topMovies)});

app.get('/', (req, res) => {res.send('Welcome to Jude Knows Movies or JKM for short!')});

app.listen(8080,() => {
    console.log('this app is listening on port 8080')
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh Oh, Spagettioes!');
  });
