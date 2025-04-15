f = open('수업시간/6주차/Let_it_go.txt', 'r', encoding='utf-8') 
letitgo_lyric = ''  

def findString(targetWord, lines):
  stringCount = 0
  linesList = lines.split('\n')
  for i in linesList:
    if targetWord in i:
      stringCount += i.count(targetWord)
  return stringCount

def findWord(targetWord, lines):
  wordCount = 0
  linesList = list(lines.split('\n'))
  for i in linesList:
    line_word_list = i.split(' ')
    for j in line_word_list:

      if targetWord == j:
        wordCount += 1
  return wordCount
  


while True:
  line = f.readline()
  if not line:
    break
  letitgo_lyric = letitgo_lyric+line.strip() + '\n'
f.close()

target = input('찾고자하는 문자를 입력해주세요')
print('문자 기준 개수:', findString(target, letitgo_lyric))
print('단어 기준 개수:', findWord(target, letitgo_lyric))
