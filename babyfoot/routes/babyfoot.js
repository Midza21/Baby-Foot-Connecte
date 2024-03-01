var express = require('express');
var router = express.Router();
const  {PrismaClient} =  require("@prisma/client") 
const { empty } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

  // Supprimer une Partie avec son ID
  router.delete("/delete_game/:id", async (req, res) => {
      try {
          const gameId = parseInt(req.params.id, 10);
          
          const gameExist = await prisma.game.findUnique({
            where : {id: gameId},
        });
        if(! gameExist)
        {
          return res.status(404).json({ erreur: 'Partie non trouvée' });
        }
        await prisma.game.delete({
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

module.exports = router;
