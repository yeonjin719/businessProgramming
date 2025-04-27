from selenium import webdriver
from selenium.webdriver.common.by import By
import re
import time
import ast
from selenium.webdriver.chrome.options import Options
import os
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import google.generativeai as genai
from dotenv import load_dotenv

options = Options()
options.add_argument('user-data-dir=./term_project/userData')
options.add_argument('--disable-blink-features=AutomationControlled')
options.add_experimental_option('detach', True)
options.add_experimental_option('excludeSwitches', ['enable-logging'])
load_dotenv()

ratingAndSummaryPrompt = genai.GenerativeModel('gemini-1.5-flash-latest').start_chat(history=[
    {
        "role": "user",
        "parts": ["""
        파이썬 딕셔너리 형태로 너에게 이메일 정보를 줄거야
        index: [id, title, email, name, content] 의 구조를 가지고 있어.
        
        title과 content를 기준으로 중요도를 판단해서 0~10 사이의 점수를 매기고, content를 기반으로 메일을 한 줄로 요약해줘
        광고 메일에 대해서는 점수를 낮게 주기를 원해.
        사용자는 직장인으로 업무와 관련성이 높거나, 보안문제, 결제 내역 등의 내용이 담긴 메일을 특히 높게 점수를 주고싶어
        결과는 다음 형식으로만 간단히 리턴해줘.
        출력 예시:
        1: ['<id>', '8', '메일 내용 요약']
        2: ['<id>', '3', '메일 내용 요약']

        ❗ 절대 코드로 응답하지 말고, 결과만 줘.
        입력예시:
          1: ['FMfcgzQZVJzzFxftkpHjDCTQKRkKzKdC', 'Slack의 매화 [매주 화요일마다 회고]: 새 계정 세부정보','Slack','<no-reply134@slack.com>','Slack에 오신 것을 환영합니다.
              완료되었습니다! 고객님은 처음으로 Slack 워크스페이스에 참여했습니다. 이보다 더 기쁠 수가 없네요. 시작할 때 도움이 되는 몇 가지 팁과 함께 계정 세부 정보가 제공됩니다.
              매화 [매주 화요일마다 회고]
              everytuesdayremind.slack.com 	
              빠르게 둘러보기
              Slack의 기본 사항에 익숙해지면 즉시 작업을 시작할 수 있습니다.
              채널에서 작업 시작하기
              프로젝트, 주제 또는 팀과 관련된 모든 것을 위한 체계화된 공간인 채널에서 대화가 구성됩니다.
              Slack 다운로드
              Slack을 완벽하게 활용하려면 데스크톱 및 모바일용 앱을 다운로드하세요.']
      
        출력 예시(인덱스: [id, 점수]):
        1: ['FMfcgzQZVJzzFxftkpHjDCTQKRkKzKdC','8', 'Slack 워크스페이스 ‘매화 [매주 화요일마다 회고]’에 성공적으로 가입되었으며, 시작을 돕기 위한 안내와 앱 다운로드 링크가 포함된 환영 메일입니다.']
        """]
    }
])

