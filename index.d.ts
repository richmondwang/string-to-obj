declare class StringToObj {
  constructor(config?: StringToObj.Config);

  parse(input: string): { [key: string]: string[] };
  source: StringToObj.Config;
}

declare namespace StringToObj {
  interface Config {
    trim?: Boolean;
    delimiters?: {
      values?: { [key: string]: any },
      keyValue?: string,
    };
    blackhole?: string | Boolean,
  }
}

export = StringToObj;
export as namespace StringToObj;
