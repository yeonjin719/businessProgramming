import re, time, ast, os, pyautogui, platform, subprocess
import google.generativeai as genai
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from dotenv import load_dotenv

# 구글 드라이브 옵션 설정
options = Options()
options.add_argument("--incognito") 
options.add_argument('--disable-blink-features=AutomationControlled')
options.add_experimental_option('detach', True)
options.add_experimental_option('excludeSwitches', ['enable-logging'])
options.add_argument("window-position=0,0")
options.add_argument("window-size=1280,800")
load_dotenv()

def load_prompt(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return file.read()

rating_prompt = load_prompt('term_project/ratingPrompt.txt')
reply_prompt = load_prompt('term_project/replyPrompt.txt')

ratingAndSummaryPrompt = genai.GenerativeModel('gemini-1.5-flash-latest').start_chat(history=[
    {"role": "user", "parts": [rating_prompt]}
])

replyPrompt = genai.GenerativeModel('gemini-1.5-flash-latest').start_chat(history=[
    {"role": "user", "parts": [reply_prompt]}
])

import platform
import subprocess

def bring_window_to_front(app_name_substring: str):
    os_name = platform.system()

    if os_name == "Darwin":  # macOS
        try:
            subprocess.run(['osascript', '-e', f'tell application "{app_name_substring}" to activate'], check=True)
            print(f"✅ macOS: '{app_name_substring}' 앱을 전면으로 가져왔습니다.")
        except Exception as e:
            print(f"❌ macOS: 창 활성화 실패 - {e}")
    else:
        print(f"❗ 이 운영체제는 자동 창 전환이 지원되지 않습니다: {os_name}")


def Login():
  driver.find_element(By.XPATH, '//*[@id="identifierId"]').send_keys(USER_EMAIL)
  driver.find_element(By.XPATH, '//*[@id="identifierNext"]/div/button').click()
  WebDriverWait(driver, 15).until(
    EC.visibility_of_element_located((By.NAME, "Passwd"))
)
  try:
    driver.find_element(By.XPATH,'//*[@id="password"]/div[1]/div/div[1]/input').send_keys(USER_PASSWORD)
    driver.find_element(By.XPATH,'//*[@id="passwordNext"]/div/button').click()
  
  except:
      current_url = driver.current_url
      id = re.search(r'pwd?TL=([^&]+)', current_url).group(1)
      time.sleep(2)
      driver.get(f'https://accounts.google.com/v3/signin/challenge/selection?TL={id}&checkConnection=youtube%3A264&checkedDomains=youtube&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&dsh=S-1862105550%3A1744683838397882&emr=1&flowEntry=ServiceLogin&flowName=GlifWebSignIn&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&ifkv=AXH0vVsgjXN1T0wMyFbhzv0i4DFT4gXCmGb2_0oxLBhvVbFcgplbJWf1NgcWXkzGkCRjZND9OJmiHA&lid=1&osid=1&pstMsg=1&service=mail')
      time.sleep(2)
      element = driver.find_element(By.XPATH, '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div/div/form/span/section[2]/div/div/section/div/div/div/ul/li[2]/div')

      driver.execute_script("arguments[0].click();", element)
      WebDriverWait(driver, 15).until(
        EC.visibility_of_element_located((By.NAME, "Passwd"))
      )
      driver.find_element(By.XPATH,'//*[@id="password"]/div[1]/div/div[1]/input').send_keys(USER_PASSWORD)
      driver.find_element(By.XPATH,'//*[@id="passwordNext"]/div/button').click()
  
def firstLogin():
  print('이중 보안이 걸려있는 경우 패스키 인증 요청으로 인하여 프로그램이 정상작동하지 않을 수 있습니다.\n 반드시 이중 보안을 해제한 후 프로그램을 동작시켜주세요.\n')
  Login()
  time.sleep(5)

def findUnread():
  try:
    driver.get('https://mail.google.com/mail/u/0/?pli=1#search/is%3Aunread')
    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.CLASS_NAME, "Cp"))
    )
    target = driver.find_element(By.CLASS_NAME, 'bv9')
    table = target.find_element(By.CLASS_NAME, 'Cp')
    rows = table.find_elements(By.TAG_NAME , 'tr')
    return rows
  except:
    print('로그인 과정 중에 오류가 발생하였습니다.')
    print('로그인을 다시 시도합니다.')
    driver.get('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&ifkv=AXH0vVsgjXN1T0wMyFbhzv0i4DFT4gXCmGb2_0oxLBhvVbFcgplbJWf1NgcWXkzGkCRjZND9OJmiHA&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1862105550%3A1744683838397882#inbox')
    firstLogin()

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
  key, value_str = response.text.split(":", 1)
  value = ast.literal_eval(value_str.strip())
  return key.strip(), value

