import { Mastery } from './drscratch.js'

function main() {
    const mastery = new Mastery()

    try {
        mastery.process();
        console.log(mastery.mastery_dicc['CTScore']);
      } catch (error) {
        console.log(error)
      }
}

main()