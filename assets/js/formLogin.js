document.addEventListener("DOMContentLoaded", () => {
    validarFormLogin();
})



/* ========== VALIDAR FORM LOGIN  ========== */
function validarFormLogin() {
    const loginForm = document.querySelector("#loginForm")
    const email = document.querySelector("#email").value.trim()
    const password = document.querySelector("#password").value.trim()
    const emailError = document.getElementById("emailError")
    const passwordError = document.getElementById("passwordError")

    emailError.textContent = '';
    passwordError.textContent = '';

    loginForm.addEventListener("submit", e => {
        e.preventDefault()

        if (!validarEmail(email)) {
            emailError.textContent = "El email no es válido"
            setTimeout(() => {
                emailError.textContent = '';
            }, 3000);
        }

        if (email === "") {
            emailError.textContent = "El email es obligatorio"
            setTimeout(() => {
                emailError.textContent = '';
            }, 3000);
        }

        if (password === "") {
            passwordError.textContent = "La contraseña es obligatoria"
            setTimeout(() => {
                passwordError.textContent = ""
            }, 3000);
        }
    })
}

function validarEmail(email) {
    // Expresion Regular
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
}
