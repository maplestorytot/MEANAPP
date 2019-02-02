1) put the logic from the routes into controllers that act as middleware
2) take middleware multer an put into another middleware and just export into routes
3) put angular material, posts imports into it's own module and export it into <app.module.ts>




Lazy loading: to load components later not all at once
1) Put routes you don't want to immediately load somewhere else eg authroutingmodule.ts
2) import those into auth.module.ts. when exporting to app. module use for child to send the routes

3) when importing to auth-routing using loadchildren for the routes  {path:'auth',loadChildren:"./auth/auth.module#AuthModule"}

4)That way, when the app module runs, it will only load auth routing when you click login


Global Angular Config:
When changing domains don't need to remake entire routes, just use constants and use envirnoment variables that you can change

1) in post services create a global const

const BACKEEND_URL="/posts";


2)  in environments.ts  create api Url as enviornment variables
export const environment = {
  production: false,
  apiUrl:"http://localhost:3000/api"
};

3) replace urls with this
<this.http.delete(BACKEEND_URL + postId);




Creating Node Envirnoment Variables

1) create nodemon.json
2) create enviornment variabels 
{
  "env":{
    "MONGO_ATLAS_PASS":"SEYF2IITUY18JTkC",
    "JWT_KEY":"secret_this_should_be_longer"
  }
}


3) they can be accessed like so
        process.env.JWT_KEY
