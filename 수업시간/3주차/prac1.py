baseball_teams = ['SSG', '키움', 'LG', 'KT', 'KIA', 'NC', '삼성', '롯데', '두산', '한화']
# print(len(baseball_teams)) # len() 함수는 list의 길이를 반환
# print(baseball_teams[0:5]) # index 0부터 5바로 앞까지
# print(baseball_teams[:]) # 처음부터 끝까지
# print(baseball_teams[5:]) # index 5부터 끝까지
# print(baseball_teams[-5:]) # index -5부터 끝까지
# print(baseball_teams[-50:50]) # 범위를 벗어나면 자동으로 전체 범위 지정
# print(baseball_teams[::2]) # 2칸 단위로
# print(baseball_teams[::-2]) # 2칸 단위 역순으로
# print(baseball_teams[1::3]) # index 1부터 3칸 단위로

# print(baseball_teams) # 65 90 97 122

for i in range(len(baseball_teams)):
  word = baseball_teams[i]
  isEnglish = False
  for j in word:
    if ord(j) >=65 and ord(j) <= 90:
      isEnglish = True
    elif ord(j) >= 97 and ord(j) <= 122:
      isEnglish = True
    else:
      isEnglish = False
      break
  if isEnglish:
    print(word)