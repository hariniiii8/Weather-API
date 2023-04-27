const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");


})

app.post("/",function(req,res)
{
    const query=req.body.cityName;
  const apiKey="";
  const units="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url,function(response)
{
  console.log(response.statusCode);

  response.on("data",function(data)
{
  const weatherData= JSON.parse(data);

  const weatherDescription=weatherData.weather[0].description;
  const icon=weatherData.weather[0].icon;
  const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"


  const temp=weatherData.main.temp;

  const obj=
  {
    name:"Harini",
    favfood:"Biryani",
  }
  console.log(obj);
   res.write('<head><meta charset="utf-8"></head>');
  res.write("<h1>The temperature in "+req.body.cityName+" is: "+temp+" degrees Celsius .</h1>");
  res.write("<h2> <br>  The weather  is  currently "+weatherDescription+"</h2>");
  res.write("  <br> <img src="+ imageURL +">");
  res.send();
})
})
})

app.listen(3000,function()
{
console.log("Server is running on port 3000");
});
