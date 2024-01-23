// Așteaptă ca documentul să fie complet încărcat înainte de a executa codul
document.addEventListener("DOMContentLoaded", function () {
    // Obține elementul de buton de autentificare după ID
    const loginBtn = document.getElementById("loginBtn");

    // Verifică dacă butonul de autentificare există
    if (loginBtn) {
        // Adaugă un ascultător de eveniment pentru clic pe buton
        loginBtn.addEventListener("click", async function (event) {
            // Opriți comportamentul implicit al formularului (navigarea la o altă pagină)
            event.preventDefault();

            // Obține elementele de input pentru nume de utilizator și parolă
            const usernameInput = document.getElementById("username");
            const passwordInput = document.getElementById("password");

            // Extrage valorile introduse de utilizator pentru nume de utilizator și parolă
            const username = usernameInput.value;
            const password = passwordInput.value;

            // Trimite o cerere la server pentru autentificare
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Încorporează datele JSON în corpul cererii
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            // Așteaptă răspunsul sub formă de JSON
            const result = await response.json();

            // Verifică rezultatul autentificării
            if (result.success) {
                // Dacă autentificarea este reușită, redirecționează către 'home.html'
                window.location.href = "/home.html";
            } else {
                // Gestionează eșecul autentificării (de exemplu, afișează un mesaj de eroare)
                console.error("Autentificare eșuată");
            }
        });
    } else {
        // Afișează o eroare în consolă dacă butonul de autentificare nu a fost găsit
        console.error("Butonul de autentificare nu a fost găsit");
    }
});
