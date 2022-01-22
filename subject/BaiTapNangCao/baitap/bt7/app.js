const cards = document.querySelectorAll('.laptop-card')
const names = document.querySelectorAll('.laptop-name')

for (let i = 0; i < cards.length; i++) {
   cards[i].addEventListener('click', function () {
      let cardName = cards[i].textContent.toUpperCase()
      for (let i = 0; i < names.length; i++) {
         let item = names[i].textContent.toUpperCase()
         if (item.includes(cardName) || cardName === "TẤT CẢ SẢN PHẨM") {
            names[i].parentElement.classList.add('show')
            names[i].parentElement.classList.remove('hide')
         }
         else {
            names[i].parentElement.classList.remove('show')
            names[i].parentElement.classList.add('hide')
         }
      }
   })
}