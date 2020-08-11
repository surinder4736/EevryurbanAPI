import Sequelize from 'sequelize';
import sequelizeConfig from '../sequelize_config';
import { ENV } from '../../../config/env';
import tokenModel from './tokens';
import topicModel from './topics';
import userModel from './users';
import userlanguagesModel from './userlanguages';
import userExperianceModel from './userexperiance';
import userEducationModel from './usereducation';
import userProfileModel from './userprofile';
import tableCodeModel from './tbl_code';
import contactUsModal from './tbl_contactus';
import userMediaModal from './usermedia';
import userPortfolloModal from './portfollo';
import userCategoryImagesModal from './categoryimage';
import UserSpecialtiesModal from './userspecialist';
import UserProgressModal from './userprogress';
import UserAboutModal from './about';

const config = ENV ==='production'? sequelizeConfig.production : sequelizeConfig.development;

const db = {};
const dbUrl = process.env[config.use_env_variable];

const sequelize = dbUrl ? new Sequelize(dbUrl) : new Sequelize(config.database, config.username, config.password, config);

db.Token = sequelize.import('Token', tokenModel);
db.Topic = sequelize.import('Topic', topicModel);
db.User = sequelize.import('User', userModel);
db.UserLanguages = sequelize.import('userlanguages',userlanguagesModel);
db.UserExperiance = sequelize.import('UserExperiance',userExperianceModel);
db.UserProfile = sequelize.import('UserProfile',userProfileModel);
db.UserEducation = sequelize.import('UserEducation',userEducationModel);
db.tableCode = sequelize.import('TableCode',tableCodeModel);
db.contactUs = sequelize.import('ContactUs',contactUsModal);
db.UserMedia=sequelize.import('UserMedia',userMediaModal);
db.UserPortfollo=sequelize.import('UserPortfollo',userPortfolloModal);
db.UserCategoryImage=sequelize.import('UserCategoryImages',userCategoryImagesModal);
db.UserSpecialties=sequelize.import('UserSpecialties',UserSpecialtiesModal);
db.UserProgress=sequelize.import('UserProgress',UserProgressModal);
db.UserAbout=sequelize.import('UserAbout',UserAboutModal);
Object.keys(db).forEach((key) => {
  const model = db[key];
  if (model.associate) {
    model.associate(db);
  }
});

export { db as Models, sequelize };

