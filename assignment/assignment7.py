file_path = 'assignment/성적_sample.csv'

weight = [0.1, 0.05, 0.05, 0.05, 0.05, 0.3, 0.4]
with open(file_path, 'r', encoding='utf-8-sig') as file:
  content = file.read()

student = {}
for i, line in enumerate(content.splitlines()):
  if i==0:
    info = line.split(',')
  else:
    student[line.split(',')[0]] = list(map(str, line.split(',')[1:]))

while True:
  studentNum = input('학생의 학번을 입력해주세요. (종료를 입력하면 프로그램이 종료됩니다.):')
  if studentNum == '종료':
    print('프로그램을 종료합니다.')
    break
  if studentNum in student:
    print('=======================')
    print(studentNum, '학생의 점수')
    for j, k in zip(info[1:], student[studentNum]):
      print(f'{j}: {k}')
    print('항목별 가중점수')
    totalScore = 0
    for j, k, l in zip(student[studentNum][3:], weight, info[4:]):
      print(f'{l}: {int(j)*k:.2f}')
      totalScore += int(j)*k
    print(f'최종점수: {totalScore:.2f}')
    with open('assignment/성적_output.csv', 'w', encoding='utf-8-sig') as file:
      file.write(f'{",".join(info)},최종점수\n')
      for key, values in student.items():
        totalScore = sum(int(v) * w for v, w in zip(values[3:], weight))
        file.write(f'{key},{",".join(values)},{int(totalScore)}\n')
  else:
    print('학생의 학번이 존재하지 않습니다.')