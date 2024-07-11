1.install package.json 
//npm init -y
2.install dependencise express,mongoose,typescript
//npm i express mongoose typescript
3.install dev dependecise nodemon,ts-node 
//npm i --save-dev nodemon ts-node 
4.create file integration to typescript 
//npx tsc --init 
5.add include and exclude to the end the file tsconfig.json 
"include":["src/**/*"],
"exclude":["node_modules"],
6.craete the src folder and the entry point index.ts file 
7.convert ts code to js code 
"outDir": "./dist" make it on in tsconfig.json 
8.create nodemon.json 
