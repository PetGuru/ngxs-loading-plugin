export namespace Loading {
  export class Start {
    static readonly type = '[Loading] Start';
    constructor(public action: any, public key: string) {}
  }

  export class Complete {
    static readonly type = '[Loading] Complete';
    constructor(public action: any, public key: string) {}
  }
}