// Ну, если ты зашел сюда то тебе нечего делать да? 
// В любом случае, если ты зашел чтобы скопировать ключи - копируй, 
// Мне тут не нужна супер безопасность да и желания прятать как-то эти ключи нет.
// Всё бесплатно и в почти открытом доступе.

// Список ключей будет пополняться

//          ███             ███             ███             ███             ███             █
//        ███░            ███░            ███░            ███░            ███░            ███
//      ███░            ███░            ███░            ███░            ███░            ███░ 
//    ███░            ███░            ███░            ███░            ███░            ███░   
//  ███░            ███░            ███░            ███░            ███░            ███░     
// ██░            ███░            ███░            ███░            ███░            ███░       
// ░            ███░            ███░            ███░            ███░            ███░         
//             ░░░             ░░░             ░░░             ░░░             ░░░           
//      ███ _____       ███    .___     ██__________    ███     _____  .__█__           ███  
//    ███░ /     \ _____█░   __| _/____██░\______   \___.__.   /     \█|__|  | ____ __███░   
//  ███░  /  \ /  \\__  \   / __ |/ __ \   |    |  _<   |  |  /  \ /  \|  |  |/ /  |  \░     
// ██░   /    Y    \/ __ \_/ /_/ \  ___/   |    |   \\___  | /    Y    \  |    <|  |  /      
// ░     \____|__  (____  /\____ |\___  >  |______  // ____| \____|__  /__|__|_ \____/       
//            ███\/     \/    ██\/    \/      ███░\/ \/       ███░   \/       █\/░           
//          ███░            ███░            ███░            ███░            ███░            █
//         ░░░             ░░░             ░░░             ░░░             ░░░             ░░
//  ███             ███             ███             ███             ███             ███      
// ██░            ███░            ███░            ███░            ███░            ███░       
// ░            ███░            ███░            ███░            ███░            ███░         
//            ███░            ███░            ███░            ███░            ███░           
//          ███░            ███░            ███░            ███░            ███░            █
//        ███░            ███░            ███░            ███░            ███░            ███
                                                                                                  

// Ах да, я не супер хороший програмист или как там у вас это называется,
// поэтому все костыли тут это норма, в любом случае буду рад если вы сообщите о проблемах
// мне в ДС megaweh или в моём ДС сервере посвещенному обходу блокировок https://discord.gg/sspJzRsf6x 


async function __init__(typ) {
  const url = "https://raw.githubusercontent.com/GooDHous/KS/refs/heads/main/keys.json" 
  let response = await fetch(url);
  response = await fetch(url)
  window.stn = {
    type :  typ,
    keys : await response.json()
  };
}

var randkey
var runned = false
var keynumb

function randint(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
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
  if (window.stn.type == "ss") {
    keynumb = randint(0, window.stn.keys.ss.length - 1);
    randkey = window.stn.keys.ss[keynumb]
    console.log(keynumb)
    document.getElementById("myInput").value = randkey;
    
    const keyName = decodeKeyName(randkey);
    document.getElementById("keyName").textContent = keyName;
  }
  if (window.stn.type == "vless") {
    keynumb = randint(0, window.stn.keys.vless.length - 1);
    randkey = window.stn.keys.vless[keynumb]
    console.log(keynumb)
    document.getElementById("myInput").value = randkey;

    const keyName = decodeKeyName(randkey);
    document.getElementById("keyName").textContent = keyName;
  }
  runned = true
}

function copy() {
  if (runned == true) {
    var copyText = document.getElementById("myInput");
    copyText.select();
    document.execCommand("copy");
    
    const keyName = document.getElementById("keyName").textContent;
    alert("Успешно скопировано: " + copyText.value);
  }
  else alert('Пожалуйста нажмите Получить ключ');
}