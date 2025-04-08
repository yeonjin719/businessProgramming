# 산술평균 최댓값, 최소값을 구하는 함수를 포함하는 프로그램 
# 사용자한테 어떤 작업 할 건지 입력받기
nums = [79,60,57,60,59,54,46,52,55,44]

def Maximum(_nums):
  return max(_nums)

def Minimum(_nums):
  return min(_nums)

def Average(_nums):
  return sum(_nums)/len(_nums)

while True:
  print('산술평균, 최댓값, 최소값을 구해주는 프로그램입니다. 원하는 작업의 번호를 입력해주세요.')
  print('1: 산술평균, 2: 최댓값, 3: 최솟값, 0: 프로그램 종료')
  num = int(input('번호를 입력해주세요: '))
  if (num == 0):
    print('프로그램을 종료합니다')
    break
  elif (num == 1):
    print(Average(nums))
  elif (num == 2):
    print(Maximum(nums))
  elif (num == 3):
    print(Minimum(nums))
  else:
    print('번호를 잘못 입력하셨습니다. 다시 입력해주세요')
    