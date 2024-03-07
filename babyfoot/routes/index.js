var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { createHmac } = require("node:crypto");
const { empty } = require("@prisma/client/runtime/library");

const prisma = new PrismaClient();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

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

// Retourne tous les Parties de la base
router.get("/get_games", async (req, res) => {
  const allGames = await prisma.game.findMany({});
  res.status(200).json(allGames);
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

// Retourne la Partie avec l'id spécifié
router.get("/get_game/:id", async (req, res) => {
  const { id } = req.params;

  const game = await prisma.game.findUnique({
    where: { id: Number(id) },
  });
  res.json(game);
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
      email: email,
      password: hashedPassword, // Utilisez le mot de passe haché ici
    },
  });
  res.json(result);
});

// Crée un nouveau Game avec les données du formulaire
router.post("/new_game", async (req, res) => {
  const { adversaire1, adversaire2 } = req.body;
  const result = await prisma.game.create({
    data: {
      adversaire1: adversaire1,
      adversaire2: adversaire2,
    },
  });
  res.json(result);
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


// Mettre à jour un user par son Id
router.put("/update_user/:id", async (req, res) => {
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

module.exports = router;
