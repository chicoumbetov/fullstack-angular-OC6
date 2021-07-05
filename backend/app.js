const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// middleware with CORS pour que front 4200 et back 3000 puissent communiquer entre eux.
app.use((req, res, next) => {
    // ces headers permettent: 

    // d'accéder à notre API depuis n'importe quelle origine ( '*' 
    res.setHeader('Access-Control-Allow-Origin', '*');

    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// extraire l'objet JSON de la demande
// transformer le core de la requets en objet js utilisable
app.use(bodyParser.json());

// gérer la demande POST provenant de l'application front-end
// receive object with data from frontend
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    })
});

// middleware avec un groupe d'articles 
// avec le schéma de données spécifique requis par le front-end
app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    // Nous envoyons ensuite ces articles sous la forme de données JSON, 
    // avec un code 200 pour une demande réussie.
    res.status(200).json(stuff);
  });

module.exports = app;