import { Models, sequelize } from '../models';
const { UserSpecialties,User } = Models;

class UserSpecialtiesController {
  static create(req, res) {
    const { name } = req.body
    const { userid } = req.params
    return UserSpecialties
      .create({
        name,
        userid
      })
      .then(specialties => res.status(201).send({
        message: `Your media has been created successfully `,
        specialties
      }))
    }
    static list(req, res) {
        return UserSpecialties
          .findAll()
          .then(specialties => res.status(200).send(specialties));
      }
    static modify(req, res) {
    const { name } = req.body
    return UserSpecialties
        .findById(req.params.id)
        .then((specialties) => {
            specialties.update({
          name: name || specialties.name
        })
        .then((updatedspecialties) => {
            res.status(200).send({
            message: 'media updated successfully',
            data: {
                name: name || updatedspecialties.name                
            }
            });
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static delete(req, res) {
        return UserSpecialties
          .findById(req.params.id)
          .then(specialties => {
            if(!specialties) {
              return res.status(400).send({
              message: 'Specialties Not Found',
              });
            }
            return specialties
              .destroy()
              .then(() => res.status(200).send({
                message: 'Specialties successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }

}

export default UserSpecialtiesController