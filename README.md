# scratch-score-viewer

Scratch 上で検索した作品の CT スコアを可視化するための Chrome 拡張機能です．
公開されている作品を参考に学習を行いたい際に，そのプログラムの実装に必要な CT スキル（プログラミング的思考能力）が可視化されていることで，作品の選定が容易になります．

## drScratch.js

公開されている[Dr.Scratch の解析プログラム](https://github.com/AngelaVargas/drscratchv3)を Javascript に書き換えて拡張したプログラムです．

## search.js

計測したスコアを Scratch 上に表示するためのプログラムです．

## blocknames.json

Scratch2.0 と Scratch3.0 間の対応するブロック名をまとめた JSON ファイルです．これを基に Scratch2.0 のブロック名を Scratch3.0 のブロック名 に変換してスコアを計測しています．
