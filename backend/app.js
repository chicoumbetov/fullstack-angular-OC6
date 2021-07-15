const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

const app = express();

// cour - name of database
mongoose.connect('mongodb+srv://chicoumbetov:skypefacebook@cluster0.sb2y0.mongodb.net/cour?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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
// transformer le core de la requests en objet js utilisable
app.use(bodyParser.json());

// gérer la demande POST provenant de l'application front-end
// receive object with data from frontend
// post using from mongo db
app.post('/api/stuff', (req, res, next) => {
  // en ayant supprimé en amont le faux_id envoyé par le front-end
  delete req.body._id;  
  // créez une instance de votre modèle Thing 
  // en lui passant un objet JavaScript contenant toutes les 
  // informations requises du corps de requête analysé
  const thing = new Thing({
    ...req.body
  });
  // save copied info to data base
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});



// middleware avec un groupe d'articles 
// avec le schéma de données spécifique requis par le front-

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

// nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint
app.use('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;
