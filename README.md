# Baby-Foot-Connecte


Baby-Foot-Connecte

**Introduction**

Présentation du projet

Le projet consiste à créer un baby-foot connecté qui permettra aux joueurs de suivre les scores sur un écran et de vérifier si le ballon a franchi correctement la ligne de but. Les données seront ensuite stockées dans une base de données à l'aide d'une API.
Je pense que ce projet sera monter par nos soin dans le faclab avec toutes les machines à disposition 

**Objectif du baby-foot connecté**

L'objectif principal est de fournir aux joueurs une expérience de jeu immersive en ajoutant des éléments sonores et visuels pour recréer l'ambiance d'un match de football. La technologie de vérification de la ligne de but vise à garantir l'équité du jeu, tandis que la sauvegarde des données permettra aux joueurs de suivre leur progression et de revisiter leurs parties.

**Fonctionnalités principales**

Ajout d'effets sonores et d'animations pour une immersion accrue.
Vérification de la validité des buts grâce à une technologie de ligne de but.
Stockage des scores et des données de jeu pour une traçabilité complète.

**3 projets d'inspiration:**

https://www.instructables.com/Automated-Baby-Foot-Table-Simplified/

Foosball Society : https://www.youtube.com/watch?v=9zfI360UP0w

Baby-Foot Connecté : https://perso-laris.univ-angers.fr/~projetsei4/1718/P2/Rapport_Projet_Babyfoot.pdf

**Matériel :**

Deux capteur laser Diode laser 0.83€ :https://www.otronic.nl/fr/diode-laser-5v-module-laser-rouge-650nm-5mw-tete-c.html?source=googlebase&gad_source=1&gclid=CjwKCAiAivGuBhBEEiwAWiFmYeADnPUUynW5qXyKOuiyetmzkWDq_zSN4IzA4RV0QVCr4QJtSxjTKxoCw8IQAvD_BwE

Un haut parleur 10€ : https://www.amazon.fr/Haut-Parleur-Fr%C3%A9quence-Ordinateur-Interface-JST-PH2-0/dp/B08QFTYB9Z/ref=asc_df_B08QFTYB9Z/?tag=googshopfr-21&linkCode=df0&hvadid=509787107013&hvpos=&hvnetw=g&hvrand=18318755465475952747&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9056593&hvtargid=pla-1276275805646&psc=1&mcid=f74bbe2a8e58302a908c197a9b17e2fb

ARD SHD LCD3,5 20€: https://www.reichelt.com/fr/fr/bouclier-arduino-affichage-3-5-320-x-480-ili9486-ard-shd-lcd3-5-p291375.html?PROVID=2810&gad_source=1&gclid=CjwKCAiAivGuBhBEEiwAWiFmYc9rpEfgjHHVHqrkcFpTbrxmXNLNWrIirQaVUhhG1_v-63Vyt5ck3BoC54UQAvD_BwE

une GL5516 LDR Photosensible Résistance pour le capteur laser 0,25€ : https://www.otronic.nl/fr/gl5516-ldr-photosensible-resistance-photoresistanc.html?source=googlebase&gad_source=1&gclid=CjwKCAiAivGuBhBEEiwAWiFmYQifl4VPXzNB_SFO9VOE-H_Kp3ENRh4F7uUrIbH5osmh2IbvL8YAjxoCnOwQAvD_BwE

Arduino Uno 20€ : https://www.amazon.fr/Arduino-A000066-M%C3%A9moire-flash-32/dp/B008GRTSV6/ref=asc_df_B008GRTSV6/?tag=googshopfr-21&linkCode=df0&hvadid=194939262438&hvpos=&hvnetw=g&hvrand=16296767096769731201&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9056593&hvtargid=pla-82806036780&psc=1&mcid=199bedd93c7f3b60a213e8fd3504a416

ou

ESP32 10€ : https://www.amazon.fr/AZDelivery-Development-successeur-Compatible-incluant/dp/B071P98VTG/ref=asc_df_B071P98VTG/?tag=googshopfr-21&linkCode=df0&hvadid=194939354820&hvpos=&hvnetw=g&hvrand=3325158748750025302&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9056593&hvtargid=pla-367709801435&mcid=3c2144aa0c7c390d949675158d869029&th=1

**Technologies utilisée :** 

* Node Js 
* Html /css 
* C type arduino 
* SQL 



Brouillon :

**1 app web**

* Formulaire qui Cree un utilisateur 
* Se connecte 
* Recupere les statistiques des joueurs sur une bdd peux aussi cree un tournoi avec les joueurs co
* Page admin
* Page Classement 

