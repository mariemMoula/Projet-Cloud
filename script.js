document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    userForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;

        // Envoyer les données au backend
        const response = await fetch('http://your-backend-ip:backend-port/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName }),
        });

        // Vider le formulaire
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';

        // Mettre à jour la liste des utilisateurs
        updateUserList();
    });

    // Charger la liste des utilisateurs lors du chargement initial
    updateUserList();

    async function updateUserList() {
        // Demander au backend la liste des utilisateurs
        const response = await fetch('http://your-backend-ip:backend-port/api/users');
        const users = await response.json();

        // Afficher la liste des utilisateurs
        userList.innerHTML = '<h2>User List:</h2>';
        users.forEach(user => {
            userList.innerHTML += `<p>${user.firstName} ${user.lastName}</p>`;
        });
    }
});
