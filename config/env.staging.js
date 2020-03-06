import { DB_TYPES } from './dbTypes';
export const ENV ='staging';
export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.POSTGRES;
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;
export const SMTP_FROM =  'munna.bhakta1001@gmail.com';
export const CONTACT_SMTP_FROM='munna.bhakta1001@gmail.com';
export const SMTP_HOST ='smtp.gmail.com';
export const SMTP_PORT =465;
export const SMTP_USERNAME = 'munna.bhakta1001@gmail.com';
export const SMTP_PASSWORD = 'rrguuftkqwdoxuav';
export const PRO_ENQUIRY_BccEmail = 'munna.bhakta1001@gmail.com';
export const EMAIL_CC='assist@everyurban.com';
export const CONATACTUS_TO_EMAIL = 'cheeku.swami@gmail.com'; // for conatact us 
export const SMTP_SECURE = true;
export const postgres = {username:'postgres',server:'192.168.1.101',password:'123456',database:'every_urban'};
export const hostName ="http://122.160.166.186:8083";
export const privateLocalAddress ="http://localhost:7880";