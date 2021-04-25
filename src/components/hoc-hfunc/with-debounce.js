/*
  Обертка для функции f, которая запускаяется не ранее, чем через ms миллисекунд после последнего вызова
 */
const withDebounce = (f, ms) =>{
    let isStarted = false;
  
    return (...args) => {
      if (isStarted) {
        //console.log("Рано");
        return null;
      } else {
        //console.log("Стартуем");
        isStarted = true;
        setTimeout(() => {
          isStarted = false;
        }, ms);
        return f.call(this, ...args);
      }
    };
  }

  export default withDebounce;