import { Mastery } from "./drscratch.js" 

//新たなHTML要素を作成
const createNewElement = ({ type, text, color }) => {
  const element = document.createElement(type)
  element.innerText = text
  element.style.color = color

  return element
}


//CTスコアを取得
const getScore = (data) => {
    const mastery = new Mastery(data)
    return mastery.process()
}

const generate = (data) => {
    const [isAvailable, ctscore] = getScore(data)
    console.log(ctscore)
}

const getProject = (data) => {
    fetchApi(
      `https://projects.scratch.mit.edu/${data['id']}?token=${data['project_token']}`,
      generate,
    )
}

const practice = (data) => {
    data.forEach((project) => {
        fetchApi(
        `https://api.scratch.mit.edu/projects/${project['id']}`,
        getProject
        )
    })
}

//APIを叩く
const fetchApi = (URL, callback) => {
  const req = new XMLHttpRequest()
  req.open('GET', URL)
  req.send()
  req.addEventListener(
    'load',
    () => {
      try {
        const json_data = JSON.parse(req.response)
        callback(json_data)
      } catch (error) {
        console.log(error)
      }
    },
    false
  )
}

//CTスコアを表示
const main = () => {
  const username = document.querySelector("#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown > span").textContent;
  fetchApi(
  `https://api.scratch.mit.edu/users/${username}/projects/`,
  practice
  )
}

//検索した時にスコアを表示
main()



