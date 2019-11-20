import { Models, sequelize } from '../models';
const { UserExperiance,User } = Models;

class UserExperiances {
  static create(req, res) {
    const { title, description, location,start_date,end_date } = req.body
    const { userId } = req.params
    return UserExperiance
      .create({
        title, description, location,start_date,end_date,
        userId
      })
      .then(experiance => res.status(201).send({
        message: `Your experiance with the title ${title} has been created successfully `,
        experiance
      }))
    }
    static list(req, res) {
        return UserExperiance
          .findAll()
          .then(experiances => res.status(200).send(experiances));
      }
    static modify(req, res) {
    const { title, description, location,start_date,end_date } = req.body
    return UserExperiance
        .findById(req.params.id)
        .then((experiance) => {
        experiance.update({
          title: title || experiance.title,
          description: description || experiance.description,
          location: location || location.location,
          start_date: start_date || experiance.start_date,
          end_date: end_date
        })
        .then((updatedExperiance) => {
            res.status(200).send({
            message: 'Experiance updated successfully',
            data: {
                title: title || updatedExperiance.title,
                start_date: start_date || updatedExperiance.start_date,
                end_date: end_date || updatedExperiance.end_date
            }
            });
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static delete(req, res) {
        return UserExperiance
          .findById(req.params.id)
          .then(experiance => {
            if(!experiance) {
              return res.status(400).send({
              message: 'Experiance Not Found',
              });
            }
            return experiance
              .destroy()
              .then(() => res.status(200).send({
                message: 'Experiance successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }

}

export default UserExperiances