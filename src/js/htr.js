const bot_id = process.env.BOT_ID;
const chat_id = process.env.CHAT_ID;

export function sendRequest(msg) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(
      'POST',
      `https://api.telegram.org/bot${bot_id}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${msg}`
    );

    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        //   console.log(JSON.parse(xhr.response));
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      console.log(`Помилка з'єднання`);
      reject(xhr.response);
    };

    xhr.send();
  });
}
