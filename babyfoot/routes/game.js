var express = require('express');
var router = express.Router();
const  {PrismaClient} =  require("@prisma/client") 
const { empty } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
  
module.exports = router;