const dotenv = require('dotenv')
require('dotenv').config()
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

const rekognition = new AWS.Rekognition();

module.exports = {
    user :async function(req,res){
       try{
        const file = req.files.file;
        const detectLabelsParams = {
          Image: {
            Bytes: file.data 
          },
         // MaxLabels: 10, // Maximum number of labels to detect
        //  MinConfidence: 70 // Minimum confidence level for detected labels
        };
        
        rekognition.detectLabels(detectLabelsParams, (err, data) => {
          if (err) {
            return res.status(500).json({ message: 'Unable to process the request.' });
          }
        
          const labels = data.Labels.map(label => label.Name);
           return res.status(200).json({labels:labels})
        });
       }
       catch (error) {
               console.log(error)
               res.status(500).send({message:error})
        }
    },
}