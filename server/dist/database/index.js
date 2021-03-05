"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
// Init knex
const knex = knex_1.default({
    client: 'postgres',
    useNullAsDefault: true,
    connection: process.env.DB_URL
});
