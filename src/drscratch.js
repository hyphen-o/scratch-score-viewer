// 引用元リポジトリ : https://github.com/AngelaVargas/drscratchv3
// Analyzer of projects sb3, the new version Scratch 3.0

'use strict'

export class Mastery {
  constructor(self) {
    self.matstery_dicc = {}
    self.total_blocks = []
    self.blocks_dicc = []
    self.concepts = [
      'Abstraction',
      'Parallelism',
      'Logic',
      'Synchronization',
      'FlowControl',
      'UserInteractivity',
      'DataRepresentation',
    ]
  }

  processs(self) {
    const json = fs.readFileSync('./project.json', 'utf-8');
    const data = JSON.parse(json)
  }

  analyze(self) {
    self.logic()
    self.flow_control()
    self.synchronization()
    self.abstraction()
    self.data_representation()
    self.user_interactivity()
    self.parallelism()
    self.ct_score()
    self.total_score()

    console.log(self)
  }

  total_score(self) {
    let total = 0

    for (const concept in self.concepts) {
      for (const score in [1, 2, 3]) {
        if (self.mastery_dicc[concept][score]) total += score
      }
    }

    self.mastery_dicc['Total'] = total
  }

  logic(self) {
    self.mastery_dicc['Logic'] = { 1: false, 2: false, 3: false }
    const operations = ['operator_and', 'operator_or', 'operator_not']

    // 3点の計測処理
    for (const operation in operations) {
      if (self.blocks_dicc[operation]) {
        self.mastery_dicc['Logic'][3] = true
      }
    }

    // 2点の計測処理
    if (self.blocks_dicc['control_if_else']) {
      self.mastery_dicc['Logic'][2] = true
    }

    // 1点の計測処理
    if (self.blocks_dicc['control_if']) {
      self.mastery_dicc['Logic'][1] = true
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (self.mastery_dicc['Logic'][i]) {
        max_score = i
        break
      }
    }

    self.mastery_dicc['Logic']['MaxScore'] = max_score
  }

  flow_control(self) {
    self.mastery_dicc['FlowControl'] = { 1: false, 2: false, 3: false }

    // 3点の計測処理
    if (self.blocks_dicc['control_repeat_until']) {
      self.mastery_dicc['FlowControl'][3] = true
    }

    // 2点の計測処理
    if (
      self.blocks_dicc['control_repeat'] &&
      self.blocks_dicc['control_forever']
    ) {
      self.mastery_dicc['FlowControl'][2] = true
    }

    // 1点の計測処理
    for (const block in self.total_blocks) {
      for (const { key, value } in block.items()) {
        if (key == 'next' && value) {
          self.mastery_dicc['FlowControl'][1] = true
          break
        }
      }
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (self.mastery_dicc['FlowControl'][i]) {
        max_score = i
        break
      }
    }
    self.mastery_dicc['FlowControl']['MaxScore'] = max_score
  }

  synchronization(self) {
    self.mastery_dicc['Synchronization'] = { 1: false, 2: false, 3: false }

    // 3点の計測処理
    if (
      self.blocks_dicc['control_wait_until'] ||
      self.blocks_dicc['event_whenbackdropswitchesto'] ||
      self.blocks_dicc['event_broadcastandwait']
    ) {
      self.mastery_dicc['Synchronization'][3] = true
    }

    // 2点の計測処理
    if (
      self.blocks_dicc['event_broadcast'] ||
      self.blocks_dicc['event_whenbroadcastreceived'] ||
      self.blocks_dicc['control_stop']
    ) {
      self.mastery_dicc['Synchronization'][2] = true
    }

    // 1点の計測処理
    if (self.blocks_dicc['control_wait']) {
      self.mastery_dicc['Synchronization'][1] = true
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (self.mastery_dicc['Synchronization'][i]) {
        max_score = i
        break
      }
    }
    self.mastery_dicc['Synchronization']['MaxScore'] = max_score
  }

  abstraction(self) {
    self.mastery_dicc['Abstraction'] = { 1: false, 2: false, 3: false }

    // 3点の計測処理
    if (self.blocks_dicc['control_start_as_clone']) {
      self.mastery_dicc['Abstraction'][3] = true
    }

    // 2点の計測処理
    if (self.blocks_dicc['procedures_definition']) {
      self.mastery_dicc['Abstraction'][2] = true
    }

    // 1点の計測処理
    let count = 0
    for (const block in self.total_blocks) {
      for (const { key, value } in block.items()) {
        if (key === 'parent' && !value) {
          count++
        }
      }
    }
    if (count > 1) {
      self.mastery_dicc['Abstraction'][1] = true
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (self.mastery_dicc['Abstraction'][i]) {
        max_score = i
        break
      }
    }
    self.mastery_dicc['Abstraction']['MaxScore'] = max_score
  }

