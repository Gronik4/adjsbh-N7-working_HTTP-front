export default class AddForm {
  constructor(data) {
    if (data) {
      this.sh = data.sh;
      this.fu = data.fu;
      this.formHead = 'Редактировать тикет';
    } else {
      this.sh = '';
      this.fu = '';
      this.formHead = 'Добавить тикет';
    }
  }

  creatForm() {
    const form = document.createElement('form');
    form.className = 'popov';
    form.novalidate = true;
    // h3
    const h3 = document.createElement('h3');
    h3.className = 'head_pop';
    h3.textContent = this.formHead;
    form.append(h3);
    // input short
    const label1 = document.createElement('label');
    label1.textContent = 'Краткое описание';
    const shortT = document.createElement('input');
    shortT.type = 'text';
    shortT.className = 'inp';
    shortT.name = 'short';
    shortT.required = true;
    shortT.value = this.sh;
    label1.append(shortT);
    form.append(label1);
    // input full
    const label2 = document.createElement('label');
    label2.textContent = ' Подробное описание';
    const fullT = document.createElement('textarea');
    // fullT.type = 'text';
    fullT.className = 'inp';
    fullT.classList.add('full');
    fullT.name = 'full';
    fullT.required = true;
    fullT.value = this.fu;
    label2.append(fullT);
    form.append(label2);
    // block button
    const buttons = AddForm.addButt();
    form.append(buttons);
    return form;
  }

  static warning() {
    const form1 = document.createElement('div');
    form1.id = 'dt';
    form1.className = 'popov';
    form1.classList.add('warning');
    form1.name = 'war';
    form1.novalidate = true;
    const h3 = document.createElement('h3');
    h3.className = 'head_pop';
    h3.textContent = 'Удалить тикет';
    form1.append(h3);
    const text = document.createElement('div');
    text.className = 'full_text';
    text.classList.add('warn');
    text.textContent = 'Вы действительно хотите удалить этот тикет?';
    form1.append(text);
    const butt = AddForm.addButt();
    form1.append(butt);
    return form1;
  }

  static addButt() {
    const buttons = document.createElement('div');
    buttons.className = 'block_button';
    const res = document.createElement('button');
    res.className = 'but';
    res.type = 'reset';
    res.textContent = 'Отмена';
    res.id = 'res';
    buttons.append(res);
    const sav = document.createElement('button');
    sav.className = 'but';
    sav.id = 'sav';
    sav.textContent = 'Ok';
    buttons.append(sav);
    return buttons;
  }
}
