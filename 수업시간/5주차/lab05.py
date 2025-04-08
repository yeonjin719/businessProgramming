# 산술평균 최댓값, 최소값을 구하는 함수를 포함하는 프로그램 
# 사용자한테 어떤 작업 할 건지 입력받기
list = [79,60,57,60,59,54,46,52,55,44]

def Maximum(list):
  return max(list)

def Minimum(list):
  return min(list)

def Average(list):
  return sum(list)/len(list)

while True:
  print('산술평균, 최댓값, 최소값을 구해주는 프로그램입니다. 원하는 작업의 번호를 입력해주세요.')
  print('1: 산술평균, 2: 최댓값, 3: 최솟값, 0: 프로그램 종료')
  num = int(input('번호를 입력해주세요: '))
  if (num == 0):
    print('프로그램을 종료합니다')
    break
  elif (num == 1):
    print(Average(list))
  elif (num==2):
    print(Maximum(list))
  elif (num==3):
    print(Minimum(list))
  else:
    print('번호를 잘못 입력하셨습니다. 다시 입력해주세요')
    