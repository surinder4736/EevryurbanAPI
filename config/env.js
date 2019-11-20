import { DB_TYPES } from './dbTypes';
//Database configuration
export const ENV = process.env.NODE_ENV || 'development' ;
export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.POSTGRES;
const isProduction = ENV == 'production';
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;

//Mail Cofiguration
// Note: All credencials are not in working just used for dummy.you can use as per your according credencials
export const SMTP_FROM = isProduction ? 'reply.production12644@gmail.com' : 'test12345@gmail.com';
export const CONTACT_SMTP_FROM=isProduction ? 'abcd123@gmail.com' : 'xyz1234@outlook.com';
export const SMTP_HOST = isProduction ? 'smtp.gmail.com' : 'smtp.gmail.com';
export const SMTP_PORT = isProduction ? 465 : 465;
export const SMTP_USERNAME = isProduction ? 'demo12345@gmail.com' : 'test12345@gmail.com';
export const SMTP_PASSWORD = isProduction ? 'password' : 'passsssssss';
export const PRO_ENQUIRY_BccEmail = isProduction ? 'email_list_seperated_by_comma' : 'email_list_seperated_by_comma';
export const SMTP_SECURE=true;
