import csv
data = []
data_Song = []
with open("천만영화_한국.csv", "r") as movieData: # csv 파일 열기
  csv_data = csv.reader(movieData)
  header = next(csv_data) # 첫 번째 줄은 필드명
  
  for row in csv_data:
    data.append(row)
    mainCharacter = row[8]
    if "송강호" in mainCharacter: 
      data_Song.append(row)

price = 0
attendance = 0
screenNum = 0
Numberofscreenings=0

with open("천만영화_송강호.csv", "w", encoding="utf8") as MrSongData:
  writer = csv.writer(MrSongData, delimiter=",", quotechar='"', quoting=csv.QUOTE_ALL, lineterminator="\n")
  writer.writerow(header) # 첫 번째 줄은 필드명
  for row in data_Song:
    writer.writerow(row)
    
    price += int(row[3].replace(',',''))
    attendance += int(row[4].replace(',',''))
    screenNum += int(row[5].replace(',',''))
    Numberofscreenings += int(row[6].replace(',',''))
    
print(len(data_Song))
print('매출액 총합',price)
print('관객수 총합',attendance)
print('스크린수 총합',screenNum)
print('상영횟수 총합',Numberofscreenings)

