const checkboxes = document.querySelectorAll('input[type=checkbox]');
const localStorageKey = 'activities';

// Retrieve the saved activities from localstorage
let savedActivities = JSON.parse(localStorage.getItem(localStorageKey)) || {};

// Set the checkboxes to their saved state
checkboxes.forEach(checkbox => {
    if (savedActivities[checkbox.parentNode.parentNode.rowIndex]) {
        checkbox.checked = savedActivities[checkbox.parentNode.parentNode.rowIndex];
    }
});

// Add event listener for checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const rowIndex = event.target.parentNode.parentNode.rowIndex;

        // Save the checked state to localstorage
        savedActivities[rowIndex] = event.target.checked;
        localStorage.setItem(localStorageKey, JSON.stringify(savedActivities));

        // Check if all checkboxes are checked and reset them if they are
        const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
        if (allChecked) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                savedActivities[checkbox.parentNode.parentNode.rowIndex] = false;
                localStorage.setItem(localStorageKey, JSON.stringify(savedActivities));
            });
        }
    });
});

document.getElementById("reset").addEventListener("click", () => {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        savedActivities[checkbox.parentNode.parentNode.rowIndex] = false;
        localStorage.setItem(localStorageKey, JSON.stringify(savedActivities));
    });
})
