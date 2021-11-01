import "../style/style.scss"
if (document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded', ready)
} else ready()

function ready()
{
    UpdateCardCounter()
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    for (let i = 0; i < sessionStorage.length; i++){
        let storedTitle = sessionStorage.key(i)
        if (title == storedTitle)
        {
            alert("Цей товар вже є в корзині!")
            return
        }
    }
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let image = shopItem.getElementsByClassName('shop-item-image')[0].src
    let key = title
    let item = {
        title:title,
        price:price,
        image:image
    }
    sessionStorage.setItem(key, JSON.stringify(item))
    UpdateCardCounter()
    console.log(sessionStorage.getItem(key))
}
function UpdateCardCounter(){
    document.getElementsByClassName('cart-counter')[0].innerText = sessionStorage.length
}