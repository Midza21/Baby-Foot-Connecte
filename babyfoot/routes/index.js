var express = require("express");
var router = express.Router();
<<<<<<< HEAD
const  { PrismaClient } =  require("@prisma/client") 
const  {createHmac} = require('node:crypto');
const { empty } = require('@prisma/client/runtime/library');
const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');

const prisma = new PrismaClient();

// Connexion à la page de Connexion de l'application

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Connexion' });
});


=======
const { PrismaClient } = require("@prisma/client");
const { createHmac } = require("node:crypto");
const { empty } = require("@prisma/client/runtime/library");

const prisma = new PrismaClient();

>>>>>>> origin/Wael
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

<<<<<<< HEAD
// Connexion à la page de Connexion de l'application

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Connexion' });
});

// Retourne tous les users de la base
router.get("/get_users", async (req, res) => {
  const allUsers = await prisma.user.findMany({});
  res.status(200).json(allUsers);
=======
// Retourne a la vue classement
router.get("/classement", async (req, res) => {
  try {
    const topUsers = await prisma.user.findMany({
      orderBy: {
        victoires: "desc", // Tri par ordre décroissant des victoires
      },
      take: 10, // Limiter les résultats aux 10 premiers utilisateurs
    });
    res.render("classement", { user: topUsers }); // Rendre la vue avec les 10 premiers utilisateurs
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// retourne a la vue admin

router.get("/admin", function (req, res, next) {
  res.render("admin", { title: "Express" });
});

//retourne a la vue supprimer pour l'admin
router.get("/utilisateur_supprimer", function (req, res, next) {
  res.render("utilisateur_supprimer", { title: "Express" });
});

//retourne a la vue modifier pour l'admin
router.get("/utilisateur_modifier", function (req, res, next) {
  res.render("utilisateur_modifier", { title: "Express" });
});

router.get("/joueurs", function (req, res, next) {
  res.render("joueurs", { title: "Express" });
});

router.get("/creategame", function (req, res, next) {
  res.render("creategame", { title: "Express" });
});

//retourne a la vue voir pour l'admin
router.get("/voir_utilisateur", function (req, res, next) {
  res.render("voir_utilisateur", { title: "Express" });
});

//retourne a la vue voir les partie
router.get("/voir_partie", function (req, res, next) {
  res.render("voir_partie", { title: "Express" });
>>>>>>> origin/Wael
});

// Retourne tous les Parties de la base
router.get("/get_games", async (req, res) => {
  const allGames = await prisma.game.findMany({});
  res.status(200).json(allGames);
});

// POST route to handle goal scoring from Arduino
router.post('/goal', (req, res) => {
  const { buts } = 1;
  console.log('Goal scored:', buts);
  // Add your logic to handle the goal scoring event here
  res.status(200).json({ message: 'Goal scored successfully' });
});


//---------------------------------------------------- Wael

// Retourne tous les Babyfoot de la base
router.get("/get_babyfoots", async (req, res) => {
  const allBabyfoot = await prisma.babyfoot.findMany({});
  res.status(200).json(allBabyfoot);
});

// Retourne tous les Babyfoot de la base
router.get("/get_user", async (req, res) => {
  const allUser = await prisma.user.findMany({});
  res.status(200).json(allUser);
});

// Retourne l'utilisateur avec l'id spécifié
router.get("/get_user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
});

// Route pour afficher les détails d'une partie individuelle
router.get("/game/:id", async (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);
    const gameDetails = await prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!gameDetails) {
      // Handle the case where the game details are not found
      return res.status(404).json({ error: "Game not found" });
    }

    // Récupérez les détails des adversaires à partir des identifiants d'utilisateurs
    const adversaire1Details = await prisma.user.findUnique({
      where: { id: gameDetails.adversaire1 },
    });

    const adversaire2Details = await prisma.user.findUnique({
      where: { id: gameDetails.adversaire2 },
    });

    if (!adversaire1Details || !adversaire2Details) {
      // Handle the case where user details are not found
      return res.status(404).json({ error: "User details not found" });
    }

    res.render("game", {
      gameDetails,
      adversaire1Details,
      adversaire2Details,
    });
    // Utilisez le nom de votre fichier EJS
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la partie:", error);
    res.status(500).json({
      erreur:
        "Erreur lors de la récupération des détails de la partie",
    });
  }
});


// Retourne tous les utilisateurs de la base
router.get("/get_users", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({});
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Crée un nouveau user avec les données du formulaire
router.post("/new_user", async (req, res) => {
  const { nom, email, mot_de_passe } = req.body; // Utilisez mot_de_passe au lieu de password
  const hashedPassword = createHmac("sha256", mot_de_passe)
    .update("I love cupcakes")
    .digest("hex");

  const result = await prisma.user.create({
    data: {
      nom: nom,
<<<<<<< HEAD
      email : email,
      password: password 
      ? createHmac('sha256', password).update('667 Ekip !').digest('hex') :"",  
      role: "joueur", 
=======
      email: email,
      password: hashedPassword, // Utilisez le mot de passe haché ici
>>>>>>> origin/Wael
    },
  });
  res.json(result);
});

<<<<<<< HEAD

=======
>>>>>>> origin/Wael
// Crée un nouveau Game avec les données du formulaire
router.post("/new_game", async (req, res) => {
  try{
  const { adversaire1, adversaire2 } = req.body;
  const result = await prisma.game.create({
    data: {
      adversaire1: adversaire1,
      adversaire2: adversaire2,
    },
  });
  res.status(201).json(result);  // Supposons que result contient la partie nouvellement créée
} catch (error) {
  console.error("Erreur lors de la création de la partie:", error);
  res.status(500).json({ erreur: "Erreur lors de la création de la partie" });
}
});

// Supprimer un user avec son ID
router.delete("/delete_user/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const userExist = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExist) {
      return res.status(404).json({ erreur: "User non trouvée" });
    } else {
      await prisma.user.delete({
        where: { id: userId },
      });
      res.status(200).json(userExist);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la suppression du user" });
  }
});

