import unittest

from config import base_url, webdriver
from pages.formscreen import FormScreen

class VerifyDisplayValidation(unittest.TestCase):
  
  def setUp(self):
    self.driver = webdriver
    self.driver.get(base_url)
    
  def test_displayValidationErrorInputName(self):
    form_screen = FormScreen(self.driver)    
    form_screen.validate_error_input_name_displayed()

  def test_displayValidationErrorInputEmail(self):
    form_screen = FormScreen(self.driver)    
    form_screen.validate_error_input_email_displayed()

  def test_displayValidationErrorInputPhone(self):
    form_screen = FormScreen(self.driver)    
    form_screen.validate_error_input_phone_displayed()

  def tearDown(self):
    self.driver.quit()     


class VerifyDisplaySubmit(unittest.TestCase):
  
  def setUp(self):
    self.driver = webdriver
    self.driver.get(base_url)
    
  def test_displaMessageSubmitSuccess(self):
    form_screen = FormScreen(self.driver)    
    form_screen.validate_message_submit_success_displayed()

  def tearDown(self):
    self.driver.quit()     
   

if __name__ == '__main__':
  unittest.main()    