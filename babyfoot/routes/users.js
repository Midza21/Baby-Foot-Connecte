var express = require('express');
var router = express.Router();
const  {PrismaClient} =  require("@prisma/client") 
const  {createHmac} = require('node:crypto');
const { empty } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Retourne tous les users de la base
router.get("/get_users", async (req, res) => {
  const allUsers = await prisma.user.findMany({});
  res.status(200).json(allUsers);
});

// Retourne l'utilisateur avec l'id spécifié
router.get("/get_user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
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

// Supprimer un user avec son ID
router.delete("/delete_user/:id", async (req, res) => {
  try {
      const userId = parseInt(req.params.id, 10);
      const userExist = await prisma.user.findUnique({
        where : {id: userId},
    });
    console.log(userId,userExist)
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

// Mettre à jour User par son Id
router.put("/update_user/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { nom, password, email } = req.body;

    const userExist = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExist) {
      return res.status(404).json({ erreur: 'Utilisateur non trouvé' });
    }

    const userUpdate = await prisma.user.update({
      where: { id: userId },
      data: {
        nom,
        password,
        email,
      },
    });

    res.status(200).json(userUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur lors de la mise à jour de l\'utilisateur' });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
