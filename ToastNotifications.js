let toastEl = document.getElementById('toast')

if(typeof(toastEl) == 'undefined' || toastEl == null){
  const app = document.getElementById('app')
  
  const child = document.createElement('div')
  child.className = 'toast toast-top toast-center w-[90vw] md:w-[400px]'
  child.id = 'toast'

  app.appendChild(child)

  toastEl = document.getElementById('toast')
}

export const create = (message, type) => {
    const toastMessage = document.createElement('span')
    toastMessage.innerText = message

    const toastContent = document.createElement('div')
    toastContent.appendChild(toastMessage)

    const toast = document.createElement('div')
    toast.className = `alert alert-${type}`
    toast.appendChild(toastContent)

    setTimeout(() => {remove(toast)}, 3000)

    toastEl.appendChild(toast)
}

export const remove = (el) => {
  el.remove()
}