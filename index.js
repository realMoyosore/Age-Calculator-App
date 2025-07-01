document.getElementById('age-form').addEventListener('submit', function(e) {
  e.preventDefault();

  function showError(id, message) {
    document.getElementById(id).classList.add('input-error');
    document.getElementById(id + '-error').textContent = message;
  }

  function clearError(id) {
    document.getElementById(id).classList.remove('input-error');
    document.getElementById(id + '-error').textContent = '';
  }

  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');

  const day = dayInput.value.trim();
  const month = monthInput.value.trim();
  const year = yearInput.value.trim();

  let hasError = false;

  if (!day) {
    showError('day', 'This field is required');
    hasError = true;
  } else if (isNaN(day) || day < 1 || day > 31) {
    showError('day', 'Must be a valid day');
    hasError = true;
  } else {
    clearError('day');
  }

  if (!month) {
    showError('month', 'This field is required');
    hasError = true;
  } else if (isNaN(month) || month < 1 || month > 12) {
    showError('month', 'Must be a valid month');
    hasError = true;
  } else {
    clearError('month');
  }

  const currentYear = new Date().getFullYear();

  if (!year) {
    showError('year', 'This field is required');
    hasError = true;
  } else if (isNaN(year) || year < 1900 || year > currentYear) {
    showError('year', 'Must be a valid year');
    hasError = true;
  } else {
    clearError('year');
  }

  if (hasError) {
    document.getElementById('years').textContent = '--';
    document.getElementById('months').textContent = '--';
    document.getElementById('days').textContent = '--';
    return;
  }

  const today = new Date();

  let years = today.getFullYear() - parseInt(year, 10);
  let months = today.getMonth() + 1 - parseInt(month, 10);
  let days = today.getDate() - parseInt(day, 10);

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  years = years < 0 ? 0 : years;
  months = months < 0 ? 0 : months;
  days = days < 0 ? 0 : days;

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
});

