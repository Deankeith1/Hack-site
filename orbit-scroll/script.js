document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollBtn');
  const buyButtons = document.querySelectorAll('.buyBtn');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const fakeCardForm = document.getElementById('fakeCardForm');
  const thankYouMsg = document.getElementById('thankYouMsg');

  let cart = [];

  // Ana sayfadaki Satın Al butonu
  scrollBtn.addEventListener('click', () => {
    document.getElementById('purchaseSection').scrollIntoView({ behavior: 'smooth' });
  });

  // Ürün satın alma butonları
  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.parentElement;
      const name = card.querySelector('h3').innerText;
      const price = parseInt(card.querySelector('.price').innerText);

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }
      updateCart();
    });
  });

  // Sepet güncelleme fonksiyonu
  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement('li');

      const itemInfo = document.createElement('span');
      itemInfo.innerText = `${item.name} - ${item.price}₺ x ${item.quantity} = ${item.price * item.quantity}₺`;

      const btnGroup = document.createElement('div');

      const decBtn = document.createElement('button');
      decBtn.innerText = '−';
      decBtn.title = 'Adet azalt';
      decBtn.addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        updateCart();
      });

      const incBtn = document.createElement('button');
      incBtn.innerText = '+';
      incBtn.title = 'Adet artır';
      incBtn.addEventListener('click', () => {
        item.quantity += 1;
        updateCart();
      });

      const removeBtn = document.createElement('button');
      removeBtn.innerText = '×';
      removeBtn.title = 'Ürünü kaldır';
      removeBtn.style.color = 'red';
      removeBtn.addEventListener('click', () => {
        cart.splice(index, 1);
        updateCart();
      });

      btnGroup.appendChild(decBtn);
      btnGroup.appendChild(incBtn);
      btnGroup.appendChild(removeBtn);

      li.appendChild(itemInfo);
      li.appendChild(btnGroup);

      cartItems.appendChild(li);

      total += item.price * item.quantity;
    });

    cartTotal.innerText = total + '₺';

    // Sepet boşsa satın alma butonunu gizle
    if (cart.length > 0) {
      checkoutBtn.style.display = 'inline-block';
    } else {
      checkoutBtn.style.display = 'none';
      fakeCardForm.style.display = 'none';
      thankYouMsg.style.display = 'none';
    }
  }

  // Satın alma butonuna tıklayınca form göster
  checkoutBtn.addEventListener('click', () => {
    fakeCardForm.style.display = 'block';
    thankYouMsg.style.display = 'none';
    fakeCardForm.scrollIntoView({ behavior: 'smooth' });
  });

  // Form gönderildiğinde
  fakeCardForm.addEventListener('submit', (e) => {
    e.preventDefault();

    alert('Ödeme işlemi başarılı!');

    fakeCardForm.style.display = 'none';
    thankYouMsg.style.display = 'block';

    cart = [];
    updateCart();
  });

});
