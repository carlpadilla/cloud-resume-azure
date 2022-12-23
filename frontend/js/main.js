window.addEventListener("DOMContentLoaded", (event) => {
  getVisitCount()
})

const functionAPI =
  "https://cpresume.azurewebsites.net/api/getResumeCounter?code=idu-Im8g3CYOYmUOf2wREoIWs91T13s8oVTwByxqpJM9AzFuzAbYTw=="

const getVisitCount = () => {
  let count = 30
  fetch(functionAPI)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log(" Hire me, please!")
      count = res.count
      document.getElementById("counter").innerText = count
    })
    .catch((err) => {
      console.log(err)
    })
  return count
}
