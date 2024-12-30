# Image Processing API

## Project Summary
This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js express server rather than a database. The project you create serves two purposes: to prepare you for setting up scalable code and architecture for real-world projects and tie together some of the most popular middleware and utilities found in Node.js projects. This project barely touches the surface of what is possible but will prove your ability to use what you’ve learned in real-world scenarios.

For this project, refactor and test as much as possible while you are building. Since you are using TypeScript and an unfamiliar library, it is sometimes easier to write and build in plain JS to see what your functions return; remember your submission needs to be in TypeScript. As your skills improve, typing in TypeScript will feel more intuitive. Make sure to remove any debugging code from your final submission.

## Structure
<pre>
Project Root Directory
├── readme.md
├── images
├── spec
│   ├── api
│   │   └── image.spec.ts
│   ├── helpers
│   ├── support
│   └── index.spec.ts
├── src
│   ├── api
│   │   └── image.ts
│   ├── handlers
│   │   └── imageResizer.ts
│   └── index.ts
├── .env
├── .gitignore
├── package.json
├── package.json.lock
├── .eslintrc.yaml
├── .prettierrc.yml
├── tsconfig.json
└── tsconfig.tsbuildinfo
</pre>

## Instructions
Before setting up and running this project, make sure NodeJS and npm are installed in your environment.
To install, run... Please go to project dirrectory and run below command on terminal (or cmd/windows powershell..).

### Setup
`npm install`
  - Check installation result on terminal. If project installed successfull, `node_module` directory will be created without error.

### Build
  - To clean and rebuild project:\
  `npm run build`

### Test
  `npm run test`
  - Check the test result. 

### Running 
  - Start backend:\
    `npm start`

  - Start the app using below api url. You can replace INPUT_IMAGE_PATH by actual image path and/or change width/height.\
    It is OK to put image filename instead of full path, it will be auto redirected to default image directory.\
    API parameters will be validated and an error will be returned in case of invalid parameter.\
  `http://localhost:3000/api/image?inputPath=INPUT_IMAGE_PATH&width=400&height=400`\
  
## Future development
- Support video
- Support source image/video from url instead of local filepath
...

## License
This project is modified and updated for study purpose on Udacity.
Refer to https://github.com/manhvgt/cd0292-ImageProcessingAPI

The original project (starter project) is belong to Udacity https://github.com/udacity/cd0292-building-a-server-project-starter
[License](LICENSE.txt)
