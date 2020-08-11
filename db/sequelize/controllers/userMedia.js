import { Models, sequelize } from '../models';
const { UserMedia,User } = Models;

class UserMediaController {
  static create(req, res) {
    const { socialid,link } = req.body
    const { userid } = req.params
    return UserMedia
      .create({
        socialid,link,
        userid
      })
      .then(media => res.status(201).send({
        message: `Your media has been created successfully `,
        media
      }))
    }
    static list(req, res) {
        return UserMedia
          .findAll()
          .then(medias => res.status(200).send(medias));
      }
    static modify(req, res) {
    const { socialId,link } = req.body
    return UserMedia
        .findById(req.params.id)
        .then((media) => {
          media.update({
          socialId: socialId || media.socialId,
          link: link || media.link
        })
        .then((updatedMedia) => {
            res.status(200).send({
            message: 'media updated successfully',
            data: {
                socialId: socialId || updatedMedia.socialId,
                link: link || updatedMedia.link
            }
            });
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static delete(req, res) {
        return UserMedia
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

export default UserMediaController