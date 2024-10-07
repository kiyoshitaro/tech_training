import { StructuredTool } from "langchain/tools";

export abstract class BaseTool extends StructuredTool {
  protected _callback: (name: string, data: any) => void;

  constructor() {
    super();
  }
  protected _data: any;
  public setData(data?: any) {
    this._data = data;
  }
  public getData() {
    return this._data;
  }

  protected errorResponse = (action: string) => {
    if (this._callback) {
      this._callback(this.name + "_error", {
        type: "error",
        text: action,
      });
    }
  };

  protected loadingResponse = (action: string) => {
    console.log(this._callback, "loadingResponse");
    if (this._callback) {
      this._callback(this.name + "_loading", {
        type: "loading",
        text: action,
      });
    }
  };
  public clone(data?: any, callback?: any): this {
    // Create a new instance of the same class
    // const clone = Object.create(this);
    // const clone = new (this.constructor as { new() })();
    const clone = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    clone._data = data;
    clone._callback = callback;
    return clone;
  }
}