replyPropmt = genai.GenerativeModel('gemini-1.5-flash-latest').start_chat(history=[
    {
        "role": "user",
        "parts": ["""
        파이썬 딕셔너리 형태로 너에게 이메일 정보를 줄거야.
        해당 이메일 정보는 내가 "받은" 이메일이야.
        해당 이메일에 어떻게 답장을 하면 좋을 지 답변을 너는 작성해줄거야.
        
        index: [id, title, email, name, content, 감정] 의 구조를 가지고 있어.
        ❗감정에는 항상 긍정, 부정이라는 값만 들어와.
        
        입력한 정보를 바탕으로 사용자가 입력한 감정에 맞추어 메일 답변을 작성해줘
        만약 사용자가 긍정이라는 감정을 입력하면 해당 메일에 긍정적인 답변을 작성해주고, 부정이라는 감정을 입력하면 부정적인 답변을 작성해줘.
        메일을 작성 할 때에는 한글로 작성하고, 정중한 어체를 사용해줘.
        답장을 세가지 작성해주고 하나의 답변을 작은 따옴표로 묶고, 답변끼리는 쉼표(,)로 구분해서 줘.

        ❗ 절대 코드로 응답하지 말고, 결과만 줘.
        입력예시:
          1: ['FMfcgzQZVJzzFxftkpHjDCTQKRkKzKdC', 'Slack의 매화 [매주 화요일마다 회고]: 새 계정 세부정보','Slack','<no-reply134@slack.com>','Slack에 오신 것을 환영합니다.
              완료되었습니다! 고객님은 처음으로 Slack 워크스페이스에 참여했습니다. 이보다 더 기쁠 수가 없네요. 시작할 때 도움이 되는 몇 가지 팁과 함께 계정 세부 정보가 제공됩니다.
              매화 [매주 화요일마다 회고]
              everytuesdayremind.slack.com 	
              빠르게 둘러보기
              Slack의 기본 사항에 익숙해지면 즉시 작업을 시작할 수 있습니다.
              채널에서 작업 시작하기
              프로젝트, 주제 또는 팀과 관련된 모든 것을 위한 체계화된 공간인 채널에서 대화가 구성됩니다.
              Slack 다운로드
              Slack을 완벽하게 활용하려면 데스크톱 및 모바일용 앱을 다운로드하세요.', 긍정]
      
        출력 예시:
          '안녕하세요,
            Slack 워크스페이스 초대 및 계정 세부 정보 공유 감사드립니다.
            매화 워크스페이스에 합류하게 되어 매우 기쁩니다. 공유해주신 가이드를 참고하여 빠르게 적응하겠습니다.
            앞으로 좋은 협업 기대하겠습니다.
            감사합니다.
            [당신의 이름]',
          '안녕하세요 :)
            초대해주셔서 감사합니다!
            벌써부터 매화 워크스페이스 분위기가 기대되네요. 안내해주신 자료들 꼼꼼히 살펴볼게요.
            앞으로 활발히 소통하며 잘 지내보아요!
            좋은 하루 되세요~'
          '워크스페이스 초대 감사합니다!
              공유해주신 정보 잘 확인했습니다.
              곧 Slack에서 뵐게요 :)'
        """]
    }
])

def Login(email, password):
  driver.find_element(By.XPATH, '//*[@id="identifierId"]').send_keys(email)
  driver.find_element(By.XPATH, '//*[@id="identifierNext"]/div/button').click()
  time.sleep(5)
  driver.find_element(By.XPATH,'//*[@id="password"]/div[1]/div/div[1]/input').send_keys(password)
  driver.find_element(By.XPATH,'//*[@id="passwordNext"]/div/button').click()

def isFirst():
  if not os.path.isdir('term_project/userData'):
      email = os.getenv('GMAIL_EMAIL')
      password = os.getenv('GMAIL_PASSWORD')
      Login(email, password)

def findUnread():
  driver.get('https://mail.google.com/mail/u/0/?pli=1#search/is%3Aunread')
  time.sleep(5)
  target = driver.find_element(By.CLASS_NAME, 'bv9')
  table = target.find_element(By.CLASS_NAME, 'Cp')
  rows = table.find_elements(By.TAG_NAME , 'tr')
  return rows

def getEmailsId():
  url = driver.current_url  # 현재 URL 가져옴
  # 메일 ID 추출
  match = re.search(r'#search/is%3Aunread/([^/]+)$', url)
  if match:
      message_id = match.group(1)
  return message_id
      

def analysisWithAI(id, title, name, email, content, index):
  # responses = {}
  input_str= f"{index}: ['{id}', '{title}', '{name}', '{email}', '{content}']"
  try:
      response = ratingAndSummaryPrompt.send_message(input_str)
  except Exception as e:
      print("제한 초과, 60초 후 재시도")
      time.sleep(60)
      response = ratingAndSummaryPrompt.send_message(input_str)
  # print(response.text)
  key, value_str = response.text.split(":", 1)
  value = ast.literal_eval(value_str.strip())
  # responses[key.strip()] = value
  return key.strip(), value

def getEmails(rows):
  if (len(rows) == 0):
    print('새로운 메일이 없습니다')
    return
  emails = {}
  for i in range(len(rows)):
    element = rows[i].find_element(By.CLASS_NAME, 'xS')
    driver.execute_script("arguments[0].click();", element)
    time.sleep(2)
    title = driver.find_element(By.CLASS_NAME,'hP').text
    content = driver.find_element(By.CLASS_NAME, 'gs').text
    span = driver.find_element(By.CLASS_NAME, 'gD')
    email = span.get_attribute('email')
    name = span.get_attribute('name')
    id = getEmailsId()
    emails[i] = [id,title, email, name, content]
    key, value = analysisWithAI(id, title, name, email, content, i+1)
    data[key] = value
    menus = driver.find_element(By.CLASS_NAME, 'iH')
    button = menus.find_element(By.XPATH, './div[1]/div[3]/div[1]')
    driver.execute_script("arguments[0].click();", button)
  return emails

