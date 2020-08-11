import { Models, sequelize } from '../models';
const { UserPortfollo,User } = Models;

class UserPortfolloController {
  static create(req, res) {
    const { folloid,other,caption } = req.body
    const { userid } = req.params
    return UserPortfollo
      .create({
        folloid,other,caption,
        userid
      })
      .then(media => res.status(201).send({
        message: `Your media has been created successfully `,
        media
      }))
    }
    static list(req, res) {
        return UserPortfollo
          .findAll()
          .then(medias => res.status(200).send(medias));
      }
    static modify(req, res) {
    const { folloid,other,caption } = req.body
    return UserPortfollo
        .findById(req.params.id)
        .then((media) => {
          media.update({
            folloid: folloid || media.folloid,
          other: other || media.other,
          caption:caption || media.caption
        })
        .then((updatedMedia) => {
            res.status(200).send({
            message: 'media updated successfully',
            data: {
                folloid: folloid || updatedMedia.folloid,
                other: other || updatedMedia.other,
                caption:caption || updatedMedia.caption
            }
            });
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static delete(req, res) {
        return UserPortfollo
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

export default UserPortfolloController