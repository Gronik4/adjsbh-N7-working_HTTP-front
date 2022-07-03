/**
 * Функция отправки запрсов на сервер *
 */
export const Request = (pack = {}) => {
  const xhr = new XMLHttpRequest();
  if (pack.method === 'GET') {
    try {
      xhr.open(pack.method, pack.url);
      xhr.send();
    } catch (e) {
      pack.callback(new Error(e.messange), null);
    }
  } else {
    const formD = new FormData();
    for (const item in pack.data) {
      formD.append(item, pack.data[item]);
      console.log(pack.data);
    }
    try {
      xhr.open(pack.method, pack.url);
      xhr.send(formD);
    } catch (e) {
      pack.callback(new Error(e.messange), null);
    }
  }
  xhr.onload = function () {
    if (xhr.status === 200) {
      pack.callback(null, xhr.response);
    } else {
      pack.callback(xhr.err, null);
    }
  };
};
