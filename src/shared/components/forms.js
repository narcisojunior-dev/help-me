export function createTextInput({ id, label, placeholder = '', type = 'text' }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'mb-3';

  const inputLabel = document.createElement('label');
  inputLabel.className = 'form-label';
  inputLabel.htmlFor = id;
  inputLabel.textContent = label;

  const input = document.createElement('input');
  input.className = 'form-control';
  input.id = id;
  input.name = id;
  input.type = type;
  input.placeholder = placeholder;

  wrapper.append(inputLabel, input);
  return wrapper;
}

export function createSelect({ id, label, options = [] }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'mb-3';

  const selectLabel = document.createElement('label');
  selectLabel.className = 'form-label';
  selectLabel.htmlFor = id;
  selectLabel.textContent = label;

  const select = document.createElement('select');
  select.className = 'form-select';
  select.id = id;
  select.name = id;

  for (const option of options) {
    const item = document.createElement('option');
    item.value = option.value;
    item.textContent = option.label;
    select.append(item);
  }

  wrapper.append(selectLabel, select);
  return wrapper;
}
