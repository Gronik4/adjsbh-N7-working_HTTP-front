/**
 * Класс для взаимодействия с браузером
 */
import {Request} from './Request';
import CreatTask from './creatTask';
import AddForm from './addForm';

export default class App {
  constructor() {
    this.addT = document.getElementById('addT');

    this.init();
  }

  static addUrl = 'https://coursar-http.herokuapp.com/';

  static tikets = document.querySelector('.tikets');

  init() {
    window.addEventListener('load', () => {
      Request({
        method: 'GET',
        url: App.addUrl,
        callback: (err, response) => {
          if (response) {
            App.hendlerTicket(response);
          } else {
            console.log(`Ошибка...${err}`);
          }
          // callback(err, response);
        },
      });
    });
    this.addT.addEventListener('click', App.addTiket);
  }

  static hendlerTicket(date) {
    const { tasks } = JSON.parse(date);
    tasks.forEach((item) => {
      const {
        name, discription, check, creat, id,
      } = item;
      const ticket = new CreatTask(name, discription, check, creat, id).creatTicket();
      App.handHandler(ticket);
      App.tikets.append(ticket);
    });
  }

  static handHandler(tick) {
    tick.querySelector('.label').addEventListener('click', App.triggerChek);
    tick.querySelector('.title').addEventListener('click', App.showDiscription);
    tick.querySelector('.time').addEventListener('click', App.showDiscription);
    tick.querySelector('.editing').addEventListener('click', App.editTiket);
    tick.querySelector('.delete').addEventListener('click', App.deleteTiket);
  }

  static triggerChek(event) {
    const label = event.target.closest('.label');
    const inp = label.querySelector('.input');
    const idTask = event.target.closest('.tiket_content').id;
    inp.onchange = () => {
      if(inp.checked) {
        Request({
          method: 'PUT',
          url: App.addUrl,
          data: {
            id: idTask,
            check: true,
          },
          callback: (err, response) => {
            if (response) {
              window.location.reload();
            } else { console.log(`Ошибка...${err}`); }
            // callback(err, response);
          },
        }); 
      } else{
        Request({
          method: 'PUT',
          url: App.addUrl,
          data: {
            id: idTask,
            check: false,
          },
          callback: (err, response) => {
            if (response) {
              window.location.reload();
            } else { console.log(`Ошибка...${err}`); }
            // callback(err, response);
          },
        });
      }
    }  
  }

  static showDiscription(event) {
    const tiket = event.target.closest('.tiket_content');
    const full = tiket.querySelector('.full_text');
    if (full.style.display === 'block') {
      full.style.display = 'none';
    } else { full.style.display = 'block'; }
  }

  static addTiket() {
    const form = new AddForm().creatForm();
    App.tikets.append(form);
    form.res.addEventListener('click', () => form.remove());
    form.sav.addEventListener('click', (event) => {
      event.preventDefault();
      if (!form.short.value) {
        alert('Поле "Краткое описание" - не заполнено.');
        form.remove();
        return;
      }
      if (!form.full.value) {
        alert('Поле "Подробное описание" - не заполнено.');
        form.remove();
        return;
      }
      const sh = form.short.value;
      const fl = form.full.value;
      form.remove();
      const time = CreatTask.getTime();
      console.log(time);
      Request({
        method: 'POST',
        url: App.addUrl,
        data: {
          check: false,
          name: sh,
          creat: time,
          discription: fl,
        },
        callback: (err, response) => {
          if (response) {
            window.location.reload();
          } else { console.log(`Ошибка...${err}`); }
        },
      });
    });
  }

  static editTiket(event) {
    const tikCon = event.target.closest('.tiket_content');
    const head = tikCon.querySelector('.title');
    const text = tikCon.querySelector('.full_text');
    const changes = { sh: [head.textContent], fu: [text.textContent] };
    const editForm = new AddForm(changes).creatForm();
    App.tikets.append(editForm);
    editForm.res.addEventListener('click', () => editForm.remove());
    editForm.sav.addEventListener('click', (e) => {
      e.preventDefault();
      const idTask = event.target.closest('.tiket_content').id;
      const sh = editForm.short.value;
      const fl = editForm.full.value;
      const timeNow = CreatTask.getTime();
      console.log(idTask, sh, fl);
      editForm.remove();
      Request({
        method: 'PUT',
        url: App.addUrl,
        data: {
          id: idTask,
          name: sh,
          creat: timeNow,
          discription: fl,
        },
        callback: (err, response) => {
          if (response) {
            window.location.reload();
          } else { console.log(`Ошибка...${err}`); }
          // callback(err, response);
        },
      });
    });
  }

  static deleteTiket(event) {
    const warning = AddForm.warning();
    const idTask = event.target.closest('.tiket_content').id;
    App.tikets.append(warning);
    const res = document.getElementById('res');
    const sav = document.getElementById('sav');
    res.addEventListener('click', () => warning.remove());
    sav.addEventListener('click', (event) => {
      event.preventDefault();
      warning.remove();
      Request({
        method: 'PUT',
        url: App.addUrl,
        data: {
          id: idTask,
          method: 'delete',
        },
        callback: (err, response) => {
          if (response) {
            window.location.reload();
          } else { console.log(`Ошибка...${err}`); }
          // callback(err, response);
        },
      });
    });
  }
}
