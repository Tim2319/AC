const express = require("express")
const { engine } = require("express-handlebars")
const restaurantsData = require("./public/jsons/restaurant.json").results
const app = express()
const port = 3000

app.engine(".hbs", engine({ defaultLayout: "main.hbs" }))
app.set("view engine", ".hbs")
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index",{ restaurantsData })
})


app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const filterRestaurantsData = restaurantsData.filter(
    data =>
      data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
  )

  res.render("index", { restaurantsData: filterRestaurantsData, keywords })
})

app.get("/restaurant/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  const restaurantData = restaurantsData.find(
    data => data.id === Number(restaurantId)
    // 也可使用 e.id === +restaurantId
  )
  res.render("show", { restaurantData })
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})