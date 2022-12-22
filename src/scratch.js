import { drscratch } from 'drscratch.js';
import { axios } from 'axios';

const thumbnail = document.getElementsByClassName("thumbnail-image");
const heading = document.querySelector("h1");

if(thumbnail) {
    for(let i = 0; i < thumbnail.length; i++) {
        const badge = document.createElement("p");
        badge.classList.add("color-secondary-text", "type--caption");
        badge.textContent = thumbnail[i].href.replace(/[^0-9]/g, '');
        heading.insertAdjacentElement("afterend", badge);
        const project_id = thumbnail[i].href.replace(/[^0-9]/g, '');

        const url = axios.get(`https://api.scratch.mit.edu/projects/${project_id}`)
            .then(() => {
                const project_token = JSON.stringify(url.text)['project_token']
            })
            // catchでエラー時の挙動を定義
            .catch(err => {
                console.log("err:", err);
            });
        // url = requests.get(
        //     f'https://api.scratch.mit.edu/projects/{project_id}')
        // project_token = json.loads(url.text)['project_token']
        // jsontext = requests.get(
        //     f'https://projects.scratch.mit.edu/{project_id}?token={project_token}').text
        drscratch.main()
    }
}



