import { Mastery } from "./drscratch.js" 

const project_id = document.getElementsByClassName('media-control-edit small button grey');
const media_thumb = document.getElementsByClassName('media-thumb');

//新たなHTML要素を作成
const createNewElement = ({ type, text, color }) => {
  const element = document.createElement(type)
  element.innerText = text
  element.style.color = color
  element.style.display = 'block'
  element.style.fontWeight = 'bold'

  return element
}


//CTスコアを取得
const getScore = (data) => {
    const mastery = new Mastery(data)
    return mastery.process()
}

//HTML要素を表示
const displayElement = ({ index, element }) => {
    const media_info = document.getElementsByClassName('media-info')
    media_info[index].insertAdjacentElement('afterend', element)
  }

const generateScoreElement = (data, index) => {
    const [isAvailable, ctscore] = getScore(data)
    if(isAvailable) {
        const scoreElement = createNewElement({
            type: 'a',
            text: 'Score: ' + ctscore + '/21',
            color: '#0fbd8c',
        })
        displayElement({
            index: index,
            element: scoreElement,
        })
    }
    console.log(ctscore)
}

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
        console.log(error)
      }
    },
    false
  )
}

//CTスコアを表示
const main = () => {
    for(let i = 0; i < project_id.length; i++) {
        const id = project_id[i].href.replace(/[^0-9]/g, '')
        fetchApi(
            `https://api.scratch.mit.edu/projects/${id}`,
            getProject,
            i
            )
        console.log(id)
    }
}

//検索した時にスコアを表示
if(media_thumb) {
    main()
}



