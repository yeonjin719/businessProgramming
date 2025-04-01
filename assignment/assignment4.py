n = int(input("구구단을 입력하세요(2~9, 0 종료): "))

while (n < 2 or n >9 ):
  if (n == 0):
    print("프로그램을 종료합니다.")
    break
  print("잘못된 입력입니다. 2~9 사이의 숫자를 입력하세요.")
  n = int(input("구구단을 입력하세요(2~9, 0 종료): "))

if (n != 0):
  for i in range(1,10):
    print(f'{n} x {i} = {n*i}')