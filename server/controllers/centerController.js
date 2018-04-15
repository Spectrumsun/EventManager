import { Event, Center } from '../models';
import deletePicture from '../handlers/deleteImage';


class Centers {
  // return a list of cennters in the db
  static getCenter(req, res) {
    Center.all()
      .then(center => res.status(200).json({
        message: 'success',
        center
      }))
      .catch(error => res.status(400).json(error));
  }

  // return just one center that the id matches the parmas id
  static getOneCenter(req, res) {
    Center.findById(req.params.id, {
      include: [{
        model: Event,
        as:
        'events'
      }],
    })
      .then((center) => {
        if (center) {
          res.status(200).json({
            message: 'Center',
            center
          });
        } else {
          res.status(400).json({
            message: 'center not found'
          });
        }
      });
  }

  // Admin can add new center to the db
  static createCenter(req, res) {
    Center.create({
      centerName: req.body.name,
      city: req.body.city,
      address: req.body.address,
      about: req.body.about,
      facility: req.body.facility,
      availability: req.body.availability,
      imageurl: req.body.imageurl,
      imageId: req.body.publicUrlId,
      userId: req.user.id
    })
      .then(center => res.status(201).json({
        message: 'successfully created',
        center
      }))
      .catch(error => res.status(400).json({
        message: 'Unable to create Center! ',
        error
      }));
  }


  // Admin can edit a center
  static editCenter(req, res) {
    const { oldpublicId, publicUrlId } = req.body;
    deletePicture(oldpublicId, publicUrlId);
    Center.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
      .then((center) => {
          center.update({
            centerName: req.body.name,
            city: req.body.city,
            address: req.body.address,
            about: req.body.about,
            facility: req.body.facility,
            availability: req.body.availability,
            imageurl: req.body.imageurl,
            imageId: req.body.publicUrlId,
          });
          res.status(200).json({
            message: 'updated',
            center
          });
      })
      .catch(err => res.status(404).json({
        message: 'You dont own any center with that id',
        err
      }));
  }

  // admin can delete a center
  static deleteCenter(req, res) {
    Center.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
      .then((center) => {
        deletePicture(center.imageId, 'publicUrlId');
        if(center){
          res.status(200).json({
            message: 'Center successfully deleted!'
          });
        }else{
          res.status(404).json({
            message: 'You dont own any center with that id!!'
          })
        }
         
      })
    }
}

export default Centers;

          