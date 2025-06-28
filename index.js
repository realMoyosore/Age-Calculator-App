document.getElementById('age-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const day = parseInt(document.getElementById('day').value, 10);
  const month = parseInt(document.getElementById('month').value, 10);
  const year = parseInt(document.getElementById('year').value, 10);

  const today = new Date();
  let years = today.getFullYear() - year;
  let months = today.getMonth() + 1 - month;
  let days = today.getDate() - day;

  if (days < 0) {
    months -= 1;
    // Get days in previous month
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Prevent negative values for invalid future dates
  years = years < 0 ? 0 : years;
  months = months < 0 ? 0 : months;
  days = days < 0 ? 0 : days;

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
});