def getEmails(rows):
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
    elements = driver.find_elements(By.CSS_SELECTOR, 'div.G-Ni.J-J5-Ji')
    first_element = elements[2]
    unreadBtn = first_element.find_element(By.CSS_SELECTOR, '.T-I.J-J5-Ji.bvt.T-I-ax7.T-I-Js-IF.mA')
    ActionChains(driver).move_to_element(unreadBtn).click().perform()
    time.sleep(2) 
    
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
    bring_window_to_front("Visual Studio Code")
    while True:
        index = input("AI를 이용하여 답장 초안을 작성하고 싶은 메일이 있다면, 메일의 번호를 입력해주세요 (숫자가 아닌 문자를 입력하면 종료됩니다.): ")
        if not index.isdigit():
            print('프로그램을 종료합니다.')
            return -1, -1
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
                response = replyPrompt.send_message(selectedEmail)
            except Exception as e:
                print("제한 초과, 60초 후 재시도")
                time.sleep(60)
                response = replyPrompt.send_message(selectedEmail)

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
  WebDriverWait(driver, 15).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "bkH"))
  )
  button = driver.find_element(By.CLASS_NAME, 'bkH')
  driver.execute_script("arguments[0].click();", button)
  body = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, 'div[aria-label="메일 본문"][contenteditable="true"]'))
  )
  body.click()
  body.send_keys(content)
  bring_window_to_front("gmail")
  
  
USER_EMAIL = os.getenv('GMAIL_EMAIL')
USER_PASSWORD = os.getenv('GMAIL_PASSWORD')
API_KEY = os.getenv('API_KEY')

if (USER_EMAIL == None):
  print("❌ 이메일이 설정되지 않았습니다. 환경 변수 GMAIL_EMAIL를 설정하세요.")
  exit()

if (USER_PASSWORD == None):
  print("❌ 비밀번호가 설정되지 않았습니다. 환경 변수 GMAIL_PASSWORD를 설정하세요.")
  exit()
  

if (API_KEY == None):
  print("❌ Google API 키가 설정되지 않았습니다. 환경 변수 GOOGLE_API_KEY를 설정하세요.")
  exit()
    

genai.configure(api_key=API_KEY)

driver = webdriver.Chrome(options=options)
driver.get('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&ifkv=AXH0vVsgjXN1T0wMyFbhzv0i4DFT4gXCmGb2_0oxLBhvVbFcgplbJWf1NgcWXkzGkCRjZND9OJmiHA&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1862105550%3A1744683838397882#inbox')

data = {}

firstLogin()

rows = findUnread()

if (len(rows) != 0):
  emails = getEmails(rows)
  sortedData = dict(sorted(data.items(), key=lambda x: int(x[1][1]), reverse=True))
  for k, v in sortedData.items():
    score = int(v[1])
    summary = v[2]
    print('★'*(score)+'☆'*(10-score), '['+k+']', summary, end='\n\n')
  bring_window_to_front("Visual Studio Code")
  while True:
    quit = input('종료 를 입력하면 프로그램이 종료됩니다 그 외 아무키나 누르면 AI를 이용한 답변을 생성해드립니다: ')
    if quit == '종료':
      print('프로그램을 완전히 종료합니다')
      driver.quit()
      break
    else:
      index, answer = replyAnswerGenerate(emails)
      if (answer != -1 and index != -1):
        moveToPrepareToSendEmail(sortedData[str(index+1)][0], answer)
      else:
        print('답변을 생성하지 않고 프로그램을 종료합니다.')
        driver.quit()
        break
else:
  print('새로운 메일이 없습니다. \n 프로그램을 종료합니다.')
  driver.quit()
  exit()
