
// Validate Form Inputs
function isValidated () {
    const allForms = document.querySelectorAll('form');
    Array.prototype.slice.call(allForms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

            form.classList.add('was-validated')
        }, false)
    })
}

export {isValidated}