// Supprimer une Partie avec son ID
router.delete("/delete_game/:id", async (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);
    const gameExist = await prisma.game.findUnique({
      where: { id: gameId },
    });
    if (!gameExist) {
      return res.status(404).json({ erreur: "Partie non trouvée" });
    }
    await prisma.game.delete({
      where: { id: gameId },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la suppression de la partie" });
  }
});


<<<<<<< HEAD
// Supprimer une Partie avec son ID
router.delete("/delete_game/:id", async (req, res) => {
    try {
        const gameId = parseInt(req.params.id, 10);
        const gameExist = await prisma.games.findUnique({
          where : {id: gameId},
      });
      if(! gameExist)
      {
        return res.status(404).json({ erreur: 'Partie non trouvée' });
      }
      await prisma.games.delete({
        where: { id: gameId },
      });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la suppression de la partie' });
    }
  });

  // Supprimer une entité avec son ID
router.delete("/delete_babyfoot/:id", async (req, res) => {
    try {
        const babyfootId = parseInt(req.params.id, 10);
        const babyfootExist = await prisma.babyfoot.findUnique({
          where : {id: babyfootId},
      });
      if(! babyfootExist)
      {
        return res.status(404).json({ erreur: 'Babyfoot non trouvée' });
      }
      await prisma.babyfoot.delete({
        where: { id: babyfootId },
      });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la suppression du babyfoot' });
    }
  });

// Mettre à jour son babyfoot par son Id
router.put("/update_babyfoot/:id", async (req, res) => {
  
=======
// Mettre à jour un user par son Id
router.put("/update_user/:id", async (req, res) => {
>>>>>>> origin/Wael
  try {
    const userId = parseInt(req.params.id, 10);
    const { nom, email, password } = req.body;

    const userExist = await prisma.user.findUnique({
      where: { Id: userId },
    });
    if (!userExist) {
      return res.status(404).json({ erreur: "User non trouvée" });
    }

    const userUpdate = await prisma.user.update({
      where: { id: userId },
      data: {
        nom,
        email,
        password,
      },
    });

    res.status(200).json(userUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la mise à jour du user" });
  }
});

// Mettre à jour un user par son Id
router.put("/update_useradmin/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { nom, email, password, buts, victoires, role } = req.body;

    const userExist = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExist) {
      return res.status(404).json({ erreur: "User non trouvée" });
    }

    const userUpdate = await prisma.user.update({
      where: { id: userId },
      data: {
        nom,
        email,
        password,
        buts,
        victoires,
        role,
      },
    });

    res.status(200).json(userUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la mise à jour du user" });
  }
});

// Mettre à jour game par son Id
router.put("/update_game/:id", async (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);
    const { adversaire1, adversaire2, score1, score2, babyfoot, etat } =
      req.body;

    const gameExist = await prisma.game.findUnique({
      where: { Id: gameId },
    });
    if (!gameExist) {
      return res.status(404).json({ erreur: "game non trouvée" });
    }

    const gameUpdate = await prisma.game.update({
      where: { id: gameId },
      data: {
        adversaire1,
        adversaire2,
        score1,
        score2,
        babyfoot,
        etat,
      },
    });

    res.status(200).json(gameUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la mise à jour du game" });
  }
});

