const express = require('express');

const app = express();

// middleware
app.use((req, res, next) => {
    console.log('Requête reçue !')
    next();
})

// middleware - ajout un code d'état 201 à la reponse
app.use((req, res, next) => {
    res.status(201);
    next();
})

// middleware - envoie la réponse 201
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
    next();
});

// middleware - enregistre "Réponse enovyée avec succès !"
app.use((req, res) => {
    console.log('Réponse envoyée avec succés !');
});

module.exports = app;