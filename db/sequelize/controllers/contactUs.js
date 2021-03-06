import { Models, sequelize } from '../models';
import axios from 'axios';
import { privateLocalAddress,CONATACTUS_TO_EMAIL as contactus_email,EMAIL_CC as cc_email} from '../../../config/env';
const { contactUs } = Models;
class ContactUs {
  static create(req, res) {
    try {
      const {id,fname, lname, email,enquiry_type,message } = req.body
    console.log("---Request body Coming Data---");
    console.log(fname+""+lname+"Email: "+email)
    if(id==0){
      contactUs.create({fname,lname,email,enquiry_type,message})
      .then((result)=>{
       if(result){
          console.log("private adress: " +privateLocalAddress);
          axios.post(privateLocalAddress+'/api/sendContactusEmail', {fname:fname,lname:lname,email:email,enquiry_type:enquiry_type,message:message,contactus:contactus_email,email_cc:cc_email}).then((response)=>{
          if(response){
            console.log('Sent email verification');
            //console.log(response);
          }
         }).catch((err) => {
         console.log('Error in sending Email'+err);
         });
        return res.status(200).send({successMessage:'Thank you for reaching out to us. We will contact you as soon as possible.',status:200,codeExecute:'Save'});
       } 
      }).catch((error)=>{
        console.log("Sorry something went wrong");
         return res.status(501).send({errorMessage:'sorry something went wrong'+error,status:501});
      })
    }
    } catch (error) {
      return res.status(501).send({errorMessage:'sorry something went wrong'+error,status:501})
    }
    
}

}

export default ContactUs