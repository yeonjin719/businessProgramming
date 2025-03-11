student = {
  '홍길동': {
    '출석': 70,
    '과제': 80,
    '중간': 100,
    '기말': 50
  },
  '김길동': {
    '출석': 85,
    '과제': 90,
    '중간': 80,
    '기말': 80
  },
  '이길동': {
    '출석': 100,
    '과제': 60,
    '중간': 65,
    '기말': 75
  },
  '박길동': {
    '출석': 100,
    '과제': 75,
    '중간': 30,
    '기말': 55
  },
  '고길동': {
    '출석': 90,
    '과제': 80,
    '중간': 100,
    '기말': 100
  }
}

def calculate(a,b,c,d):
  return (a*0.1) + (b*0.3) + (c*0.1) + (d*0.5)

for i in student:
    print(i,'학생의 점수')
    print('    출석:',student[i]['출석'])
    print('    과제:',student[i]['과제'])
    print('    중간:',student[i]['중간'])
    print('    기말:',student[i]['기말'])
    totalScore = calculate(student[i]['출석'], student[i]['과제'],student[i]['중간'],student[i]['기말'])
    print('최종 점수:', totalScore, end='\n\n')