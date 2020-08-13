const express = require("express"); //Gets Express Service
const cors = require("cors"); //Gets Cors Service

const app = express(); //Creates Backend App
app.use(cors()); //Removes Cors Error
app.use(express.json()); //Allows Backend To Read Json

let userData = [];

app.get("/", (request, respons) => {
  //Returns Recieved if Backend is Contacted with empty direction
  respons.json({
    message: "Recevied!",
  });
});

app.get("/tweet", (request, response) => {
  response.json(userData);
});

app.post("/tweet", (request, response) => {
  const data = {
    //Converts Json Into Object
    firstname: request.body.firstname.toString(),
    lastname: request.body.lastname.toString(),
    message: request.body.comment.toString(),
  };

  let foundUser = false;
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].name === data.firstname + " " + data.lastname) { 
      userData[i].comments.push(data.message);
      foundUser = true;
      break;
    }
  }
  if (!foundUser) {
    userData.push({
      name: data.firstname + " " + data.lastname,
      comments: [data.message],
    });
  }

  console.log(data);
  console.log(userData);
});

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
