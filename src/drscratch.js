// 引用元リポジトリ : https://github.com/AngelaVargas/drscratchv3
// Analyzer of projects sb3, the new version Scratch 3.0
('use strict')

export class Mastery {
  constructor(json_data) {
    this.mastery_dicc = {}
    this.total_blocks = []
    this.blocks_dicc = {}
    this.concepts = [
      'Abstraction',
      'Parallelism',
      'Logic',
      'Synchronization',
      'FlowControl',
      'UserInteractivity',
      'DataRepresentation',
    ]
    this.json_data = json_data
  }

  process() {
    const data = this.json_data

    if ('variables' in data) return false

    for (const key in data) {
      if (key === 'targets') {
        for (const dicc in data[key]) {
          const value = data[key][dicc]
          for (const dicc_key in value) {
            if (dicc_key === 'blocks') {
              const dicc_value = value[dicc_key]
              for (const blocks in dicc_value) {
                const blocks_value = dicc_value[blocks]
                if (typeof blocks_value === 'object') {
                  this.total_blocks.push(blocks_value)
                }
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < this.total_blocks.length; i++) {
      const block = this.total_blocks[i]
      for (const key in block) {
        if (key === 'opcode') {
          if (!this.blocks_dicc[block[key]]) this.blocks_dicc[block[key]] = 1
          else this.blocks_dicc[block[key]]++
        }
      }
    }
    this.analyze()
    return ([true, this.mastery_dicc['CTScore']])
  }

  analyze() {
    this.logic()
    this.flow_control()
    this.synchronization()
    this.abstraction()
    this.data_representation()
    this.user_interactivity()
    this.parallelism()
    this.ct_score()
    this.total_score()
  }

  ct_score() {
    let ctscore = 0
    for (let i = 0; i < this.concepts.length; i++) {
      const concept = this.concepts[i]
      if (!this.mastery_dicc[concept]['MaxScore'])
        this.mastery_dicc[concept]['MaxScore'] = 0
      ctscore += this.mastery_dicc[concept]['MaxScore']
      this.mastery_dicc['CTScore'] = ctscore
    }
  }

  total_score() {
    let total = 0

    for (let i = 0; i < this.concepts.length; i++) {
      const concept = this.concepts[i]
      for (const score in [1, 2, 3]) {
        if (this.mastery_dicc[concept][score]) total += score
      }
    }
    console.log(this.mastery_dicc)
    this.mastery_dicc['Total'] = total
  }

  logic() {
    this.mastery_dicc['Logic'] = { 1: false, 2: false, 3: false }
    const operations = ['operator_and', 'operator_or', 'operator_not']

    // 3点の計測処理
    operations.forEach((operation) => {
      if (this.blocks_dicc[operation]) {
        this.mastery_dicc['Logic'][3] = true
      }
    })   

    // 2点の計測処理
    if (this.blocks_dicc['control_if_else']) {
      this.mastery_dicc['Logic'][2] = true
    }

    // 1点の計測処理
    if (this.blocks_dicc['control_if']) {
      this.mastery_dicc['Logic'][1] = true
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (this.mastery_dicc['Logic'][i]) {
        max_score = i
        break
      }
    }

    this.mastery_dicc['Logic']['MaxScore'] = max_score
  }

  flow_control() {
    this.mastery_dicc['FlowControl'] = { 1: false, 2: false, 3: false }

    // 3点の計測処理
    if (this.blocks_dicc['control_repeat_until']) {
      this.mastery_dicc['FlowControl'][3] = true
    }

    // 2点の計測処理
    if (
      this.blocks_dicc['control_repeat'] &&
      this.blocks_dicc['control_forever']
    ) {
      this.mastery_dicc['FlowControl'][2] = true
    }

    // 1点の計測処理
    for (let i = 0; i < this.total_blocks.length; i++) {
      const block = this.total_blocks[i]
      for (const key in block) {
        if (key === 'next' && block[key]) {
          this.mastery_dicc['FlowControl'][1] = true
          break
        }
      }
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (this.mastery_dicc['FlowControl'][i]) {
        max_score = i
        break
      }
    }
    this.mastery_dicc['FlowControl']['MaxScore'] = max_score
  }

  synchronization() {
    this.mastery_dicc['Synchronization'] = { 1: false, 2: false, 3: false }

    // 3点の計測処理
    if (
      this.blocks_dicc['control_wait_until'] ||
      this.blocks_dicc['event_whenbackdropswitchesto'] ||
      this.blocks_dicc['event_broadcastandwait']
    ) {
      this.mastery_dicc['Synchronization'][3] = true
    }

    // 2点の計測処理
    if (
      this.blocks_dicc['event_broadcast'] ||
      this.blocks_dicc['event_whenbroadcastreceived'] ||
      this.blocks_dicc['control_stop']
    ) {
      this.mastery_dicc['Synchronization'][2] = true
    }

    // 1点の計測処理
    if (this.blocks_dicc['control_wait']) {
      this.mastery_dicc['Synchronization'][1] = true
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (this.mastery_dicc['Synchronization'][i]) {
        max_score = i
        break
      }
    }
    this.mastery_dicc['Synchronization']['MaxScore'] = max_score
  }

  abstraction() {
    this.mastery_dicc['Abstraction'] = { 1: false, 2: false, 3: false }

    // 3点の計測処理
    if (this.blocks_dicc['control_start_as_clone']) {
      this.mastery_dicc['Abstraction'][3] = true
    }

    // 2点の計測処理
    if (this.blocks_dicc['procedures_definition']) {
      this.mastery_dicc['Abstraction'][2] = true
    }

    // 1点の計測処理
    let count = 0
    for (let i = 0; i < this.total_blocks.length; i++) {
      const block = this.total_blocks[i]
      for (const key in block) {
        if (key === 'parent' && !block[key]) {
          count++
        }
      }
    }
    if (count > 1) {
      this.mastery_dicc['Abstraction'][1] = true
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (this.mastery_dicc['Abstraction'][i]) {
        max_score = i
        break
      }
    }
    this.mastery_dicc['Abstraction']['MaxScore'] = max_score
  }

  data_representation() {
    this.mastery_dicc['DataRepresentation'] = {
      1: false,
      2: false,
      3: false,
    }

    const modifiers = [
      'motion_movesteps',
      'motion_gotoxy',
      'motion_glidesecstoxy',
      'motion_setx',
      'motion_sety',
      'motion_changexby',
      'motion_changeyby',
      'motion_pointindirection',
      'motion_pointtowards',
      'motion_turnright',
      'motion_turnleft',
      'motion_goto',
      'looks_changesizeby',
      'looks_setsizeto',
      'looks_switchcostumeto',
      'looks_nextcostume',
      'looks_changeeffectby',
      'looks_seteffectto',
      'looks_show',
      'looks_hide',
      'looks_switchbackdropto',
      'looks_nextbackdrop',
    ]

    const lists = [
      'data_lengthoflist',
      'data_showlist',
      'data_insertatlist',
      'data_deleteoflist',
      'data_addtolist',
      'data_replaceitemoflist',
      'data_listcontainsitem',
      'data_hidelist',
      'data_itemoflist',
    ]

    // 3点の計測処理
    lists.forEach((item) => {
      if (this.blocks_dicc[item]) {
        this.mastery_dicc['DataRepresentation'][3] = true
      }
    })

    // 2点の計測処理
    if (
      this.blocks_dicc['data_changevariableby'] ||
      this.blocks_dicc['data_setvariableto']
    ) {
      this.mastery_dicc['DataRepresentation'][2] = true
    }

    // 1点の計測処理
    modifiers.forEach((modifier) => {
      if (this.blocks_dicc[modifier]) {
        this.mastery_dicc['DataRepresentation'][1] = true
      }
    })

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (this.mastery_dicc['DataRepresentation'][i]) {
        max_score = i
        break
      }
    }

    this.mastery_dicc['DataRepresentation']['MaxScore'] = max_score
  }

  check_mouse() {
    for (let i = 0; i < this.total_blocks.length; i++) {
      const block = this.total_blocks[i]
      for (const key in block) {
        if (key === 'fields') {
          for (const mouse_key in block) {
            if (
              (mouse_key === 'TO' || mouse_key === 'TOUCHINGOBJECTMENU') &&
              block[mouse_key][0] === '_mouse_'
            ) {
              return 1
            }
          }
        }
      }
    }
    return 0
  }

  user_interactivity() {
    this.mastery_dicc['UserInteractivity'] = {
      1: false,
      2: false,
      3: false,
    }

    const proficiency = [
      'videoSensing_videoToggle',
      'videoSensing_videoOn',
      'videoSensing_whenMotionGreaterThan',
      'videoSensing_setVideoTransparency',
      'sensing_loudness',
    ]

    const developing = [
      'event_whenkeypressed',
      'event_whenthisspriteclicked',
      'sensing_mousedown',
      'sensing_keypressed',
      'sensing_askandwait',
      'sensing_answer',
    ]

    // 3点の計測処理
    proficiency.forEach((item) => {
      if (this.blocks_dicc[item]) {
        this.mastery_dicc['UserInteractivity'][3] = true
      }
    })

    // 2点の計測処理
    developing.forEach((item) => {
      if (this.blocks_dicc[item]) {
        this.mastery_dicc['UserInteractivity'][2] = true
      }
    })

    // 2点の計測処理
    if (this.mastery_dicc['UserInteractivity'][2] == false) {
      if (this.blocks_dicc['motion_goto_menu']) {
        if (this.check_mouse() === 1) {
          this.mastery_dicc['UserInteractivity'][2] = true
        } else if (this.blocks_dicc['sensing_touchingobjectmenu']) {
          if (this.check_mouse() == 1) {
            this.mastery_dicc['UserInteractivity'][2] = true
          }
        }
      }
    }

    // 1点の計測処理
    if (this.blocks_dicc['event_whenflagclicked']) {
      this.mastery_dicc['UserInteractivity'][1] = true
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (this.mastery_dicc['UserInteractivity'][i]) {
        max_score = i
        break
      }
    }

    this.mastery_dicc['UserInteractivity']['MaxScore'] = max_score
  }

  parallelism() {
    this.mastery_dicc['Parallelism'] = { 1: false, 2: false, 3: false }
    let dict_parall = {}
    dict_parall = this.parallelism_dict()

    // 3点の計測処理
    if (this.blocks_dicc['event_whenbroadcastreceived'] > 1) {
      if (dict_parall['BROADCAST_OPTION']) {
        const var_list = new Set(dict_parall['BROADCAST_OPTION'])
        let count = 0
        var_list.forEach((varr) => {
          dict_parall['BROADCAST_OPTION'].forEach((key) => {
            if (key === varr) count++
          })
        })
        if(count > 1) this.mastery_dicc['Parallelism'][3] = true
      }
    } else if (this.blocks_dicc['event_whenbackdropswitchesto'] > 1) {
      if (dict_parall['BACKDROP']) {
        const var_list = new Set(dict_parall['BACKDROP'])
        let count = 0
        var_list.forEach((varr) => {
          dict_parall['BACKDROP'].forEach((key) => {
            if (key === varr) count++
          })
        })
        if(count > 1) this.mastery_dicc['Parallelism'][3] = true
      }
    } else if (this.blocks_dicc['event_whengreaterthan'] > 1) {
      if (dict_parall['WHENGREATERTHANMENU']) {
        const var_list = new Set(dict_parall['WHENGREATERTHANMENU'])
        let count = 0
        var_list.forEach((varr) => {
          dict_parall['WHENGREATERTHANMENU'].forEach((key) => {
            if (key === varr) count++
          })
        })
        if(count > 1) this.mastery_dicc['Parallelism'][3] = true
      }
    } else if (this.blocks_dicc['videoSensing_whenMotionGreaterThan'] > 1) {
      this.mastery_dicc['Parallelism'][3] = true
    }


    // 2点の計測処理
    if (this.blocks_dicc['event_whenkeypressed'] > 1) {
      console.log(dict_parall['KEY_OPTION'])
      if (dict_parall['KEY_OPTION']) {
        const var_list = new Set(dict_parall['KEY_OPTION'])
        let count = 0
        var_list.forEach((varr) => {
          dict_parall['KEY_OPTION'].forEach((key) => {
            if (key === varr) count++
          })
        })
        if(count > 1) this.mastery_dicc['Parallelism'][2] = true
      }
    }

    // 1点の計測処理
    if (this.blocks_dicc['event_whenflagclicked'] > 1) {
      this.mastery_dicc['Parallelism'][1] = true
    }

    // 最高点数の計測処理

    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (this.mastery_dicc['Parallelism'][i]) {
        max_score = i
        break
      }
    }

    this.mastery_dicc['Parallelism']['MaxScore'] = max_score
  }

  parallelism_dict() {
    let dicc = {}

    for (let i = 0; i < this.total_blocks.length; i++) {
      const block = this.total_blocks[i]
      for (const key in block) {
        if (key === 'fields') {
          for (const key_pressed in block[key]) {
            if (dicc[key_pressed]) {
              dicc[key_pressed].push(block[key][key_pressed][0])
            } else {
              dicc[key_pressed] = block[key][key_pressed]
            }
          }
        }
      }
    }

    return dicc
  }
}