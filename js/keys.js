// Ну, если ты зашел сюда то тебе нечего делать да? 
// В любом случае, если ты зашел чтобы скопировать ключи - копируй, 
// Мне тут не нужна супер безопасность да и желания прятать как-то эти ключи нет.
// Всё бесплатно и в почти открытом доступе.

// Список ключей будет пополняться

///$$      /$                 /$$             /$$                                               /$$      
//| $$$    /$$                | $$            | $$                                              | $$      
//| $$$$  /$$$  /$$$$$$   /$$$$$$$  /$$$$$$   | $$$$$$$  /$$   /$$   /$$  /$$  /$$  /$$$$$$ | $$$$$$$ 
//| $$ $$/$$ $ |____  $$ /$$__  $$ /$$__  $$  | $$__  $$| $$  | $$  | $$ | $$ | $$ /$$__  $$| $$__  $$
//| $$  $$$| $  /$$$$$$$| $$  | $$| $$$$$$$$  | $$  \ $$| $$  | $$  | $$ | $$ | $$| $$$$$$$$| $$  \ $$
//| $$\  $ | $ /$$__  $$| $$  | $$| $$_____/  | $$  | $$| $$  | $$  | $$ | $$ | $$| $$_____/| $$  | $$
//| $$ \/  | $ | $$$$$$$|  $$$$$$$|  $$$$$$$  | $$$$$$$/|  $$$$$$$  |  $$$$$/$$$$/|  $$$$$$$| $$  | $$
//|__/     |_/ \_______/ \_______/ \_______/  |_______/  \____  $$   \_____/\___/  \_______/|__/  |__/
//                                                             /$$                                          
//                                                            | $$                                       
//                                                             \__                                        

// Ах да, я не супер хороший програмист или как там у вас это называется,
// поэтому все костыли тут это норма, в любом случае буду рад если вы сообщите о проблемах
// мне в ДС megaweh или в моём ДС сервере обхода блокировок YWTeam https://discord.gg/sspJzRsf6x 


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


function give() {
if (window.stn.type == "ss") {
  keynumb = randint(0, window.stn.keys.ss.length - 1);
  randkey = window.stn.keys.ss[keynumb]
  console.log(keynumb)
  document.getElementById("myInput").value = randkey;
}
if (window.stn.type == "vless") {
  keynumb = randint(0, window.stn.keys.vless.length - 1);
  randkey = window.stn.keys.vless[keynumb]
  console.log(keynumb)
  document.getElementById("myInput").value = randkey;
}
runned = true


}
function copy() {
  if (runned == true) {
    var copyText = document.getElementById("myInput");
    copyText.select();
    document.execCommand("copy");
    alert("Успешно скопировано: " + copyText.value);
  }
  else alert  ('Пожалуйста нажмите Получить ключ');
} 