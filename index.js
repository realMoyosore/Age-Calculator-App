/**
 * Adds a submit event listener to the form with id 'age-form'.
 * @param {Event} e - The submit event object.
 */
document.getElementById('age-form').addEventListener('submit', function(e) {
  /**
   * Prevents the default form submission behavior.
   */
  e.preventDefault();

  /**
   * Displays an error message for the input with the given id.
   * @param {string} id - The id of the input element.
   * @param {string} message - The error message to display.
   */
  function showError(id, message) {
    /**
     * Adds the 'input-error' class to the input element.
     */
    document.getElementById(id).classList.add('input-error');
    /**
     * Sets the error message for the input element.
     */
    document.getElementById(id + '-error').textContent = message;
  }

  /**
   * Clears the error message for the input with the given id.
   * @param {string} id - The id of the input element.
   */
  function clearError(id) {
    /**
     * Removes the 'input-error' class from the input element.
     */
    document.getElementById(id).classList.remove('input-error');
    /**
     * Clears the error message for the input element.
     */
    document.getElementById(id + '-error').textContent = '';
  }

  /**
   * Gets the input elements for day, month, and year.
   * @type {HTMLInputElement}
   */
  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');

  /**
   * Retrieves and trims the values from the input elements.
   * @type {string}
   */
  const day = dayInput.value.trim();
  const month = monthInput.value.trim();
  const year = yearInput.value.trim();

  /**
   * Tracks if any validation error has occurred.
   * @type {boolean}
   */
  let hasError = false;

  /**
   * Validates the day input.
   */
  if (!day) {
    showError('day', 'This field is required');
    hasError = true;
  } else if (isNaN(day) || day < 1 || day > 31) {
    showError('day', 'Must be a valid day');
    hasError = true;
  } else {
    clearError('day');
  }

  /**
   * Validates the month input.
   */
  if (!month) {
    showError('month', 'This field is required');
    hasError = true;
  } else if (isNaN(month) || month < 1 || month > 12) {
    showError('month', 'Must be a valid month');
    hasError = true;
  } else {
    clearError('month');
  }

  /**
   * Gets the current year for year validation.
   * @type {number}
   */
  const currentYear = new Date().getFullYear();

  /**
   * Validates the year input.
   */
  if (!year) {
    showError('year', 'This field is required');
    hasError = true;
  } else if (isNaN(year) || year < 1900 || year > currentYear) {
    showError('year', 'Must be a valid year');
    hasError = true;
  } else {
    clearError('year');
  }

  /**
   * If there is any validation error, reset the output fields and stop execution.
   */
  if (hasError) {
    document.getElementById('years').textContent = '--';
    document.getElementById('months').textContent = '--';
    document.getElementById('days').textContent = '--';
    return;
  }

  /**
   * Continues with age calculation if no errors.
   * Gets the current date.
   * @type {Date}
   */
  const today = new Date();

  /**
   * Calculates the difference in years, months, and days.
   * @type {number}
   */
  let years = today.getFullYear() - parseInt(year, 10);
  let months = today.getMonth() + 1 - parseInt(month, 10);
  let days = today.getDate() - parseInt(day, 10);

  /**
   * Adjusts the calculation if the current day is less than the birth day.
   */
  if (days < 0) {
    months -= 1;
    /**
     * Gets the number of days in the previous month.
     * @type {Date}
     */
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  /**
   * Adjusts the calculation if the current month is less than the birth month.
   */
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  /**
   * Ensures that negative values are not displayed for invalid future dates.
   */
  years = years < 0 ? 0 : years;
  months = months < 0 ? 0 : months;
  days = days < 0 ? 0 : days;

  /**
   * Updates the output fields with the calculated age.
   */
  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
});

