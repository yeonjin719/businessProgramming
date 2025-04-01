hong = [70, 80, 100, 50]
kim = [85, 90, 80, 80]
lee = [100, 60, 65, 75]
park = [100, 75, 30, 55]
ko = [90, 80, 100, 100]

total_score = [hong, kim, lee, park, ko]
score_info = ['출석', '과제', '중간', '기말', '최종점수']
student = ['홍길동', '김길동', '이길동', '박길동', '고길동']

def calculate(scores):
  return (scores[0]*0.1) + (scores[1]*0.3) + (scores[2]*0.1) + (scores[3]*0.5)

for i in range(len(student)): 
  print(student[i],'학생의 점수')
  total_score[i].append(calculate(total_score[i])) 
  for j in range(5):
    print(score_info[j], total_score[i][j])