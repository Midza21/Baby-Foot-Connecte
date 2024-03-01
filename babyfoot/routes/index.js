var express = require('express');
var router = express.Router();
const  {PrismaClient} =  require("@prisma/client") 
const  {createHmac} = require('node:crypto');
const { empty } = require('@prisma/client/runtime/library');

const prisma = new PrismaClient();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Retourne tous les users de la base
router.get("/get_users", async (req, res) => {
  const allUsers = await prisma.user.findMany({});
  res.status(200).json(allUsers);
});

// Retourne tous les Parties de la base
router.get("/get_games", async (req, res) => {
  try {
    const allGames = await prisma.game.findMany({
      include: {
        userGames: {
          include: {
            user: {
              select: {
                nom: true,
              },
            },
          },
        },
        babyfoot: {
          select: {
            localisation: true,
          },
        },
      },
    });

    res.status(200).json(allGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur lors de la récupération des jeux' });
  }
});

// Retourne tous les Babyfoot de la base
router.get("/get_babyfoots", async (req, res) => {
  try {
    const allBabyfoots = await prisma.babyfoot.findMany({
      select: {
        localisation: true,
      },
    });

    res.status(200).json(allBabyfoots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur lors de la récupération des babyfoots' });
  }
});



// Retourne l'utilisateur avec l'id spécifié
router.get("/get_user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
});

// Retourne la Partie avec l'id spécifié
router.get("/get_game/:id", async (req, res) => {
  const { id } = req.params;

  const game = await prisma.game.findUnique({
    where: { id: Number(id) },
    include: {
      userGames: {
        include: {
          user: true,
        },
      },
      babyfoot: true,
    },
  });

  if (!game) {
    return res.status(404).json({ message: "Partie non trouvée" });
  }

  // On récupère les détails des utilisateurs participants
  const joueurDetails = game.userGames.find((ug) => ug.role === "joueur");
  const adversaireDetails = game.userGames.find((ug) => ug.role === "adversaire");

  // On construit la réponse
  const response = {
    id: game.id,
    date: game.date,
    score1: game.score1,
    score2: game.score2,
    babyfoot: game.babyfoot,
    etat: game.etat,
    joueur: joueurDetails.user,
    adversaire: adversaireDetails.user,
  };

  res.json(response);
});

// Retourne le Babyfoot avec l'id spécifié
router.get("/get_babyfoot/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const babyfoot = await prisma.babyfoot.findUnique({
      where: { id: Number(id) },
      select: {
        localisation: true,
      },
    });

    if (!babyfoot) {
      return res.status(404).json({ erreur: 'Babyfoot non trouvé' });
    }

    res.json(babyfoot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur lors de la récupération du babyfoot' });
  }
});



// Crée un nouveau user avec les données du formulaire
router.post("/new_user", async (req, res) => {
  const { nom, email, password, } = req.body;
  const result = await prisma.user.create({
    
    data: {
      nom: nom,
      email : email,
      password: createHmac('sha256', password).update('I love cupcakes').digest('hex'),        
    },
  });
  res.json(result);
});
// Crée un nouveau Game avec les données du formulaire
router.post("/new_game", async (req, res) => {
  try {
    const { emailJoueur, emailAdversaire, localisationBabyfoot } = req.body;

    // On vérifie que le nom du joueur, de l'adversaire et de la localisation du babyfoot ne sont pas vides
    if (!emailJoueur || !emailAdversaire || !localisationBabyfoot) {
      return res.status(400).json({ message: "Le joueur, l'adversaire et la localisation du babyfoot sont obligatoires." });
    }

    // On cherche si le joueur, l'adversaire et le babyfoot existent déjà dans la base de données
    const existeJoueur = await prisma.user.findUnique({
      where: { email: emailJoueur },
    });

    const existeAdversaire = await prisma.user.findUnique({
      where: { email: emailAdversaire },
    });

    const existeBabyfoot = await prisma.babyfoot.findUnique({
      where: { localisation: localisationBabyfoot },
    });

    // On vérifie que le joueur, l'adversaire et le babyfoot ont été trouvés
    if (!existeJoueur || !existeAdversaire || !existeBabyfoot) {
      return res.status(404).json({ message: "Un ou plusieurs éléments n'existent pas." });
    }

    // On crée le jeu avec les noms du joueur, de l'adversaire et de la localisation du babyfoot
    const result = await prisma.game.create({
      data: {
        userGames: {
          create: [
            {
              role: "joueur",
              user: { connect: { id: existeJoueur.id } }, // On trouve l'utilisateur avec le nom du joueur
            },
            {
              role: "adversaire",
              user: { connect: { id: existeAdversaire.id } }, // On trouve l'utilisateur avec le nom de l'adversaire
            },
          ],
        },
        babyfoot: { connect: { id: existeBabyfoot.id } }, // On trouve le babyfoot avec la localisation fournie
      },
      include: {
        userGames: {
          include: {
            user: true,
          },
        },
        babyfoot: true,
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du jeu." });
  }
});



// Crée un nouveau babyfoot avec les données du formulaire
router.post("/new_babyfoot", async (req, res) => {
  const { localisation } = req.body;
  const result = await prisma.babyfoot.create({
    data: {
      localisation: localisation
    },
  });
  res.json(result);
});

// Supprimer un user avec son ID
router.post("/delete_user/:id", async (req, res) => {
  try {
      const userId = parseInt(req.params.id, 10);
      const userExist = await prisma.user.findUnique({
        where : {id: userId},
    });
    if(! userExist)
    {
      return res.status(404).json({ erreur: 'User non trouvé' });
    }
    await prisma.user.delete({
      where: { id: userId },
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur lors de la suppression du user' });
  }
});


// Supprimer une Partie avec son ID
router.post("/delete_game/:id", async (req, res) => {
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
router.post("/delete_babyfoot/:id", async (req, res) => {
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
  
  try {
    const babyfootId = parseInt(req.params.id, 10);
    const {localisation} = req.body;

    const babyfootExist = await prisma.babyfoot.findUnique({
        where : {id: babyfootId},
    });
    if(! babyfootExist)
    {
      return res.status(404).json({ erreur: 'babyfoot non trouvée' });
    }

    const babyfootUpdate = await prisma.babyfoot.update({
      where: { id: babyfootId },
      data: {
        localisation,
      },
    });

    res.status(200).json(babyfootUpdate);
  } catch (error)
  {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur lors de la mise à jour du babyfoot' });
  }
});

// Mettre à jour Game par son Id
router.put("/update_game/:id", async (req, res) => {
  try {
      const gameId = parseInt(req.params.id, 10);
      const { score1, score2, babyfootId, etat } = req.body;

      const gameExist = await prisma.game.findUnique({
          where: { id: gameId },
      });

      if (!gameExist) {
          return res.status(404).json({ erreur: 'Game non trouvé' });
      }

      const babyfootExist = await prisma.babyfoot.findUnique({
          where: { id: babyfootId },
      });

      if (!babyfootExist) {
          return res.status(400).json({ erreur: 'Babyfoot non trouvé' });
      }

      const gameUpdate = await prisma.game.update({
          where: { id: gameId },
          data: {
              score1,
              score2,
              babyfootId,
              etat,
          },
      });

      res.status(200).json(gameUpdate);
  } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: 'Erreur lors de la mise à jour du Game' });
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


module.exports = router;
