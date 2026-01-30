(async function(){
  const container = document.getElementById('policies');
  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', () => {
    clearToken();
    window.location.href = 'login.html';
  });

  const token = getToken();
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const policies = await getPolicies(token);
    if (!policies || policies.length === 0) {
      container.innerHTML = '<p>No policies found.</p>';
      return;
    }

    const rows = policies.map(p => `
      <tr>
        <td>${p.policyNumber}</td>
        <td>${p.type}</td>
        <td>$${p.premium.toFixed(2)}</td>
        <td>${new Date(p.effectiveDate).toLocaleDateString()}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <table>
        <thead>
          <tr><th>Policy #</th><th>Type</th><th>Premium</th><th>Effective</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:red">${err.message}</p>`;
    if (err.message.toLowerCase().includes('token')) {
      clearToken();
      setTimeout(()=> window.location.href = 'login.html', 1500);
    }
  }
})();
