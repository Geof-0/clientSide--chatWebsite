console.log('js paired')


const socket = io("http://127.0.0.1:5001", {
    transports:['websocket']
})

// chat input

const textInput = document.getElementById("text-input")

let currentText = textInput.textContent

textInput.addEventListener('input', () => {
    currentText = textInput.textContent
    console.log(currentText)
})

textInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter"){
        textInput.blur()
        console.log('new message: ' + currentText)
        
        if (textInput.textContent == 'type here'){
            return
        }

        socket.emit('new_chat_toserver', {'msg': currentText})
        textInput.textContent = 'type here'
        currentText = textInput.textContent
    }
})

textInput.addEventListener('focus', () => {
    console.log('selected textInput')
    if (textInput.textContent == 'type here'){
        textInput.textContent = ''
    }
});

textInput.addEventListener('blur', () => {
    console.log('unselected textInput')
    if (textInput.textContent == ''){
        textInput.textContent = 'type here'
    }
});




// chat menu & new texts


const chatMenu = document.getElementById("chat-menu")

class textBox{
    constructor(text){
        this.element = document.createElement('div')
        this.element.classList.add('chat-bubble') 
        this.element.textContent = text

        chatMenu.appendChild(this.element)
    }
}






// backend linking


socket.on('new_chat_toclient', data => {
    console.log(data['msg'])
    newTextBox = new textBox(data['msg'])
})
