

//新たなHTML要素を作成
const createNewElement = ({ type, text, color }) => {
    const element = document.createElement(type)
    element.innerText = text
    element.style.color = color
  
    return element
}