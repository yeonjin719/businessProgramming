import random

def get_random_number():
  numList = []
  while True:
    num = random.randrange(1, 9)
    if (num not in numList):
      numList.append(num)
    if (len(numList) == 3):
      break
  return numList[0]*100+numList[1]*10+numList[2]
    
def explain():
  print('Baseball Game: balls & strikes')
  print('입력하신 숫자와 정답 숫자 배열이 숫자와 자리가 모두 일치하면 strike')
  print('숫자는 일치하지만 자리가 다르면 ball로 표현됩니다')
  print('정답과 입력하신 숫자가 일치할 때까지 게임이 지속됩니다.')
  print('숫자는 1에서 9 사이 숫자로만 이루어져있습니다')
  

def errorMessage(errorMessage):
    print()      
    print('========================================')
    print()
    print(f'{errorMessage}')
    print()
    print('========================================')
    print()
    
    
def isValid(guessNum):
  if (len(guessNum)!=3):
    errorMessage('세자리 숫자를 입력해주세요')
    return False
  elif (len(set(guessNum))!=3):
    errorMessage('중복되는 숫자가 없도록 입력해주세요')
    return False
  elif (guessNum.isdigit()==False):
    errorMessage('숫자만 입력해주세요')
    return False
  else:
    return True
  
def calculate(guessNum, randomNum):
  ball = 0
  strike = 0
  index = []
  for i in range(3):
    if guessNum[i]==str(randomNum)[i]:
      strike += 1
      index.append(i)
  for j in range(3):
    if j in index:
      pass
    else:
      if guessNum[j] in str(randomNum):
        ball += 1 
  return ball, strike
  
def play(randomNum):
  explain()
  while True:
    guess = input('숫자를 입력해주세요(100~999): ')
    if (isValid(guess)==True):
      ball, strike = calculate(guess, str(randomNum))
      print()
      print('========================================')
      print()
      if (strike == 3):
        print(f'{strike} strikes')
        break
      else:
        if (ball <= 1):
          print(f'{ball} ball', end=' ')
        else:
          print(f'{ball} balls', end=' ')
        if (strike <= 1):
          print(f'{strike} strike')
        else:
          print(f'{strike} strikes')
      print()
      print('========================================')
      print()

num = get_random_number()
print(num)
play(num)