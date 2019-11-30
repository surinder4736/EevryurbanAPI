import { Models, sequelize } from '../models';
const { UserProfile,UserExperiance,UserLanguages,UserEducation ,User } = Models;

class UserProfiles {
  static create(req, res) {
    const { about, photo, country,address,portfolio,firstName,lastName } = req.body
    const { userId } = req.params
    return UserProfile
      .create({
        about, photo, country,address,portfolio,firstName,lastName,
        userId
      })
      .then(profile => res.status(201).send({
        message: `Your profile with the name ${firstName +' '+ lastName} has been created successfully `,
        profile
      }))
    }
    static list(req, res) {
        return UserProfile
          .findAll()
          .then(profile => res.status(200).send(profile));
      }
    static fetchCompleteProfile(req, res) {
      const { userid } = req.params;
      console.log( req.params);
      let data ={profile:{},educations:[],experiances:[],languages:[]};
        return UserProfile
          .findOne({where:{userId:userid}})
          .then(profile => {
            data.profile=profile;
            UserExperiance.findAll({where:{userId:userid}}).then(exp=>{
              data.experiances=exp;
              UserEducation.findAll({where:{userId:userid}}).then(edu=>{
                data.educations=edu;
                UserLanguages.findAll({where:{userId:userid}}).then(lng=>{
                  data.languages=lng;
                  res.status(200).send(data);
                }).catch(error => {
                  res.status(200).send(data);
                });
              }).catch(error => {
                res.status(200).send(data);
              });
              
            }).catch(error =>{
              res.status(200).send(data);
            });
            

          }).catch(error => res.status(400).send(error));
      }  
    static modify(req, res) {
    const { about, photo, country,address,portfolio,firstName,lastName } = req.body
    return UserProfile
        .findById(req.params.id)
        .then((profile) => {
          profile.update({
          about: about || profile.about,
            photo: photo || profile.photo,
            country: country || profile.country,
            address: address || profile.address,
            portfolio: portfolio || profile.portfolio,
            firstName: firstName || profile.firstName,
            lastName: lastName || profile.lastName
        })
        .then((updatedProfile) => {
            res.status(200).send({
            message: 'Profile updated successfully',
            data: {
            about: about || profile.about,
            photo: photo || profile.photo,
            country: country || profile.country,
            address: address || profile.address,
            portfolio: portfolio || profile.portfolio,
            firstName: firstName || profile.firstName,
            lastName: lastName || profile.lastName
            }
            })
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static changePhoto(req, res) {
      const photo = req.file.filename
      return UserProfile
          .findById(req.params.id)
          .then((profile) => {
            profile.update({
              photo: photo || profile.photo
          })
          .then((updatedProfile) => {
              res.status(200).send({
              message: 'profile photo updated successfully',
              data: {
              photo: photo
              }
              })
          })
          .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    static delete(req, res) {
        return UserProfile
          .findById(req.params.id)
          .then(profile => {
            if(!profile) {
              return res.status(400).send({
              message: 'Profile Not Found',
              });
            }
            return profile
              .destroy()
              .then(() => res.status(200).send({
                message: 'Profile successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }

}

export default UserProfiles