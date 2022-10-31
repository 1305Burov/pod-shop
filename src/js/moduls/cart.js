export const cart = () => {
    const hero = document.getElementById('hero');
    const modals = document.getElementById('modals');
    const form = document.getElementById('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        e.target.parentElement.classList.add('close');
        e.target.parentElement.nextElementSibling.classList.remove('hidden');

        let close = setTimeout(() => {
            e.target.parentElement.nextElementSibling.classList.add('close');
              
            clearTimeout(close);
        }, 1000);

        let clear = setTimeout(() => {
            e.target.parentElement.parentElement.classList.add('hidden');
            e.target.parentElement.nextElementSibling.classList.add('hidden');
            e.target.parentElement.classList.add('hidden');
            e.target.parentElement.previousElementSibling.classList.remove('close');
            e.target.parentElement.nextElementSibling.classList.remove('close');
            e.target.parentElement.classList.remove('close');  

            clearTimeout(clear);
        }, 1500);
        
        //fetching a data start
        //fetching a data end

        localStorage.setItem('cart', JSON.stringify([]));
        changeCount();
    });

    hero.addEventListener('click', (e) => {
        if (e.target.closest('.cart') || e.target.classList.contains('cart__icon')) {
            modals.classList.remove('hidden');
            
            orderListRender();
        }

        if (e.target.classList.contains('btn')) {
            const product = e.target.parentElement.previousElementSibling.textContent;
            addToCart(product);
            
            e.target.nextElementSibling.nextElementSibling.classList.add('adding');

            let animate = setTimeout(() => {
                e.target.nextElementSibling.nextElementSibling.classList.remove('adding');
                clearTimeout(animate);
            }, 500);
        }
    })

    modals.addEventListener('click', (e) => {
        if (e.target.classList.contains('modals__close')) {
            e.target.parentElement.classList.add('close');

            let close = setTimeout(() => {
                modals.classList.add('hidden');

                e.target.parentElement.classList.remove('close');  
                clearTimeout(close);
            }, 500);
            
        }

        if (e.target.classList.contains('cart__button')) {
            e.target.parentElement.classList.add('close');
            e.target.parentElement.nextElementSibling.classList.remove('hidden');
        }

        if (e.target.closest('.modals__back')) {
            document.getElementById('modal-order').classList.add('hidden');
            document.getElementById('modal-cart').classList.remove('close');
        }

        if (e.target.classList.contains('add')) {
            const cartData = JSON.parse(localStorage.getItem('cart'));
            cartData.find((item) => {
                const searchingItem = e.target.parentElement.parentElement.textContent.split('+')[0];
                searchingItem === item.product && item.count++
            })

            localStorage.setItem('cart', JSON.stringify(cartData));
            changeCount();
            orderListRender();
        }

        if (e.target.classList.contains('reduce')) {
            const cartData = JSON.parse(localStorage.getItem('cart'));
            cartData.find((item) => {
                const searchingItem = e.target.parentElement.parentElement.textContent.split('+')[0];
                searchingItem === item.product && item.count > 1 && item.count--
            })

            localStorage.setItem('cart', JSON.stringify(cartData));
            changeCount();
            orderListRender();
        }

        if (e.target.closest('.remove')) {
            const cartData = JSON.parse(localStorage.getItem('cart'));
            const result = cartData.filter((item) => {
                const searchingItem = e.target.closest('.remove').parentElement.parentElement.textContent.split('+')[0];
                return searchingItem !== item.product
            })
            
            localStorage.setItem('cart', JSON.stringify(result));
            changeCount();
            orderListRender();
        }
    })

    const orderListRender = () => {
        const cart = document.getElementById('modal-cart');
        
        if (JSON.parse(localStorage.getItem('cart'))) {
            const render = JSON.parse(localStorage.getItem('cart')).map((item) => {
                return `<li class="cart__item"><span class="product">${item.product}</span><div class="cart__actions"><button class="add">+</button><span class="count">${item.count}</span><button class="reduce">-</button><button class="remove"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.71429 3.42947H0.571429C0.419876 3.42947 0.274531 3.36927 0.167368 3.26211C0.0602039 3.15496 0 3.00962 0 2.85808C0 2.70654 0.0602039 2.56121 0.167368 2.45405C0.274531 2.34689 0.419876 2.28669 0.571429 2.28669H5.14286V0.571388C5.14286 0.419846 5.20306 0.274512 5.31023 0.167356C5.41739 0.0601997 5.56273 0 5.71429 0H10.2857C10.4373 0 10.5826 0.0601997 10.6898 0.167356C10.7969 0.274512 10.8571 0.419846 10.8571 0.571388V2.28669H15.4286C15.5801 2.28669 15.7255 2.34689 15.8326 2.45405C15.9398 2.56121 16 2.70654 16 2.85808C16 3.00962 15.9398 3.15496 15.8326 3.26211C15.7255 3.36927 15.5801 3.42947 15.4286 3.42947H14.2857V15.4286C14.2857 15.5802 14.2255 15.7255 14.1183 15.8326C14.0112 15.9398 13.8658 16 13.7143 16H2.28571C2.13416 16 1.98882 15.9398 1.88165 15.8326C1.77449 15.7255 1.71429 15.5802 1.71429 15.4286V3.42947ZM9.71429 2.28669V1.14392H6.28571V2.28669H9.71429ZM2.85714 14.8572H13.1429V3.42947H2.85714V14.8572ZM6.28571 12.5717C6.13416 12.5717 5.98882 12.5115 5.88165 12.4043C5.77449 12.2972 5.71429 12.1518 5.71429 12.0003V6.28641C5.71429 6.13487 5.77449 5.98953 5.88165 5.88238C5.98882 5.77522 6.13416 5.71502 6.28571 5.71502C6.43727 5.71502 6.58261 5.77522 6.68978 5.88238C6.79694 5.98953 6.85714 6.13487 6.85714 6.28641V12.0003C6.85714 12.1518 6.79694 12.2972 6.68978 12.4043C6.58261 12.5115 6.43727 12.5717 6.28571 12.5717ZM9.71429 12.5717C9.56273 12.5717 9.41739 12.5115 9.31022 12.4043C9.20306 12.2972 9.14286 12.1518 9.14286 12.0003V6.28641C9.14286 6.13487 9.20306 5.98953 9.31022 5.88238C9.41739 5.77522 9.56273 5.71502 9.71429 5.71502C9.86584 5.71502 10.0112 5.77522 10.1183 5.88238C10.2255 5.98953 10.2857 6.13487 10.2857 6.28641V12.0003C10.2857 12.1518 10.2255 12.2972 10.1183 12.4043C10.0112 12.5115 9.86584 12.5717 9.71429 12.5717Z" fill="#FF5C5C"/>
                </svg></button></div></li>`
            }).join('');

            cart.innerHTML = `<div class="modals__close"></div>
            <h2 class="cart__heading">Ваши заказы:</h2>
            <ul class="cart__list">${render}</ul>
            <div class='cart__price'>
                <span>Итого:</span>
                <div>${ JSON.parse(localStorage.getItem('cart')).reduce((p, item) => {
                    return p += item.count;
                }, 0) * 249}</div>
            </div>
            <button class="cart__button">Оформить заказ</button>`;
        }else {
            cart.innerHTML = `<div class="modals__close"></div>
            <h2 class="cart__heading">Ваши заказы:</h2><p class="cart__text">Ваша корзина пуста</p>`;
        }
    }
    

    const changeCount = () => {
        const cartCount = document.querySelectorAll('.cart__count');
        
        if (JSON.parse(localStorage.getItem('cart'))) {
            const count = JSON.parse(localStorage.getItem('cart')).reduce((p, item) => {
                return p += item.count;
            }, 0);
            
            cartCount.forEach((item) => {
                item.classList.remove('cart_hidden');
                item.textContent = count;
            })
    
        }else {
            cartCount.forEach((item) => {
                item.classList.add('cart_hidden');
            })
        }
    }

    const addToCart = (product) => {
        const cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if (cartData.some((item) => item.product === product)) {
            cartData.map((item) => {
                if (item.product === product) {
                    item.count++;
                }
            });
        }else {
            cartData.push({product, count: 1});
        }

        localStorage.setItem('cart', JSON.stringify(cartData));
        changeCount();
    }

    changeCount();
}