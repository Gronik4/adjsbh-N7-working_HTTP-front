import circCh from '../img/chek.png';
import circ from '../img/circ.png';
import pencil from '../img/p.png';
import cross from '../img/cros.png';

export default class CreatTask {
  constructor(name, discription, status, creat, id) {
    this.N = name;
    this.D = discription;
    this.S = status;
    this.C = creat;
    this.I = id;
  }

  creatTicket() {
    const ticket = document.createElement('div');
    ticket.className = 'tiket_content';
    ticket.id = this.I;
    // add chek
    const label = document.createElement('label');
    label.className = 'label';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'input';
    const img = document.createElement('img');
    img.className = 'img';
    if (this.S === 'true') {
      img.src = `${circCh}`;
      input.checked = true;
    } else {
      img.src = `${circ}`;
      input.checked = false;
    }
    label.append(input, img);
    ticket.append(label);
    // add title
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = this.N;
    ticket.append(title);
    // add timeStamp
    const tim = document.createElement('div');
    tim.className = 'time';
    if (this.C) {
      tim.textContent = this.C;
    } else {
      const tStamp = CreatTask.getTime();
      tim.textContent = tStamp;
    }
    ticket.append(tim);
    // add editing
    const ed = document.createElement('div');
    ed.className = 'editing';
    const imgE = document.createElement('img');
    imgE.src = `${pencil}`;
    ed.append(imgE);
    ticket.append(ed);
    // delete
    const del = document.createElement('div');
    del.className = 'delete';
    const imgD = document.createElement('img');
    imgD.src = `${cross}`;
    del.append(imgD);
    ticket.append(del);
    // full_text
    const fullText = document.createElement('div');
    fullText.className = 'full_text';
    fullText.textContent = this.D;
    ticket.append(fullText);
    return ticket;
  }

  static getTime() {
    const nd = new Date();
    const year = nd.getFullYear().toString().slice(2);
    const manth = nd.getMonth() < 10 ? `0${(nd.getMonth() + 1)}` : nd.getMonth() + 1;
    const member = nd.getDate() < 10 ? `0${nd.getDate()}` : nd.getDate();
    const hours = nd.getHours() < 10 ? `0${nd.getHours()}` : nd.getHours();
    const minut = nd.getMinutes() < 10 ? `0${nd.getMinutes()}` : nd.getMinutes();
    const timeStamp = `${member}.${manth}.${year} ${hours}:${minut}`;
    return timeStamp;
  }
}
