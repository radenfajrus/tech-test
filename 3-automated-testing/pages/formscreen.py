
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from config import base_url

from functools import wraps
import logging

class FormScreen:
  def __init__(self,driver):
    self.driver = driver
    wait = WebDriverWait(self.driver, 10)

    self.nameField = wait.until(EC.visibility_of_element_located((By.ID, "form-input-name")))  
    self.emailField = wait.until(EC.visibility_of_element_located((By.ID, "form-input-email")))  
    self.phoneField = wait.until(EC.visibility_of_element_located((By.ID, "form-input-phone-number")))
    
    self.submitButton = wait.until(EC.visibility_of_element_located((By.ID, "form-submit")))  

  def clearField(func):
    def wrapper(self, *arg, **kw):
        self.nameField.clear()
        self.emailField.clear()
        self.phoneField.clear()
        
        res = func(self, *arg, **kw)
        return res
    return wrapper

  def getAlertSubmitSuccess(self):
    try:
      alert = WebDriverWait(self.driver, 3).until(EC.alert_is_present())
      alert_text = alert.text
      alert.accept()
      return alert_text == "Form has been submitted"
    except Exception as e:
      return False
          
  @clearField
  def validate_error_input_name_displayed(self):
    self.nameField.send_keys()
    self.emailField.send_keys("user@gmail.com")
    self.phoneField.send_keys("8123123123")
    self.submitButton.click()
    
    self.nameErrorText = WebDriverWait(self.driver, 3).until(EC.visibility_of_element_located((By.ID, "form-error-name")))  
    assert self.nameErrorText.is_displayed(), "error text on name field not displayed"

  @clearField
  def validate_error_input_email_displayed(self):
    self.nameField.send_keys("user")
    self.emailField.send_keys()
    self.phoneField.send_keys("8123123123")
    self.submitButton.click()

    self.emailErrorText = WebDriverWait(self.driver, 3).until(EC.visibility_of_element_located((By.ID, "form-error-email")))  
    assert self.emailErrorText.is_displayed(), "error text on email field not displayed" 

  @clearField
  def validate_error_input_phone_displayed(self):
    self.nameField.send_keys("user")
    self.emailField.send_keys("user@gmail.com")
    self.phoneField.send_keys()
    self.submitButton.click()

    self.phoneErrorText = WebDriverWait(self.driver, 3).until(EC.visibility_of_element_located((By.ID, "form-error-phone")))  
    assert self.phoneErrorText.is_displayed(), "error text on phone field not displayed" 

  @clearField
  def validate_message_submit_success_displayed(self):
    self.nameField.send_keys("user")
    self.emailField.send_keys("user@gmail.com")
    self.phoneField.send_keys("8123123123")
    self.submitButton.click()
    assert self.getAlertSubmitSuccess(), "submit didnt get success response from server" 

      
    