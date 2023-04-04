const { BlockBlobClient, BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');

const uploadFileToBlob = (filePath, sasUrl, fileName, metadata) => {
    return new Promise((resolve, reject) => {
      // Create a BlockBlobClient from the SAS URL
      const blockBlobClient = new BlockBlobClient(sasUrl);
      console.log('hiii');
      // Open the file in a read stream
      const readStream = fs.createReadStream(filePath);
      // Upload the file to the container
      //const container = blobServiceClient.getContainerClient('crm');
      
      blockBlobClient.uploadStream(readStream, fileName, metadata, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
};

async function storeImageInAzure(filePath, sasUrl, fileName, container){
  try{
    const blobServiceClient = new BlobServiceClient(sasUrl);
    const containerClient = blobServiceClient.getContainerClient(container);
    //await containerClient.create();
    //console.log(containerClient);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName)
    const readStream = fs.createReadStream(filePath);
    await blockBlobClient.uploadStream(readStream);
    console.log('Upload function completed!!!...');
  } catch (error){
    console.error(error);
  }
}

// const filePath = 'path/to/file.jpg';
// const sasUrl = 'https://[storage-account-name].blob.core.windows.net/[container-name]?[sas-token]';
// const fileName = 'image.jpg';
// const metadata = {
//   'content-type': 'image/jpeg'
// };

module.exports = { uploadFileToBlob, storeImageInAzure } 