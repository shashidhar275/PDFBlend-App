const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const multer = require('multer'); //Multer is a middleware used to upload files to the server 
const upload = multer({dest: 'uploads/'});
const mergePdfs = require('./merge');
app.use('/static', express.static('public')); //Whateverr the content present in the public folders that will come into the static folder


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'templates','index.html'));
});

app.post('/merge', upload.array('pdfs',2),async(req,res,next)=>{
    console.log(req.files[0].path);
    let d = await mergePdfs(path.join((__dirname,req.files[0].path)),path.join((__dirname,req.files[1].path)));
    res.redirect(`./static/${d}.pdf`);
    // res.send({'data': req.files});
})

app.listen(port,()=>{
    console.log(`App listening on port http://localhost:${port}`)
});