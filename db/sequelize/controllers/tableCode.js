import { Models, sequelize } from '../models';
const { tableCode } = Models;

class TableCode {
  
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
  
    static getCodeList(req, res) {
         tableCode.findAll({order: [['id', 'DESC']]}).then((data)=>{
           if(data){
             return res.status(200).send({codeList:data});
           }else{
             return res.status(404).send({error:'sorry data not found',status:404});
           }
         }).catch((error)=>{
          return res.status(501).send({error:error});
         });
      }
    static modifyCode(req, res) {
    const { code,label,type } = req.body
    console.log(code);
       tableCode.findOne({where:{code}}).then((data)=>{
        if(data){
          tableCode.update({label:label,type:type},{where:{code}}).then((result)=>{
            return res.status(200).send({successMessage:'Updated successfully',status:200});
          }).catch((error)=>{
            return res.status(501).send({errorMessage:'Sorry something went wrong',status:501});
          })
        }
        //return res.status(200).send({mydata:data});
       }).catch((error)=>{
         console.log(error);
       })
    }
   static deleteCode(req, res) {
        return tableCode
          .findById(req.params.id)
          .then(data => {
            if(!data) {
              return res.status(404).send({
              message: 'Data Not Found',
              });
            }
            return data.destroy()
                .then(() => res.status(200).send({
                  successMessage: 'Data successfully deleted',
                  codeExecute:'Delete',
                  status:200
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }

}

export default TableCode