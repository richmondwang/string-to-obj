interface stringToObjConfig {
  trim?: Boolean;
  delimiters?: {
    values?: { [key: string]: any },
    keyValue?: string,
  };
  blackhole?: string | Boolean,
}

declare module 'string-to-obj' {

  class stringToObj {
    constructor(config?: stringToObjConfig);
  }

  namespace stringToObj {
    function parse(input: string): { [key: string]: string[] };
    const source: stringToObjConfig;
  }

  export = stringToObj;

}

