import express from "express";
import { PrismaClient } from "@prisma/client";
import { createHmac } from "node:crypto";
const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded());

// Pages statiques
app.use(express.static("public"));

// Retourne tous les users de la base
app.get("/users", async (req, res) => {
  const allUsers = await prisma.users.findMany({});
  res.status(200).json(allUsers);
});

// Retourne tous les Parties de la base
app.get("/games", async (req, res) => {
  const allGames = await prisma.games.findMany({});
  res.status(200).json(allGames);
});

// Retourne tous les Babyfoot de la base
app.get("/babyfoots", async (req, res) => {
  const allBabyfoot = await prisma.babyfoot.findMany({});
  res.status(200).json(allBabyfoot);
});

// Retourne l'utilisateur avec l'id spécifié
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.users.findUnique({
    where: { id: Number(id) },
  });
  res.json(user);
});

// Retourne la Partie avec l'id spécifié
app.get("/game/:id", async (req, res) => {
  const { id } = req.params;

  const game = await prisma.games.findUnique({
    where: { id: Number(id) },
  });
  res.json(game);
});

// Retourne la Partie avec l'id spécifié
app.get("/babyfoot/:id", async (req, res) => {
  const { id } = req.params;

  const babyfoot = await prisma.babyfoot.findUnique({
    where: { id: Number(id) },
  });
  res.json(babyfoot);
});

// Crée un nouveau user avec les données du formulaire
app.post("/new_user", async (req, res) => {
  const { nom, mail, password } = req.body;
  const result = await prisma.users.create({
    data: {
      nom: nom,
      mail: mail,
      password: password
        ? createHmac("sha256", String(password))
            .update("I love cupcakes")
            .digest("hex")
        : "",
      role: "joueur", // Définir le rôle en dur comme "joueur"
    },
  });

  res.json(result);
});

// Crée un nouveau Game avec les données du formulaire
app.post("/new_game", async (req, res) => {
  const { adversaire1, adversaire2, babyfoot, etat } = req.body;
  const result = await prisma.games.create({
    data: {
      adversaire1: adversaire1,
      adversaire2: adversaire2,
      babyfoot: babyfoot,
      etat: "En cours",
    },
  });
  res.json(result);
});

// Crée un nouveau babyfoot avec les données du formulaire
app.post("/new_babyfoot", async (req, res) => {
  const { localisation } = req.body;
  const result = await prisma.babyfoot.create({
    data: {
      localisation: localisation,
    },
  });
  res.json(result);
});

// Supprimer un user avec son ID
app.post("/delete_user", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10); // Assurez-vous de récupérer le champ correct du formulaire
    const userExist = await prisma.users.findUnique({
      where: { id: userId },
    });
    if (!userExist) {
      return res.status(404).json({ erreur: "User non trouvée" });
    }
    await prisma.users.delete({
      where: { id: userId },
    });
    res.status(200).json({ message: "Joueur supprimé avec succès!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la suppression du user" });
  }
});

// Supprimer une Partie avec son ID
app.delete("/game/:id", async (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);
    const gameExist = await prisma.games.findUnique({
      where: { id: gameId },
    });
    if (!gameExist) {
      return res.status(404).json({ erreur: "Partie non trouvée" });
    }
    await prisma.games.delete({
      where: { id: gameId },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la suppression de la partie" });
  }
});

// Supprimer une entité avec son ID
app.delete("/babyfoot/:id", async (req, res) => {
  try {
    const babyfootId = parseInt(req.params.id, 10);
    const babyfootExist = await prisma.babyfoot.findUnique({
      where: { id: babyfootId },
    });
    if (!babyfootExist) {
      return res.status(404).json({ erreur: "Babyfoot non trouvée" });
    }
    await prisma.babyfoot.delete({
      where: { id: babyfootId },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la suppression du babyfoot" });
  }
});

// Mettre à jour son babyfoot par son Id
app.put("/babyfoot/:id", async (req, res) => {
  try {
    const babyfootId = parseInt(req.params.id, 10);
    const { localisation } = req.body;

    const babyfootExist = await prisma.babyfoot.findUnique({
      where: { Id: babyfootId },
    });
    if (!babyfootExist) {
      return res.status(404).json({ erreur: "babyfoot non trouvée" });
    }

    const babyfootUpdate = await prisma.babyfoot.update({
      where: { id: deviceId },
      data: {
        localisation,
      },
    });

    res.status(200).json(babyfootUpdate);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ erreur: "Erreur lors de la mise à jour du babyfoot" });
  }
});

// Mettre à jour un user par son Id
app.put("/update_user/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { nom, mail, password } = req.body;

    const userExist = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!userExist) {
      return res.status(404).json({ erreur: "User non trouvée" });
    }

    const userUpdate = await prisma.users.update({
      where: { id: userId },
      data: {
        nom,
        mail,
        password,
        // Ajoutez d'autres champs si nécessaire
      },
    });

    res.status(200).json(userUpdate);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        erreur: "Erreur lors de la mise à jour du user",
        error: error.message,
      });
  }
});

// Mettre à jour game par son Id
app.put("/game/:id", async (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);
    const { date, adversaire1, adversaire2, score1, score2, babyfoot, etat } =
      req.body;

    const gameExist = await prisma.games.findUnique({
      where: { Id: gameId },
    });
    if (!gameExist) {
      return res.status(404).json({ erreur: "game non trouvée" });
    }

    const gameUpdate = await prisma.games.update({
      where: { id: gameId },
      data: {
        date,
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

// Lancement du serveur
app.listen(8080, () => {
  console.log("Serveur à l'écoute sur le port 8080");
});
