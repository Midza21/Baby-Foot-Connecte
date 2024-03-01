var express = require('express');
var router = express.Router();
const  {PrismaClient} =  require("@prisma/client") 
const  {createHmac} = require('node:crypto');
const { empty } = require('@prisma/client/runtime/library');

const prisma = new PrismaClient();
/* GET home page. */






module.exports = router;
