import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';

dotenv.config({ path: path.join(__dirname, `../env/${env}.env`) });
dotenv.config({ path: path.join(__dirname, `../env/${env}.env.local`) });