def splitSentence(text):
  raw_split = text.split("'")

  # 실제 문장만 추출 (빈 문자, 쉼표 제외)
  response_list = [s.strip() for s in raw_split if s.strip() and s.strip() != ',']

  # 결과 확인
  for i, r in enumerate(response_list, 1):
      print(f"[{i}] {r}\n")
  return response_list

def replyAnswerGenerate(emails):
    while True:
        index = input("AI를 이용하여 답장 초안을 작성하고 싶은 메일이 있다면, 메일의 번호를 입력해주세요 (숫자가 아닌 문자를 입력하면 종료됩니다.): ")
        if not index.isdigit():
            print('프로그램을 종료합니다.')
            return -1 -1

        try:
            selectedEmail = emails[int(index) - 1]
            while True:
                isAffirmation = input(index + '번 메일에 긍정적인 답변을 하고 싶다면 "긍정", 부정적인 답변을 하고 싶다면 "부정"이라고 따옴표 없이 입력해주세요. \n메일 번호를 다시 고르고 싶으면 0을 입력해주세요: ')
                
                if isAffirmation == '0':
                    print('메일 번호를 다시 골라주세요')
                    break
                
                if isAffirmation not in ['긍정', '부정']:
                    print('반드시 긍정 혹은 부정으로만 입력해주세요.')
                else:
                    print(f'{index}번 메일에 {isAffirmation}적인 답변을 생성합니다.')
                    selectedEmail.append(isAffirmation)
                    break
            if len(selectedEmail)!=6:
                continue  # 바깥 루프로 돌아가 다시 메일 입력받기

            try:
                response = replyPropmt.send_message(selectedEmail)
            except Exception as e:
                print("제한 초과, 60초 후 재시도")
                time.sleep(60)
                response = replyPropmt.send_message(selectedEmail)

            response_list = splitSentence(response.text)
            while True:
              targetIndex = input('생성된 AI 답변으로 메일을 작성하러 가고 싶으면, 마음에 드는 답변의 번호를 입력해주세요. 마음에 들지 않는다면 0을 입력해주세요 (0을 입력하면 메일 선택으로 돌아갑니다): ')
              
              if not targetIndex.isdigit():
                  print('정확한 번호를 입력해주세요')
                  continue

              targetIndex = int(targetIndex)  # 문자열 → 정수로 변환

              if targetIndex == 0:
                  break
              elif targetIndex < 1 or targetIndex > 3:
                  print('정확한 번호를 입력해주세요')
              else:
                  print(f'{targetIndex}번 답변으로 메일을 작성하러 이동합니다.')
                  return int(index)-1, response_list[targetIndex - 1]

                      
        except:
          print('입력하신 번호에 해당하는 메일이 없습니다. 다시 입력해주세요.')

def moveToPrepareToSendEmail(id, content):
  url = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox/'+id
  driver.get(url)
  time.sleep(5)
  button = driver.find_element(By.CLASS_NAME, 'bkH')
  driver.execute_script("arguments[0].click();", button)
  body = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, 'div[aria-label="메일 본문"][contenteditable="true"]'))
  )
  body.click()
  body.send_keys(content)
  
API_KEY = os.getenv('API_KEY')
if not API_KEY:
    raise ValueError("❌ Google API 키가 설정되지 않았습니다. 환경 변수 GOOGLE_API_KEY를 설정하세요.")
genai.configure(api_key=API_KEY)

driver = webdriver.Chrome(options=options)
driver.maximize_window()
driver.get('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&ifkv=AXH0vVsgjXN1T0wMyFbhzv0i4DFT4gXCmGb2_0oxLBhvVbFcgplbJWf1NgcWXkzGkCRjZND9OJmiHA&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1862105550%3A1744683838397882#inbox')

available_models = [m.name for m in genai.list_models()]
# print("✅ 사용 가능한 모델 목록:", available_models)

data = {}
isFirst()
rows = findUnread()
if (len(rows) != 0):
  emails = getEmails(rows)
  sortedData = dict(sorted(data.items(), key=lambda x: int(x[1][1]), reverse=True))
  for k, v in sortedData.items():
    score = int(v[1])
    summary = v[2]
    print('★'*(score)+'☆'*(10-score), '['+k+']', summary, end='\n\n')
  while True:
    quit = input('종료 를 입력하면 프로그램이 종료됩니다 그 외 아무키나 누르면 AI를 이용한 답변을 생성해드립니다: ')
    if quit == '종료':
      print('프로그램을 완전히 종료합니다')
      break
    index, answer = replyAnswerGenerate(emails)
    if (answer != -1 and index != -1):
      moveToPrepareToSendEmail(sortedData[str(index+1)][0], answer)