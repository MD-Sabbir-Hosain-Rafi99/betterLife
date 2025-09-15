// Set your target date here
const countdownDate = new Date("2025-12-31T00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        // Countdown finished
        document.getElementById("days").innerText = 0;
        document.getElementById("hours").innerText = 0;
        document.getElementById("minutes").innerText = 0;
        document.getElementById("seconds").innerText = 0;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update timer
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

// Update immediately
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);











 const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const quantityInput = document.getElementById('quantity');
    const buyBtn = document.getElementById('buyBtn');
    const price = parseInt(document.getElementById('price').innerText);
    const totalPrice = document.getElementById('totalPrice');

    function updateTotal() {
      let qty = parseInt(quantityInput.value);
      totalPrice.innerText = qty * price;
    }

    decreaseBtn.addEventListener('click', () => {
      let qty = parseInt(quantityInput.value);
      if(qty > 1) {
        quantityInput.value = qty - 1;
        updateTotal();
      }
    });

    increaseBtn.addEventListener('click', () => {
      let qty = parseInt(quantityInput.value);
      quantityInput.value = qty + 1;
      updateTotal();
    });

    buyBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const quantity = quantityInput.value;
      const total = totalPrice.innerText;

      if(!name || !phone || !address) {
        alert("Please fill all the details!");
        return;
      }

      alert(`Order Details:\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nQuantity: ${quantity}\nTotal: ${total} ৳`);
    });

