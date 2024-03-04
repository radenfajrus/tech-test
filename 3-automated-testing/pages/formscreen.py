
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from config import base_url

from functools import wraps

class FormScreen:
  def __init__(self,driver):
    self.driver = driver

    self.nameField = WebDriverWait(self.driver.instance, 10) \
      .until(EC.visibility_of_element_located((By.ID, "form-input-name")))  
    self.emailField = WebDriverWait(self.driver.instance, 10) \
      .until(EC.visibility_of_element_located((By.ID, "form-input-email")))  
    self.phoneField = WebDriverWait(self.driver.instance, 10) \
      .until(EC.visibility_of_element_located((By.ID, "form-input-phone-number")))  

    self.nameErrorText = WebDriverWait(self.driver.instance, 10) \
      .until(EC.visibility_of_element_located((By.ID, "form-error-name")))  
    self.emailErrorText = WebDriverWait(self.driver.instance, 10) \
      .until(EC.visibility_of_element_located((By.ID, "form-error-email")))  
    self.phoneErrorText = WebDriverWait(self.driver.instance, 10) \
      .until(EC.visibility_of_element_located((By.ID, "form-error-phone-number")))  
    
    self.submitButton = WebDriverWait(self.driver.instance, 10) \
      .until(EC.visibility_of_element_located((By.ID, "form-submit")))  
    

    self.displayedMessage = WebDriverWait(self.driver.instance, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "et-pb-contact-message")))  
    
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
        WebDriverWait(self.driver.instance, 10) \
          .until(EC.alert_is_present(),'Form has been submitted')
        alert = self.driver.instance.switch_to.alert
        alert.accept()
        return True
    except Exception as e:
        return False
        
  @clearField
  def validate_error_input_name_displayed(self):
    self.nameField.send_keys()
    self.emailField.send_keys("user@gmail.com")
    self.phoneField.send_keys("8123123123")
    self.submitButton.click()
    assert self.nameErrorText.is_displayed() 

  @clearField
  def validate_error_input_email_displayed(self):
    self.nameField.send_keys("user")
    self.emailField.send_keys()
    self.phoneField.send_keys("8123123123")
    self.submitButton.click()
    assert self.emailErrorText.is_displayed() 

  @clearField
  def validate_error_input_phone_displayed(self):
    self.nameField.send_keys("user")
    self.emailField.send_keys("user@gmail.com")
    self.phoneField.send_keys()
    self.submitButton.click()
    assert self.phoneErrorText.is_displayed() 

  @clearField
  def validate_message_submit_success_displayed(self):
    self.nameField.send_keys("user")
    self.emailField.send_keys("user@gmail.com")
    self.phoneField.send_keys("8123123123")
    self.submitButton.click()
    assert self.getAlertSubmitSuccess() 

      
    