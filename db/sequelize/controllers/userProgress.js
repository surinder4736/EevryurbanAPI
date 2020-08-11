import { Models, sequelize } from '../models';
const { UserProgress,User } = Models;

class UserProgressController {
  static create(req, res) {
    const { progressid,establishment } = req.body
    const { userid } = req.params
    return UserProgress
      .create({
        establishment,progressid,
        userid
      })
      .then(progress => res.status(201).send({
        message: `Your media has been created successfully `,
        progress
      }))
    }
    static list(req, res) {
        return UserProgress
          .findAll()
          .then(progress => res.status(200).send(progress));
      }
    static modify(req, res) {
    const { establishment,progressid } = req.body
    return UserProgress
        .findById(req.params.id)
        .then((progress) => {
            progress.update({
                establishment: establishment || progress.establishment,
                progressid:progressid||progress.progressid
        })
        .then((updatedprogress) => {
            res.status(200).send({
            message: 'media updated successfully',
            data: {
                establishment: establishment || updatedprogress.establishment,
                progressid:progressid || updatedprogress.progressid                
            }
            });
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static delete(req, res) {
        return UserProgress
          .findById(req.params.id)
          .then(progress => {
            if(!progress) {
              return res.status(400).send({
              message: 'Specialties Not Found',
              });
            }
            return progress
              .destroy()
              .then(() => res.status(200).send({
                message: 'Specialties successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }

}

export default UserProgressController