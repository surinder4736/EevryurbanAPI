import { Models, sequelize } from '../models';
const { UserEducation,User } = Models;

class UserEducations {
  static create(req, res) {
    const { title, program, start_date,end_date,location,description } = req.body
    const { userId } = req.params
    return UserEducation
      .create({
        title, program,start_date,end_date,location,description,
        userId
      })
      .then(education => res.status(201).send({
        message: `Your education with the title ${title} has been created successfully `,
        education
      }))
    }
    static list(req, res) {
        return UserEducation
          .findAll()
          .then(educations => res.status(200).send(educations));
      }
    static modify(req, res) {
    const { title, program, start_date,end_date,location,description } = req.body
    console.log('Education location : '+ location);
    console.log('Education description : '+ description);
    return UserEducation
        .findById(req.params.id)
        .then((education) => {
          education.update({
          title: title || education.title,
          program: program || education.program,
          location: location || education.location,
          description: description || education.description,
          start_date: start_date || education.start_date,
          end_date: end_date
        })
        .then((updatedEducation) => {
            res.status(200).send({
            message: 'Education updated successfully',
            data: {
                title: title || updatedEducation.title,
                program: program || updatedEducation.program,
                location: location || updatedEducation.location,
                description: description || updatedEducation.description,
                start_date: start_date || updatedEducation.start_date,
                end_date: end_date || updatedEducation.end_date
            }
            });
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    static delete(req, res) {
        return UserEducation
          .findById(req.params.id)
          .then(education => {
            if(!education) {
              return res.status(400).send({
              message: 'Education Not Found',
              });
            }
            return education
              .destroy()
              .then(() => res.status(200).send({
                message: 'Education successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }

}

export default UserEducations