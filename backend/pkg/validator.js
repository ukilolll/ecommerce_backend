function validator(validateObj, body) {
  if (!body) body = {};

  const { error, value } = validateObj.validate(body, { abortEarly: false });

    if (error) {
      const errMessage = error.details.map(err => err.message);
      return { error: true, errorMsg: errMessage };
    }

  return { error: false, body:body};
}

export default validator;

//javaOOP way
// class Validator {
//   setObj(validateObj){
//     this.validateObj = validateObj;
//     return this
//   }

//   setBody(body,) {
//     this.body = body || {};
//     return this; 
//   }

//   run() {
//     const { error, value } = this.validateObj.validate(this.body, { abortEarly: false });

//     if (error) {
//       const errMessage = error.details.map(err => err.message);
//       return { error: true, errorMsg: errMessage };
//     }
//     return { error: false, body:this.body };
//   }
// }