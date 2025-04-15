from importlib.abc import ResourceLoader
from selenium import webdriver
from selenium.webdriver.common.by import By
import re
import selenium
import requests
import copy
import time
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('user-data-dir')
options.add_experimental_option('detach', True)
options.add_experimental_option('excludeSwitches', ['enable-logging'])

def Login(email, password):
  driver.find_element(By.XPATH, '//*[@id="identifierId"]').send_keys(email)
  driver.find_element(By.XPATH, '//*[@id="identifierNext"]/div/button').click()
  input()


driver=driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
driver.set_window_size(414,800)
driver.get('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&ifkv=AXH0vVsgjXN1T0wMyFbhzv0i4DFT4gXCmGb2_0oxLBhvVbFcgplbJWf1NgcWXkzGkCRjZND9OJmiHA&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1862105550%3A1744683838397882#inbox')

email = input("이메일을 입력해주세요")
password = input('비밀번호를 입력해주세요')

Login(email, password)
