import { CharArray, IndexedChar as ic } from './array';

export class IdGenerator {
  private currentIdArray: number[] = [];
  private IndexedCharJSON = ic;
  private currentIdString = '';
  private CharArrayObj = CharArray;
  constructor(
    initialID?: string,
    chatArray?: {
      indexedData: {
        [key: string]: number;
      };
      charArray: string[];
    }
  ) {
    if (initialID) {
      this.currentIdString = initialID;
      this.currentIdArray = this.GenerateArrayFromStrin(this.currentIdString);
    }
    if (chatArray) {
      this.IndexedCharJSON = chatArray.indexedData;
      this.CharArrayObj = chatArray.charArray;
    }
  }
  getCurrentID() {
    return this.currentIdString;
  }
  GetNextID(): string {
    if (this.currentIdArray.length === 0) {
      this.currentIdArray.push(-1);
    }
    let length = this.currentIdArray.length;
    while (length >= 0) {
      length--;
      let data = ++this.currentIdArray[length];
      if (data >= this.CharArrayObj.length) {
        this.currentIdArray[length] = 0;
        if (length === 0) {
          this.currentIdArray.unshift(0);
        }
        continue;
      }
      this.currentIdArray[length] = data;
      break;
    }
    let nextID = this.currentIdArray.reduce(
      (a, b) => a + this.CharArrayObj[b],
      ''
    );
    this.currentIdString = nextID;
    return nextID;
  }
  SetCurrentID(s: string) {
    this.currentIdString = s;
    this.currentIdArray = this.GenerateArrayFromStrin(this.currentIdString);
  }
  private GenerateArrayFromStrin(ss: string) {
    const aa: number[] = [];
    for (var i = 0; i < ss.length; i++) {
      aa.push(this.IndexedCharJSON[ss[i]]);
    }
    return aa;
  }
}

const a = new IdGenerator('AAABV');
let i = 0;
while (i !== 500) {
  i++;
  console.log(a.GetNextID());
}
