import csv
header = []
data = []
data_Germany = []

with open("SalesJan2009.csv", "r") as sales_data: # csv 파일 열기
  csv_data = csv.reader(sales_data)
  header = next(csv_data) # 첫 번째 줄은 필드명
  
  for row in csv_data:
    data.append(row)
    country = row[7]
    if country == "Germany": 
      data_Germany.append(row) # 'Country' 필드가 Germany인 데이터만 별도로 저장
print(len(data))

# 'Country' 필드가 France인 데이터만 별도 csv 파일로 저장
with open("SalesJan2009_Germany.csv", "w", encoding="utf8") as sales_data_Germany:
  writer = csv.writer(sales_data_Germany, delimiter=",", quotechar='"', quoting=csv.QUOTE_ALL, lineterminator="\n")
  writer.writerow(header) # 첫 번째 줄은 필드명
  for row in data_Germany:
    writer.writerow(row)
print(len(data_Germany))