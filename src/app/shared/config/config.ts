export class Config{
  static PHONE_MASK = ['3', '8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  static emailCheck = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  static link =/https:\/\/www\.facebook\.com\/\w+/;
}
