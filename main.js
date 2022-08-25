let inp = document.getElementById('inp')
let body = document.getElementById('body')

let arr = [{name: 'to do'}]

function Add() {
    let store = localStorage.getItem('items')
    let news = JSON.parse(store)
    news.push({ name: inp.value })
    inp.value = ''
    localStorage.setItem('items', JSON.stringify(news))
    draw()
}
function draw() {
    let store = localStorage.getItem('items')
    let news = JSON.parse(store)
    
    localStorage.setItem('items', JSON.stringify(arr))

    let a = news.map((item, index) => `
        <div class='line'>
            <div class='display'>
                <div class='id'>${index + 1}</div>
                <button onclick='edit(${index})'>e</button>
                <button onclick='del(${index})'>d</button>
            </div> 
            <div class='name'>${item.name}</div>
        </div>
    `).join('')
    body.innerHTML = a

    localStorage.setItem('items', JSON.stringify(news))
}
function edit(index) {
    let store = localStorage.getItem('items')
    let news = JSON.parse(store)
    inp.value = news[index].name
    news.splice(index, 1)
    localStorage.setItem('items', JSON.stringify(news))
    draw()
}
function del(index) {
    let store = localStorage.getItem('items')
    let news = JSON.parse(store)
    news.splice(index, 1)
    localStorage.setItem('items', JSON.stringify(news))
    draw()
}

let search = document.getElementById('search')
search.addEventListener('keyup', e => {
    const product = document.querySelectorAll(".line");
    const pname = document.querySelectorAll(".name");

    for (var i = 0; i < pname.length; i++) {
        let match = product[i].querySelectorAll(".name")[0];
        if (match) {
            let textvalue = match.textContent || match.innerHTML
            textvalue.toLocaleUpperCase().indexOf(search.value.toLocaleUpperCase()) > -1 ?
                product[i].style.display = "" : product[i].style.display = "none"
        }
    }
})

window.addEventListener('keyup', e => e.key === 'Enter' ? Add() : '')

window.addEventListener('load', () => draw(), inp.focus())