// Mettre à jour Babyfoot par son Id
router.put("/update_babyfoot/:id", async (req, res) => {
  try {
      const babyfootId = parseInt(req.params.id, 10);
      const { localisation } = req.body;

      const babyfootExist = await prisma.babyfoot.findUnique({
          where: { id: babyfootId },
      });

      if (!babyfootExist) {
          return res.status(404).json({ erreur: 'Babyfoot non trouvé' });
      }

      const babyfootUpdate = await prisma.babyfoot.update({
          where: { id: babyfootId },
          data: { localisation },
      });

      res.status(200).json(babyfootUpdate);
  } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la mise à jour du Babyfoot' });
  }
});
// Créer un UserGame
router.post("/create_usergame", async (req, res) => {
  try {
      const { userId, gameId, role } = req.body;

      const newUserGame = await prisma.userGame.create({
          data: {
              userId,
              gameId,
              role,
          },
      });

      res.status(201).json(newUserGame);
  } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la création du UserGame' });
  }
});

// Lire un UserGame par son Id
router.get("/read_usergame/:userId/:gameId", async (req, res) => {
  try {
      const { userId, gameId } = req.params;

      const userGame = await prisma.userGame.findUnique({
          where: { userId_gameId: { userId: Number(userId), gameId: Number(gameId) } },
      });

      if (!userGame) {
          return res.status(404).json({ erreur: 'UserGame non trouvé' });
      }

      res.status(200).json(userGame);
  } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la lecture du UserGame' });
  }
});

// Mettre à jour un UserGame par son Id
router.put("/update_usergame/:userId/:gameId", async (req, res) => {
  try {
      const { userId, gameId } = req.params;
      const { role } = req.body;

      const userGameExist = await prisma.userGame.findUnique({
          where: { userId_gameId: { userId: Number(userId), gameId: Number(gameId) } },
      });

      if (!userGameExist) {
          return res.status(404).json({ erreur: 'UserGame non trouvé' });
      }

      const userGameUpdate = await prisma.userGame.update({
          where: { userId_gameId: { userId: Number(userId), gameId: Number(gameId) } },
          data: { role },
      });

      res.status(200).json(userGameUpdate);
  } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la mise à jour du UserGame' });
  }
});

// Supprimer un UserGame par son Id
router.delete("/delete_usergame/:userId/:gameId", async (req, res) => {
  try {
      const { userId, gameId } = req.params;

      const userGameExist = await prisma.userGame.findUnique({
          where: { userId_gameId: { userId: Number(userId), gameId: Number(gameId) } },
      });

      if (!userGameExist) {
          return res.status(404).json({ erreur: 'UserGame non trouvé' });
      }

      const userGameDelete = await prisma.userGame.delete({
          where: { userId_gameId: { userId: Number(userId), gameId: Number(gameId) } },
      });

      res.status(200).json({ message: 'UserGame supprimé avec succès' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la suppression du UserGame' });
  }
});

// Page de connexion
router.get('/login', (req, res) => {
  res.render("login");
});

// Gestion de la soumission du formulaire de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Vérification des informations d'identification dans la base de données
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });
  
  if (user) {
    // Création d'une session utilisateur
    const passwordMatch = await bcrypt.compare(password, user.password);
    // Comparaison du mot de passe haché avec celui stocké dans la base de données
    if (passwordMatch) {
      // Authentification réussie, définir l'utilisateur dans la session
      req.session.user = user;
      console.log(user);  
      res.redirect('/menu');
    } 
    else {
      res.send('Identifiants incorrects.');
    }
  }
});

// Page du menu (redirection après une connexion réussie)
router.get('/menu', (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    return res.render("menu");
    
    // res.send('Bienvenue sur la page du menu.');
  } else {
    return res.redirect('/login');
    
  }
});
 

module.exports = router;
