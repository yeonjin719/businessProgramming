import math
r = float(input('반지름을 입력해주세요: '))
pi=3.14
area = pi * r**2
circumference = 2 * pi * r

# 반올림의 경우
print(f'원의 넓이: {round(area, 2)}')
print(f'원의 둘레: {round(circumference, 2)}')

# 버림의 경우
# print('원의 넓이: ', math.floor( area * pi * r**2 * 100)/100)
# print('원의 둘레: ', math.floor(circumference * 100)/100)