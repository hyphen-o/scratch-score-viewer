import { Mastery } from "./drscratch.js"

const thumbnail_title = document.getElementsByClassName('thumbnail-title')
const thumbnail = document.getElementsByClassName('thumbnail-image')
const button = document.querySelector('#projectBox > button')

//新たなHTML要素を作成
const createNewElement = ({ type, text, color }) => {
  const element = document.createElement(type)
  element.innerText = text
  element.style.color = color

  return element
}

//HTML要素を表示
const displayElement = ({ index, element }) => {
  const thumbnail_project = document.getElementsByClassName('thumbnail project')
  const thumbnail_creator = document.getElementsByClassName('thumbnail-creator')
  thumbnail_project[index].style.height = '223px'
  thumbnail_creator[index].insertAdjacentElement('afterend', element)
}

//CTスコアを取得
const getScore = (data) => {
  const mastery = new Mastery(data)
  return mastery.process()
}

//対応していない作品のHTML要素を生成
const generateErrorElement = (index) => {
  const errorElement = createNewElement({
    type: 'a',
    text: 'Not supported',
    color: '#FF9933',
  })
  displayElement({
    index: index,
    element: errorElement,
  })
}

//CTスコアを表示するHTML要素を生成
const generateScoreElement = (data, index) => {
  const [isAvailable, ctscore] = getScore(data)
  if (isAvailable) {
    const scoreElement = createNewElement({
      type: 'a',
      text: 'Score: ' + ctscore + '/21',
      color: '#0fbd8c',
    })
    displayElement({
      index: index,
      element: scoreElement,
    })
  } else {
    if (thumbnail_title[index].childElementCount === 2)
      generateErrorElement(index)
  }
}

//作品のJSONを取得
const getProject = (data, index) => {
  fetchApi(
    `https://projects.scratch.mit.edu/${data['id']}?token=${data['project_token']}`,
    generateScoreElement,
    index
  )
}

//APIを叩く
const fetchApi = (URL, callback, index) => {
  const req = new XMLHttpRequest()
  req.open('GET', URL)
  req.send()
  req.addEventListener(
    'load',
    () => {
      try {
        const json_data = JSON.parse(req.response)
        callback(json_data, index)
      } catch (error) {
        if (thumbnail_title[index].childElementCount === 2)
          generateErrorElement(index)
      }
    },
    false
  )
}

//CTスコアを表示
const main = () => {
  for (let i = 0; i < thumbnail.length; i++) {
    const project_id = thumbnail[i].href.replace(/[^0-9]/g, '')
    if (thumbnail_title[i].childElementCount === 2) {
      fetchApi(
        `https://api.scratch.mit.edu/projects/${project_id}`,
        getProject,
        i
      )
    }
  }
}

//検索した時にスコアを表示
window.onload = main()

//もっと見るボタンが押された時にスコア再表示
if (button) {
  button.addEventListener(
    'click',
    () => {
      window.setTimeout(main, 1000)
    },
    false
  )
}
