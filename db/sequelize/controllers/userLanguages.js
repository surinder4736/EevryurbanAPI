import { Models, sequelize } from '../models';
const { UserLanguages,User } = Models;

class UserLanguage {
  static create(req, res) {
    const { name, proficiency } = req.body
    const { userId } = req.params
    return UserLanguages
      .create({
        name,
        proficiency,
        userId
      })
      .then(language => res.status(201).send({
        message: `Your language with the title ${name} has been created successfully `,
        language
      }))
    }
    static list(req, res) {
        return UserLanguages
          .findAll()
          .then(languages => res.status(200).send(languages));
      }
    static modify(req, res) {
    const { name, proficiency } = req.body
    return UserLanguages
        .findById(req.params.id)
        .then((language) => {
        language.update({
            name: name || language.name,
            proficiency: proficiency || language.proficiency
        })
        .then((updatedLanguage) => {
            res.status(200).send({
            message: 'Language updated successfully',
            data: {
                name: name || updatedLanguage.name,
                proficiency: proficiency || updatedLanguage.proficiency
            }
            })
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static delete(req, res) {
        return UserLanguages
          .findById(req.params.id)
          .then(language => {
            if(!language) {
              return res.status(400).send({
              message: 'Language Not Found',
              });
            }
            return language
              .destroy()
              .then(() => res.status(200).send({
                message: 'Language successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }

}

export default UserLanguage