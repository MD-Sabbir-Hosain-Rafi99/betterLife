// Set your target date here
const countdownDate = new Date("2026-01-31T00:00:00").getTime();

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













// 

const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const quantityInput = document.getElementById('quantity');
const buyBtn = document.getElementById('buyBtn');

const priceEl = document.getElementById('price');
const totalEl = document.getElementById('totalPrice');
const unitPrice = parseInt(priceEl.innerText, 10);

const orderModal = document.getElementById("orderModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const confirmBtn = document.getElementById("confirmBtn");

const scriptURL = "https://script.google.com/macros/s/AKfycbyQ0Ei1lqvZ7YpDegm0B6ADPkpfyWTprZ14qRIqhPmhrqKWuZyQWs8jVDWdOHT-8mKqbg/exec";

function updateTotal() {
  const qty = parseInt(quantityInput.value, 10);
  totalEl.innerText = qty * unitPrice;
}
updateTotal();

decreaseBtn.addEventListener('click', () => {
  let qty = parseInt(quantityInput.value, 10);
  if (qty > 1) {
    quantityInput.value = qty - 1;
    updateTotal();
  }
});

increaseBtn.addEventListener('click', () => {
  let qty = parseInt(quantityInput.value, 10);
  quantityInput.value = qty + 1;
  updateTotal();
});

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  quantityInput.value = "1";
  updateTotal(); // ✅ 1200 issue fix
}

buyBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const quantity = parseInt(quantityInput.value, 10);
  const totalPrice = parseInt(totalEl.innerText, 10);

  if (!name || !phone || !address) {
    modalTitle.innerText = "Missing Information";
    modalBody.innerHTML = `<p class="text-red-600 font-semibold">Please fill all the details!</p>`;
    confirmBtn.classList.add("hidden");
    orderModal.showModal();
    return;
  }

  // ✅ Show confirmation modal
  modalTitle.innerText = "অনুগ্রহ করে আপনার অর্ডারটি কনফার্ম করুন";
  modalBody.innerHTML = `
    <div class="space-y-2">
      <p><b>Name:</b> ${name}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Address:</b> ${address}</p>
      <p><b>Quantity:</b> ${quantity}</p>
      <p class="text-lg"><b>Total:</b> ${totalPrice} ৳</p>
    </div>
  `;
  confirmBtn.classList.remove("hidden");
  confirmBtn.disabled = false;
  confirmBtn.innerText = "Confirm & Submit";

  orderModal.showModal();

  // ✅ Confirm button handler (remove previous to avoid multiple submit)
  confirmBtn.onclick = async () => {
    confirmBtn.disabled = true;
    confirmBtn.innerText = "Submitting...";

    // NOTE: no-cors এ real response পড়া যায় না, কিন্তু network error না হলে then এ যাবে
    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({ name, phone, address, quantity, totalPrice }),
      headers: { "Content-Type": "application/json" },
      mode: "no-cors"
    })
      .then(() => {
        // ✅ Success modal (same modal reuse)
        modalTitle.innerText = "✅ Order Submitted!";
        modalBody.innerHTML = `
        <p class="font-semibold">আপনার অর্ডারটি গ্রহণ করা হয়েছে</p>
        <p class="text-sm opacity-80 mt-2">আমাদের কাস্টমার কেয়ার প্রতিনিধি অতি শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
      `;
        confirmBtn.classList.add("hidden");
        resetForm();
      })
      .catch((err) => {
        modalTitle.innerText = "❌ Submission Failed";
        modalBody.innerHTML = `<p class="text-red-600 font-semibold">Error while submitting order!</p>`;
        confirmBtn.disabled = false;
        confirmBtn.innerText = "Try Again";
        console.error(err);
      });
  };
});
