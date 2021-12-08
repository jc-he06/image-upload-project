------Introduction of the project

- This an image-upload web application for diary purpose through building web pages UI and RESTful API by using HTML, CSS, and Node.js.  

- This app allows users to upload the images they want, and those uploaded images will be stored in local directory named 'uploads' and can be displayed in the form of gallery.  

- The login page will work as part of the UI and help secure the privacy of the user.  

- Specific tools used to build the API with are express framework  (Performing the task of routing) 
and a couple of Node.js modules such as ‘busboy’ (Implementing the image upload feature) and ‘pug’ template engine (Creating html to display uploaded images).  










------ Method to setup enviroment before you test it on you end:

- Step 1: Install Node.js on your device, the link below is to download the Node.js installer and choose the right one based on the system type of you device.
                
                Node.js download link: https://nodejs.org/en/download/
                
- Step 2: Once you finish download Node.js on your devece, just download the source code file 'nodejsmodule' to the directory you want,
        and open command prompt and access to the directory where you stored the source code file with the command (cd [directory name).
        
- Step 3: Run command 
                  
                  'npm install express busboy body-parser bcrypt fs pug --save' 
               

- Step 4: Run command 

                   'node app.js'










------ Test the web application

- Once you finish the steps above, you will see your command prompt show statements like 


             Application is running at : localhost:8080 
             server is listening on port: 3000

- Then now you can open your browser, and enter the url link of the app 
                    
                    "http://localhost:3000" 
  
  and get the web application for testing.

- Once you get to the page, there will be two options, first one is 'Register' and the other is 'Login'.  Just go register and then use your registered info to login.

- After you finishing login,  click 'Main page' to get to the image upload page.

- When you get to the image upload page, you can just upload whatever image you want locally and click upload.


- 'Choose File': select the image file you want to upload.
- 'Upload': Upload the selected image file to directory name 'uploads'.
- 'view image': all uploaded image(s) will be displayed as the gallery.



