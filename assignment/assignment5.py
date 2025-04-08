hong = [70, 80, 100, 50]
kim = [85, 90, 80, 80]
lee = [100, 60, 65, 75]
park = [100, 75, 30, 55]
ko = [90, 80, 100, 100]

total_score = [hong, kim, lee, park, ko]
weights =[0.1, 0.3, 0.1, 0.5]
score_info = ['출석', '과제', '중간', '기말', '최종점수']
student = ['홍길동', '김길동', '이길동', '박길동', '고길동']

def findStudent(name):
    for i in range(len(student)):
      if student[i] == name:
        return i
    else:
      return None
    
def pringOriginalScore(index):
    print('==================================================')
    print(student[index], '학생의 원점수')
    for j in range(len(total_score[index])):
        print(score_info[j]+":", total_score[index][j])

def printWeightedScores(index):
    print('==================================================')
    print(student[index], '학생의 가중 점수')
    for i in range(len(total_score[index])):
      print(score_info[i]+':', total_score[index][i]*weights[i], '('+str(weights[i]*100)+'점 만점)')

def printTotalScore(index):
  print('==================================================')
  print(student[index], '학생의 최종 점수:', end=' ')
  weighted_score = 0
  for i in range(len(total_score[index])):
    weighted_score += total_score[index][i] * weights[i]
  print(weighted_score)


def step1():
  while True:
    name = input('학생이름을 입력하세요 (0을 입력하면 프로그램이 종료됩니다): ')
    if name == '0':
      print('프로그램을 종료합니다.')
      break
    index = findStudent(name)
    if index != None:
      step2(index)
      break
    else:
      print('학생이름을 잘못 입력하였습니다. 다시 입력해주세요')
      continue

def step2(index):
  while True:
    print('==================================================')
    print('선택한 학생 이름:', student[index])
    print('1: 원점수 출력')
    print('2: 가중 점수 출력')
    print('3: 최종 점수 출력')
    print('0: 이름 입력 단계로 돌아가기')
    
    choice = int(input('원하는 메뉴를 선택하세요: '))
    if choice == 1:
      pringOriginalScore(index)
      break
    elif choice == 2:
      printWeightedScore(index)
      break
    elif choice == 3:
      printTotalScore(index)
      break
    elif choice == 0:
      step1()
      break
    else:
      print('잘못된 선택입니다. 다시 선택해주세요.')
      continue
    
step1()