  data_representation(self) {
    self.mastery_dicc['DataRepresentation'] = {
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

    for (const item in lists) {
      if (self.blocks_dicc[item]) {
        self.mastery_dicc['DataRepresentation'][3] = true
        break
      }
    }

    if (
      self.blocks_dicc['data_changevariableby'] ||
      self.blocks_dicc['data_setvariableto']
    ) {
      self.mastery_dicc['DataRepresentation'][2] = true
    }

    for (const modifier in modifiers) {
      if (self.blocks_dicc[modifier]) {
        self.mastery_dicc['DataRepresentation'][1] = true
      }
    }

    // 最高点数の計測処理
    let max_score = 0
    for (let i = 3; i >= 0; i--) {
      if (self.mastery_dicc['DataRepresentation'][i]) {
        max_score = i
        break
      }
    }

    self.mastery_dicc['DataRepresentation']['MaxScore'] = max_score
  }

  check_mouse(self) {
    for(const block in self.total_blocks) {
      for(const {key, value} in block.items()) {
        if(key === 'fields') {
          for(const {mouse_key, mouse_val} in block.items()) {
            if((mouse_key === 'TO' || mouse_key === 'TOUCHINGOBJECTMENU') && mouse_val[0] === '_mouse_') {
              return 1;
            }
          }
        }
      }
    }
    return 0;
  }



  parallelism(self) {
    // self.mastery_dicc['Parallelism'] = { 1: false, 2: false, 3: false }
    // let dict_parall = {}
    // dict_parall = self.parallelism_dict()

    // // 3点の計測処理
    // if (self.blocks_dicc['event_whenbroadcastreceived'] > 1) {
    //   if (dict_parall['BROADCAST_OPTION']) {
    //     const var_list = new Set(dict_parall['BROADCAST_OPTION'])
    //     for (const varr in var_list) {
    //       if (dict_parall['BROADCAST_OPTION'].count(varr) > 1) {
    //           self.mastery_dicc['Parallelism'][3] = true
    //       }
    //     }
    //   }
    // }
    // else if (self.blocks_dicc['event_whenbackdropswitchesto'] > 1) {
    //   if (dict_parall['BACKDROP']) {
    //     const var_list = new Set(dict_parall['BACKDROP'])
    //     for (const varr in var_list) {
    //       if (dict_parall['BACKDROP'].count(varr) > 1) {
    //           self.mastery_dicc['Parallelism'][3] = true
    //       }
    //     }
    //   }
    // }
    // else if (self.blocks_dicc['event_whengreaterthan'] > 1) {
    //   if (dict_parall['WHENGREATERTHANMENU']) {
    //     const var_list = new Set(dict_parall['WHENGREATERTHANMENU'])
    //     for (const varr in var_list) {
    //       if (dict_parall['WHENGREATERTHANMENU'].count(varr) > 1) {
    //           self.mastery_dicc['Parallelism'][3] = true
    //       }
    //     }
    //   }
    // }
    // else if (self.blocks_dicc['videoSensing_whenMotionGreaterThan'] > 1) {
    //         self.mastery_dicc['Parallelism'][3] = true
    // }
    // // 2点の計測処理
    // if (self.blocks_dicc['event_whenkeypressed'] > 1) {
    //   if (dict_parall['KEY_OPTION']) {
    //     const var_list = new Set(dict_parall['KEY_OPTION'])
    //     for (const varr in var_list) {
    //       if (dict_parall['KEY_OPTION'].count(varr) > 1) {
    //           self.mastery_dicc['Parallelism'][3] = true
    //       }
    //     }
    //   }
    // }

    // 1点の計測処理

    // 最高点数の計測処理

    self.mastery_dicc['Parallelism']['MaxScore'] = 2
  }

  parallelism_dict(self) {
    let dicc = {}

    for (const block in self.total_blocks) {
      for (const { key, value } in block.items()) {
        if (key === 'fields') {
          for (const { key_pressed, val_pressed } in value.items()) {
            if (dicc.findIndex(key_pressed) !== -1) {
              dicc[key_pressed].push(val_pressed[0])
            } else {
              dicc[key_pressed] = val_pressed
            }
          }
        }
      }
    }

    return dicc
  }

  main(){
    try {
      this.process()
      this.analyze()
    } catch (error) {
      console.log(error)
    }
  }
}
