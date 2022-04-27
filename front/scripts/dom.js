const main = document.querySelector('main')

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')

  msgEl.classList.add('message')

  const pseudoSpan = document.createElement('span')
  pseudoSpan.textContent = data.pseudo
  msgEl.append(pseudoSpan)

  const time = document.createElement('span')
  time.classList.add('dateMessage')
  time.textContent = new Date().toLocaleString()
  msgEl.append(time)
  
  const bodyP = document.createElement('p')
  bodyP.textContent = data.body
  msgEl.append(bodyP)

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)

 /* const sender = document.querySelector('#pseudo')?.value
  sender.p 
  msgEl.classList.add(data.pseudo === sender ? 'send' : 'recieve')
*/
const verifpseudo = (data.pseudo === localStorage.getItem("pseudo")) ;
    if (verifpseudo){
    msgEl.dataset.id = data.id; 
    msgEl.classList.add("send");
    }
}


