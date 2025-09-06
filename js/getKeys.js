// Ну, если ты зашел сюда то тебе нечего делать да? 
// В любом случае, если ты зашел чтобы скопировать ключи - я бы посоветовал брать их в моём ДС, 
// Ну либо можешь взять JSON тут: https://raw.githubusercontent.com/GooDHous/KS/refs/heads/main/keys.json.
// Всё бесплатно и в почти открытом доступе.

// Список ключей будет пополняться

// / $$      /$                / $$            / $$                                          / $$      
// | $$$    /$$                | $$            | $$                                          | $$      
// | $$$$  /$$$  /$$$$$$   /$$$$$$$  /$$$$$$   | $$$$$$$  /$$   /$$   /$$  /$$  /$$  /$$$$$$ | $$$$$$$ 
// | $$ $$/$$ $ |____  $$ /$$__  $$ /$$__  $$  | $$__  $$| $$  | $$  | $$ | $$ | $$ /$$__  $$| $$__  $$
// | $$  $$$| $  /$$$$$$$| $$  | $$| $$$$$$$$  | $$  \ $$| $$  | $$  | $$ | $$ | $$| $$$$$$$$| $$  \ $$
// | $$\  $ | $ /$$__  $$| $$  | $$| $$_____/  | $$  | $$| $$  | $$  | $$ | $$ | $$| $$_____/| $$  | $$
// | $$ \/  | $ | $$$$$$$|  $$$$$$$|  $$$$$$$  | $$$$$$$/|  $$$$$$$  |  $$$$$/$$$$/|  $$$$$$$| $$  | $$
// |__/     |_/ \_______/ \_______/ \_______/  |_______/  \____  $$   \_____/\___/  \_______/|__/  |__/
//                                                              /$$                                          
//                                                             | $$                                       
//                                                              \__                                        

// Ах да, я не супер хороший програмист или как там у вас это называется,
// поэтому все костыли тут это норма, в любом случае буду рад если вы сообщите о проблемах
// мне в ДС megaweh или в моём ДС сервере посвещенному обходу блокировок https://discord.gg/sspJzRsf6x 

let currentQR = null;

async function __init__(protocol) {
  const url = "https://raw.githubusercontent.com/GooDHous/KS/refs/heads/main/keys.json" 
  let response = await fetch(url);
  window.stn = {
    type :  protocol,
    keys : await response.json()
  };
}

var randomKey

function randomKeyNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function decodeKeyName(keyUrl) {
  try {
    const hashIndex = keyUrl.indexOf('#');
    if (hashIndex === -1) return "";
    
    const encodedName = keyUrl.substring(hashIndex + 1);

    return decodeURIComponent(encodedName);
  } catch (error) {
    console.error("Ошибка при получении имени ключа:", error);
    return "Неизвестное имя";
  }
}

function give() {
  const type = window.stn.type;
  if (type === "ss" || type === "vless") {
    const keys = window.stn.keys[type];
    const randomKey = keys[randomKeyNumber(0, keys.length - 1)];
    
    document.getElementById("myInput").value = randomKey;
    document.getElementById("keyName").textContent = decodeKeyName(randomKey);
  }
}

function copy() {
  const copyText = document.getElementById("myInput");
  if (!copyText.value) {
    alert('Пожалуйста нажмите Получить ключ');
    return;
  }

  copyText.select();
  navigator.clipboard.writeText(copyText.value)
    .then(() => {
      alert("Успешно скопировано: " + copyText.value);
    })
    .catch(err => {
      try {
        document.execCommand("copy");
        alert("Успешно скопировано: " + copyText.value);
      } catch (e) {
        alert("Не удалось скопировать текст: " + err);
      }
    });
}

function generateQR() {
  const keyText = document.getElementById("myInput").value;
  const qrCodeElement = document.getElementById("qrcode");
  if (!keyText) {
    alert('Пожалуйста нажмите "Получить ключ" сначала');
    return;
  }

  qrCodeElement.innerHTML = "";
  
  try {
    const typeNumber = 0; 
    const errorCorrectionLevel = 'M'; 
    const qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(keyText);
    qr.make();
    const size = 300;
    const svgString = qr.createSvgTag({
      scalable: true,
      margin: 4,
      size: size,
    });
    qrCodeElement.innerHTML = svgString;
    currentQR = svgString; 
    
    const myModal = new bootstrap.Modal(document.getElementById('qrModal'), {});
    myModal.show();
  } catch (error) {
    console.error("Ошибка при генерации QR-кода:", error);
    alert("Не удалось сгенерировать QR-код. Попробуйте еще раз.");
  }
}

function downloadQR() {
  if (!currentQR) {
    alert("Сначала сгенерируйте QR-код");
    return;
  }
  try {
    const keyName = document.getElementById("keyName").textContent.replace("Имя ключа: ", "") || "vless_key";
    const safeFileName = keyName
      .replace(/[^a-zA-Z0-9а-яА-ЯёЁ\s]/g, '_') 
      .replace(/\s+/g, '_') 
      .substring(0, 50); 
    const svgBlob = new Blob([currentQR], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob); 
    const img = new Image();
    img.onload = function() {
    const scaleFactor = 4;
    const size = Math.max(img.width, img.height) * scaleFactor;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
      

      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const scale = size / Math.max(img.width, img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      
      canvas.toBlob(function(blob) {
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `${safeFileName}_key-qr-code.png`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(pngUrl);
          URL.revokeObjectURL(svgUrl);
        }, 100);
      }, 'image/png');
    };
    
    img.onerror = function() {
      alert('Ошибка при загрузке SVG изображения');
      URL.revokeObjectURL(svgUrl);
    };
    
    img.src = svgUrl;
  } catch (error) {
    console.error("Ошибка при скачивании QR-кода:", error);
    alert("Не удалось скачать QR-код. Попробуйте еще раз.");
  }
}