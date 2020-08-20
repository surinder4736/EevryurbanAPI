import { Models, sequelize } from '../models';
const { UserAbout,User } = Models;

class UserAboutController {
  static create(req, res) {
    const { university,status,month,year } = req.body
    const { userid } = req.params
    return UserAbout
      .create({
        university,status,month,year,
        userid
      })
      .then(element => res.status(201).send({
        message: `Your information has been created successfully `,
        element
      }))
    }
    static list(req, res) {
        return UserAbout
          .findAll()
          .then(medias => res.status(200).send(medias));
      }
    static modify(req, res) {
    const { university,status,month,year } = req.body
    return UserAbout
        .findById(req.params.id)
        .then((media) => {
          media.update({
          university: university,
          status: status,
          month:month,
          year:year 
        })
        .then((updatedMedia) => {
            res.status(200).send({
            message: 'media updated successfully',
            data: {
                university: university || updatedMedia.university,
                status: status || updatedMedia.status,
                month:month || updatedMedia.month,
                year:year || updatedMedia.year
            }
            });
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static delete(req, res) {
        return UserAbout
          .findById(req.params.id)
          .then(media => {
            if(!media) {
              return res.status(400).send({
              message: 'Media Not Found',
              });
            }
            return media
              .destroy()
              .then(() => res.status(200).send({
                message: 'Media successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }

}

export default UserAboutController