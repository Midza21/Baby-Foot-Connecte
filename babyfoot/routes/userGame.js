var express = require('express');
var router = express.Router();
const  {PrismaClient} =  require("@prisma/client") 
const { empty } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
