import math
print('반지름을 입력해주세요: ' , end='')
r = float(input())
pie=3.14
extend = pie * r**2
circumference = 2 * pie * r
print('원의 넓이: %.2f' %extend )
print('원의 둘레:  %.2f' %circumference)