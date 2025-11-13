import { Sequelize } from "sequelize";
import "dotenv/config";
import pg from "pg";
import getAuthorModel from "./entities/author.js";
import getBookModel from "./entities/book.js";
import getGenderModel from "./entities/gender.js";
import getUserModel from "./entities/user.js";
import getReviewModel from "./entities/review.js";
import getTokenModel from "./entities/token.js";
import getFavoriteModel from "./entities/favorite.js";

// defindo o objeto sequelize
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: pg,
});

// chamando os models das entidades
const models = {
  author: getAuthorModel(sequelize, Sequelize),
  book: getBookModel(sequelize, Sequelize),
  gender: getGenderModel(sequelize, Sequelize),
  token: getTokenModel(sequelize, Sequelize),
  user: getUserModel(sequelize, Sequelize),
  review: getReviewModel(sequelize, Sequelize),
  favorite: getFavoriteModel(sequelize, Sequelize),
};

// definir as associações
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export {sequelize};
export default models;