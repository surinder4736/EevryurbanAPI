import { Models, sequelize } from '../models';
const { tableCode } = Models;
class ContactUs {
  static create(req, res) {
    const {id,code, label, type } = req.body
    console.log("---Request body Coming Data---");
    console.log(code+""+label+""+type)
    if(id==0){
      tableCode.create({code,label,type})
      .then((result)=>{
       if(result){
             return res.status(200).send({successMessage:'Code Saved successfully',status:200,codeExecute:'Save'});
       }else{
         return res.status(404).send({errorMessage:'Sorry data not found',status:404});
       } 
      }).catch((error)=>{
        console.log("Sorry something went wrong");
         return res.status(501).send({errorMessage:error,status:501});
      })
    }else{
      tableCode.findOne({where:{id}}).then((resultData)=>{
           tableCode.update({code:code,label:label,type:type},{where:{id}}).then((result)=>{
            return res.status(200).send({successMessage:'Code Updated successfully',status:200,codeExecute:'Update' });
            }).catch((error)=>{
           const{original}=error;
           if(original!=null && original.code=="23505"){
             return res.status(501).send({errorMessage:'Sorry this code alredy exist',status:501});
           }else{
           // console.log(original.code);
            return res.status(501).send({errorMessage:'Sorry something went wrong '+error,status:501});
           }
           
          })
        }).catch((error)=>{
          return res.status(501).send({errorMessage:'Sorry something went wrong '+error,status:501});
          
        })
      
    }
     
  
    
    
  }
}

export default ContactUs