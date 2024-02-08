import  Express  from "express";
const port = 3000;
const app = Express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/clients', function(req, res) {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})