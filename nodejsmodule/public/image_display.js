const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, '../uploads')))

app.get('/get-images', (req, res) => {
    let images = getImagesFromDir(path.join(__dirname, '../uploads'));
     res.render('view', { title: 'Uploaded Image', images: images })
});

const dirPath = '../uploads';
function getImagesFromDir(dirPath) {

    // All iamges holder, defalut value is empty
    let allImages = [];

    // Iterator over the directory
    let files = fs.readdirSync(dirPath);

    // Iterator over the files and push jpg and png images to allImages array.
    for (file of files) {
        let fileLocation = path.join(dirPath, file);
        var stat = fs.statSync(fileLocation);
        if (stat && stat.isDirectory()) {
            getImagesFromDir(fileLocation); // process sub directories
        } else if (stat && stat.isFile() && ['.jpg', '.png'].indexOf(path.extname(fileLocation)) != -1) {
            allImages.push('static/'+file); // push all .jpf and .png files to all images
        }
    }

    // return all images in array formate
    return allImages;
}

app.listen(8080, function () {
    console.log(`Application is running at : localhost:8080`);
});
