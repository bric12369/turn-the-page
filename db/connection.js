import { Pool } from 'pg';
require('dotenv').config()

const pool = new Pool()

module.exports = pool