function isEmpty(obj: any) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function convertObjectFieldsToString(ob: any): any {
    return Object.keys(ob).reduce((accum: any, key: string) => {
      if (typeof ob[key] === 'object') {
        if (!isEmpty(ob[key])) {
            return convertObjectFieldsToString(ob[key]);
        } else {
            accum[key] = ob[key];
        }
      } else {
        accum[key] = ob[key] === 'string'? ob[key] : JSON.stringify(ob[key]);
      }
      
      return accum;
    }, {});
  }