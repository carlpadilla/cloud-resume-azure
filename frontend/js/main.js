window.addEventListener("DOMContentLoaded", (event) => {
  getVisitCount()
})

const functionAPI =
  "https://carlsresume.azurewebsites.net/api/getCount?code=RhezCd59IqyZj0M1KgkCDMesqB3lV-wqi61ho0EFMIyWAzFuKc66bw=="

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
