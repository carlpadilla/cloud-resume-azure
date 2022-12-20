window.addEventListener("DOMContentLoaded", (event) => {
  getVisitCount()
})

const functionAPI = ""

const getVisitCount = () => {
  let count = 30
  fetch(functionAPI)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log(" Website called function API!!")
      count = res.count
      document.getElementById("counter").innerText = count
    })
    .catch((err) => {
      console.log(err)
    })
  return count
}
