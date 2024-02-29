
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));


// ****************************************** Connexion à la session depuis un formulaire ****************************************

app.post('/login', async (req, res) => {
  const { email , password } = req.body;


  /////////////////////////\ Vérification de l'existance de l'utilisateur existe dans la base de données /\\\\\\\\\\\\\\\\\\\\\\\\

  const user = await prisma.Users.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }


  /////////////////////////////////////////////\ Vérification du mot de passe /\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }


  ///////////////////////////////////\ Connecter l'utilisateur en créant une session /\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  req.session.user = { id: user.id, email: user.email };
  res.json({ message: 'Connexion réussie' });
});

// *************************************** Vérifie l'état de la session utilisateur **********************************************


app.get('/check-session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

//*********************************************** Déconnexion utilisateur ********************************************************


app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Déconnexion réussie' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});