**Baby foot**

* Affiche le score sur un ecran
* Goal line technologie
* Ruban Led a chaque but
* Haut parleur a chaque but

**Table**

**Utilisateur**
* ID
* NOM
* BUT
* VICTOIRE
* DEFAITE
* MDP
* EMAIL

**Partie**

* ID
* DATE 
* ADVERSAIRE1
* ADVERSAIRE2
* SCORE1
* SCORE2
* ETAT DE LA PARTIE

**BabyFoot**

* ID
* LOCALISATION 

# REDME SAID
## Ce que j'ai fait:
* changement de la db
* création d'un nouveau db intermédiaire
* On ne peut pas supprimer un user qui a déjà jouer une partie
## Ce que je dois faire
* il faut que je test la fonction delete sur les tables
* je n'ai pas encors mis au courant l'équipe sur la decentralisation des tables
* Il faut que je refléchisse un moyen, de tel sorte que si on supprime un user, on supprime aussi la partie
## Partie Electronique:
### Le 05/03/2024
* J'ai fait éttude sur le type de LED qu'on doit utiliser
* Et on a choisi le LED ws2812b qui est adressable.
### Le 06/03/2024
* On a fait une maquette 3D d'un babyfoot selon le babyfoot bonzini
* On a décidé sur comment installer le laser. on s'est qu'il sera en bas tout près des buts et il y aura un autre type pour les bruits si par exemple la balle frappe le filet( le carton qui remplace le filet) et sort
* On a décidé comment doit etre l'écran
Bien sûr, voici une ébauche de documentation pour votre README sur GitHub :

#### LED Néopixel avec Arduino

##### Matériel nécessaire

- Carte Arduino
- Bande de LED Néopixel (WS2812B) avec 12 LEDs ( ce qui est présent à la fac)
- 2 boutons ( rouge et bleu)
- Résistances pour les boutons

##### Configuration

La bande de LED est connectée au pin 3 de la carte Arduino. Les boutons sont connectés aux pins 4 et 2 pour le bouton rouge et le bouton bleu respectivement.

##### Problèmes connus

Actuellement, le code pour les boutons ne fonctionne pas correctement en raison d'un problème de branchement des résistances.

###### Prochaines étapes
Le prochain objectif est de résoudre le problème de branchement des boutons pour permettre le contrôle des LEDs avec les boutons.
Voici une suggestion de documentation pour votre README sur GitHub :

### Mise à jour du 07 Mars 2024

#### Modifications du code
Aujourd'hui, j'ai modifié le code pour que les LEDs clignotent de manière festive lorsque l'on appuie sur un bouton, puis s'éteignent lentement.

#### Modifications du branchement
J'ai également modifié le branchement. Chaque bouton est maintenant connecté à une résistance. Voici une image du nouveau branchement :

### Tâches pour demain
Demain, je prévois de faire le branchement sur un ESP.

### Mise à jour du 08 Mars 2024

Aujourd'hui, j'ai réalisé le branchement de la LED NeoPixel avec ESP32-S3. En collaboration avec Ilaes, nous avons combiné le code pour qu'il fonctionne avec le laser.

#### Problème rencontré

J'ai rencontré un problème spécifique avec l'ESP32-S3. Si je connecte la LED au pin 5, je dois indiquer dans le code que c'est le pin 6. C'est une particularité de l'ESP32-S3 à laquelle je n'étais pas préparé.

De plus, il est important de ne pas oublier de mettre les résistances dans le circuit de la LED pour éviter tout dommage potentiel.

#### Solution

Après avoir identifié le problème, j'ai corrigé le code pour refléter le bon numéro de pin. J'ai également ajouté les résistances nécessaires dans le circuit de la LED.

#### Prochaines étapes

Optimiser le code 
## Mise à jour du 26/03/2024

Aujourd'hui, j'ai travaillé avec illaes sur plusieurs tâches :
0. **L'optimisation du code**
1. **Refonte du circuit et du code** : Nous avons refait le circuit et le code sur l'ordinateur d'illaes. Nous avons rencontré un problème avec le pin de l'ESP32-S3 qui fonctionnait différemment de ce à quoi nous nous attendions.

2. **Conception du capteur 3D** : Nous avons réfléchi à la manière de réaliser le capteur en 3D.

3. **Problèmes de code** : Nous avons eu des difficultés à faire fonctionner le code sur l'ordinateur d'illaes. Parfois, il fonctionne correctement, mais parfois, il renvoie une erreur de statut 2.

