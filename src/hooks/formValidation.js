function validation(name, value) {
  let errors = {};
  if(name === 'email') {
      if(!value) {
          errors = ({[name]: 'Поле не может быть пустым'})
      } else if(!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value)) {
          errors = {[name]: 'Email не соответствует формату'}
      }
  }

  if(name === 'password') {
      if(!value) {
          errors =({[name]: 'Поле не может быть пустым'})
      }
  }

  if(name === 'name') {
      if(!value) {
        errors = ({[name]: 'Имя обязательно'})
      } else if (/[^a-zа-я\-ёЁ\s]/i.test(value)) {
        errors = ({[name]: 'Имя может содержать только латиницу, кириллицу, пробел или дефис'});
      } else if (value.length <= 1) {
        errors = ({[name]: 'Имя не должно быть меньше 2 символов'});
      }
    }

  return errors;
}

export default validation;