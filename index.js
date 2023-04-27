//this program generates a random image of a dog or a particular image of a dog using DOG API.
//superagent api is used for the HTTP requests
//a dog name is initially written in a file called dog.txt
//that dog.txt file is read using asynchronous functions/promises/async-await
//by creating a write file name of the dog written will be substituted in a url which directs to the dog image using dog api. 

const fs = require('fs');
const superagent = require('superagent');

//reading the dog.txt using promises

const readFilePromise = file=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            if (err){
                reject('I could not find that file 😢');
            }
            resolve(data);

        });

    });
}

//writing the link into new dogLink.txt
const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, data, err => {
        if (err) reject('Could not write file 😢');
        resolve('success');
      });
    });
  };

const getDogPic = async ()=>{
    try{
        //content in readFile callback is stored into variable data 
        const data = await readFilePromise(`${__dirname}/dog.txt`);

        //data is then substituted in the below link by template variables
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);

        //finally the url in saved in the new dogLink.txt file
        await writeFilePromise('DogImgURL.txt',res.body.message);
        console.log('image url saved');
    }
    catch(err){
        console.log(err);
    }
}















// fs.readFile(`${__dirname}/dog.txt`,(err,data)=>{
//     console.log(`${data}`);

// superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(result=>{
//     console.log(result.body.message);
// })
//     .catch(err=>{
//         console.log('not found');
    
// })

// fs.writeFile(`dogLink.txt`,result.body.message,(err)=>{
// console.log("dog img saved");
// })
// })