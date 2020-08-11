import { Models, sequelize } from '../models';
const { UserCategoryImage,User } = Models;

class UserCategoryImageController {
    static create(req, res) {
        console.log("file length : "+req.files.length);
        for(let i=0;i<req.files.length;i++){
            const { id } = req.params;
            const {caption}=req.body;
            console.log("caption  : "+ caption);
            let folloid=id;
            const { userid } = req.params
            let imageurl=req.files[i].filename;
            console.log("file name : "+imageurl);
            UserCategoryImage.create({
                folloid,imageurl,caption,
                userid
            }).then(media => 
                console.log(media)
            )
        }
        return res.status(201).send({
          message: `Your Port follo has been created successfully `,
        })  
    }
    static list(req, res) {
        return UserCategoryImage
          .findAll()
          .then(medias => res.status(200).send(medias));
    }
    static delete(req, res) {
        return UserCategoryImage
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

export default UserCategoryImageController