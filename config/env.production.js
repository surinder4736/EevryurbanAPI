import { DB_TYPES } from './dbTypes';
export const ENV = 'production';
export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.POSTGRES;
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;
export const SMTP_FROM =  'assist@everyurban.com';
export const CONTACT_SMTP_FROM='assist@everyurban.com';
export const SMTP_HOST ='smtp.office365.com';
export const SMTP_PORT =587;
export const SMTP_USERNAME = 'assist@everyurban.com';
// export const SMTP_PASSWORD = 'Assisteveryurban@123';
export const SMTP_PASSWORD = 'Temporary@everyurban123';
// 'Temporary@123';
export const PRO_ENQUIRY_BccEmail = 'assist@everyurban.com';
export const CONATACTUS_TO_EMAIL = 'assist@everyurban.com';//for contactus
export const SMTP_SECURE = false;
export const postgres = {username:'postgres',server:'localhost',password:'everyurban2020',database:'every_urban'};
export const hostName ="https://everyurban.com";
export const privateLocalAddress ="http://localhost:8081";