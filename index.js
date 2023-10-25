import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-40de5-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

const inputField = document.querySelector('#input-field')
const addBtn = document.querySelector('#add-button')
const shoppingList = document.querySelector('#shopping-list')

addBtn.addEventListener('click', () => {
  let inputValue = inputField.value
  push(shoppingListInDB, inputValue)
  clearInputField()
})

onValue(shoppingListInDB, (snapshot) => {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingList()
        for (const item of itemsArray) {
            // let currentItemID = item[0]
            // let currentItemValue = item[1]
            appendToShoppingList(item)
        }
    } else {
        shoppingList.textContent = "No items here... yet!"
    }
})
    
function clearInputField() {
  inputField.value = ""
}

function appendToShoppingList(item) {
    let ItemID = item[0]
    let ItemValue = item[1]

    let newListItem = document.createElement('li')
    newListItem.textContent = ItemValue

    newListItem.addEventListener('click', () => {
        remove(ref(database, `shoppingList/${ItemID}`))
    })

    shoppingList.append(newListItem)
}

function clearShoppingList() {
    shoppingList.textContent = ""
}