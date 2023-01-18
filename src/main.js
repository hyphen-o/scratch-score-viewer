import { Mastery } from './drscratch.js'

function main() {
    const mastery = new Mastery()
    let totalscore = 0

    try {
        mastery.process();
        console.log(mastery.mastery_dicc['Total'])
      } catch (error) {
        console.log(error)
      }
}

main()