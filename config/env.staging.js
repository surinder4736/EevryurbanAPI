import { DB_TYPES } from './dbTypes';
export const ENV ='staging';
export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.POSTGRES;
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;
export const SMTP_FROM =  'fsspl.general@gmail.com';
export const CONTACT_SMTP_FROM='fsspl.general@gmail.com';
export const SMTP_HOST ='smtp.gmail.com';
export const SMTP_PORT =465;
export const SMTP_USERNAME = 'fsspl.general@gmail.com';
export const SMTP_PASSWORD = 'rrguuftkqwdoxuav';
export const PRO_ENQUIRY_BccEmail = 'fsspl.general@gmail.com';
export const SMTP_SECURE = true;
export const postgres = {username:'postgres',host:'/cloudsql/heroic-calculus-263602:us-east1:everyurban-mvp',password:'everyurban2020',database:'every_urban'};
export const hostName ="https://everyurban-dot-heroic-calculus-263602.appspot.com";
export const privateLocalAddress ="http://localhost:8082";