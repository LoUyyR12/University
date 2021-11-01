if (document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded', ready)
} else ready()

function ready()
{
    UpdateCardCounter()
    console.log(sessionStorage)
    for (let i = 0; i < sessionStorage.length; i++)
    {
        let title = sessionStorage.key(i)
        let price = JSON.parse(sessionStorage.getItem(title)).price
        let image = JSON.parse(sessionStorage.getItem(title)).image
        addItemToCart(title,price,image)
    }
    UpdateCardTotal()
    let removeCartButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartButtons.length; i++)
    {
    let button = removeCartButtons[i]
    button.addEventListener('click', RemoveCartItem)
    }
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++)
    {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
function purchaseClicked(event){
    if (!sessionStorage.length) {
        alert('Ви ще не вибрали жодного товару для здійснення покупки!')
        return
    }
    alert(`
    Thank you for purchasing our handmade for ${document.getElementsByClassName('cart-total-price')[0].innerText}!
    `)
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    sessionStorage.clear()
    UpdateCardTotal()
    UpdateCardCounter()
}

function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let image = shopItem.getElementsByClassName('shop-item-image')[0].src
    let key = 0
    if (sessionStorage.length) key = sessionStorage.length + 1;
    let item = {
        title:title,
        price:price,
        image:image
    }
    sessionStorage.setItem(key, JSON.stringify(item))
}

function addItemToCart(title, price, imageSrc, sessionKey){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    let cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', RemoveCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', RemoveCartItem)
}

function RemoveCartItem(event)
{
    let buttonClicked = event.target
    let item = buttonClicked.parentElement.parentElement
    let title = item.getElementsByClassName('cart-item-title')[0].innerText
    item.remove()
    sessionStorage.removeItem(title)
    UpdateCardTotal()
    UpdateCardCounter()
}

function quantityChanged(event)
{
    let input = event.target
    if (isNaN(input.value) || input.value <= 0)
    {
        input.value = 1;
    }
    UpdateCardTotal()
}

function UpdateCardTotal()
{
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++)
    {
        let cartRow = cartRows[i]
        let priceElevent = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElevent.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$'+ total
}

function UpdateCardCounter(){
    document.getElementsByClassName('cart-counter')[0].innerText = sessionStorage.length
}