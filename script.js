//kalkulator budżetu
function calculateBudget() {
    var income = parseFloat(document.getElementById('income').value);
    var expenses = parseFloat(document.getElementById('expenses').value);
    
    var totalIncome = income ? income : 0;
    var totalExpenses = expenses ? expenses : 0;
    var balance = totalIncome - totalExpenses;
    
    document.getElementById('total-income').innerHTML = "Suma dochodów: <span>" + totalIncome.toFixed(2) + "</span>";
    document.getElementById('total-expenses').innerHTML = "Suma wydatków: <span>" + totalExpenses.toFixed(2) + "</span>";
    document.getElementById('balance').innerHTML = "Bilans: <span>" + balance.toFixed(2) + "</span>";
}
//lista zakupów
const addItemForm = document.getElementById('addItemForm');
const itemNameInput = document.getElementById('itemName');
const shoppingList = document.getElementById('zakupki');

addItemForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = itemNameInput.value.trim();

    if (itemName !== '') {
        addItem(itemName);
        itemNameInput.value = '';
    }
});
function addItem(itemName) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${itemName}</span>
        <button class="delete-btn">Usuń</button>
        <button class="edit-btn">Edytuj</button>
    `;
    shoppingList.appendChild(listItem);

    const deleteButton = listItem.querySelector('.delete-btn');
    const editButton = listItem.querySelector('.edit-btn');

    deleteButton.addEventListener('click', function() {
        listItem.remove();
    });

    editButton.addEventListener('click', function() {
        const editedItemName = prompt('Edytuj nazwę przedmiotu:', itemName);
        if (editedItemName && editedItemName.trim() !== '') {
            listItem.querySelector('span').textContent = editedItemName;
        }
    });
}
//Wisielec
const words = ["besz", "jajko", "jabłko", "pomarańcza", "laptop", "rudy", "youtube", "kozan"]; // Lista słów do odgadnięcia
const maxErrors = 6; // max błedów

let chosenWord = words[Math.floor(Math.random() * words.length)]; // losowe słowo
let guessedWord = Array(chosenWord.length).fill('_'); 
let errors = 0; // Liczba błędów

const hangmanWordElement = document.getElementById('hangmanWord');
const messageElement = document.getElementById('message');

// Funkcja sprawdzająca wprowadzoną literę
function checkLetter() {
    const letterInput = document.getElementById('letterInput').value.toLowerCase();

    if (!letterInput.match(/[a-z]/)) {
        alert('Wprowadź literę od A do Z.');
        return;
    }

    if (chosenWord.includes(letterInput)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letterInput) {
                guessedWord[i] = letterInput;
            }
        }
    } else {
        errors++;
    }

    displayWord();
    checkGameStatus();
}

function displayWord() {
    hangmanWordElement.textContent = guessedWord.join(' ');
}

// Funkcja sprawdzająca
function checkGameStatus() {
    if (guessedWord.join('') === chosenWord) {
        messageElement.textContent = 'Gratulacje! Wygrałeś!';
        document.getElementById('letterInput').setAttribute('disabled', 'true');
    } else if (errors >= maxErrors) {
        messageElement.textContent = `Przegrana! Szukane słowo to "${chosenWord}".`;
        document.getElementById('letterInput').setAttribute('disabled', 'true');
    } else {
        messageElement.textContent = `Możesz zrobić ${maxErrors - errors} błędów`;
    }
}

// Inicjalizacja gry
displayWord();

//kalkulator BMI
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Konwersja wzrostu na metry

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById('result').textContent = 'Proszę wprowadzić poprawne wartości.';
        return;
    }

    const bmi = weight / (height * height);
    const bmiCategory = getBMICategory(bmi);

    document.getElementById('result').textContent = `Twoje BMI wynosi: ${bmi.toFixed(2)}. Kategoria BMI: ${bmiCategory}.`;
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return 'Niedowaga';
    } else if (bmi < 25) {
        return 'Prawidłowa waga';
    } else if (bmi < 30) {
        return 'Nadwaga';
    } else {
        return 'Otyłość';
    }
}
//generator haseł
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+{}|[];\',./<>?';

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const useUppercase = document.getElementById('uppercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    let characters = lowercaseLetters;
    if (useUppercase) characters += uppercaseLetters;
    if (useNumbers) characters += numbers;
    if (useSymbols) characters += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    document.getElementById('password').textContent = password;
}

