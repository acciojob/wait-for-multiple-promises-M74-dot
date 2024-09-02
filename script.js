//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
  const outputTable = document.getElementById('output');

  // Function to create a promise that resolves after a random delay
  function createPromise(name) {
    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * 2000) + 1000; // Random time between 1 and 3 seconds
      setTimeout(() => {
        resolve({ name, time: delay / 1000 });
      }, delay);
    });
  }

  // Create three promises
  const promises = [
    createPromise('Promise 1'),
    createPromise('Promise 2'),
    createPromise('Promise 3')
  ];

  // Add loading row to the table
  outputTable.innerHTML = `
    <tr>
      <td colspan="2">Loading...</td>
    </tr>
  `;

  // Wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Clear the loading row
    outputTable.innerHTML = '';

    // Add rows for each promise result
    results.forEach(result => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${result.name}</td>
        <td>${result.time.toFixed(3)}</td>
      `;
      outputTable.appendChild(row);
    });

    // Add the total row
    const totalTime = results.reduce((sum, result) => sum + result.time, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${totalTime.toFixed(3)}</td>
    `;
    outputTable.appendChild(totalRow);
  });
});
