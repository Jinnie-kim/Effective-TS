{
  // 타입 추론은 수동으로 명시해야 하는 타입 구문의 수를 엄청나게 줄여주기 때문에
  // 코드의 전체적인 안정성이 향상된다.

  // Item 1️⃣9️⃣. 추론 가능한 타입을 사용해 장황한 코드 방지하기
  // 타입 추론이 되면 명시적 타입 구문은 필요하지 않다.
  // 타입스크립트에서 변수의 타입은 일반적으로 처음 등장할 때 결정된다.

  // let x: number = 12; // 비생산적

  let y = 12; // 충분

  interface Product {
    // id: number;
    id: string;
    name: string;
    price: number;
  }

  // function logProduct(product: Product) {
  //   const id: number = product.id;
  //   const name: string = product.name;
  //   const price: number = product.price;
  //   console.log(id, name, price);
  // }
  function logProduct(product: Product) {
    const { id, name, price } = product; // 비구조화 할당문은 모든 지역 변수의 타입이 추론되도록 한다.
    console.log(id, name, price);
  }

  // 객체 리터럴을 정의할 때, 타입이 추론될 수 있음에도 여전히 타입을 명시하는 상황
  // 이 떄, 잉여 속성 체크가 동작한다. -> 변수가 사용되는 순간이 아닌 할당하는 시점에 오류가 표시되도록 해준다.

  // 함수의 반환에도 타입을 명시하여 오류를 방지할 수 있다.
  // 반환 타입을 명시하면, 구현상의 오류가 사용자 코드의 오류로 표시되지 않는다.
  // 반환 타입을 명시하면 함수에 대해 더욱 명확하게 알 수 있다.
  // 반환 타입을 명시하면 명명된 타입을 사용할 수 있다.

  // Item 2️⃣0️⃣. 다른 타입에는 다른 변수 사용하기
  // 변수의 값은 바뀔 수 있지만 그 타입은 보통 바뀌지 않는다.
  // 다른 타입에는 별도의 변수를 사용하는 게 바람직하다. == 목적이 다른 곳에는 별도의 변수명을 사용해야 한다.

  // Item 2️⃣1️⃣. 타입 넓히기
  // 타입스크립트가 작성된 코드를 체크하는 시점에 변수는 '가능한' 값들의 집한인 타입을 가진다.
  // 상수를 사용해서 변수를 초기화할 때 타입을 명시하지 않으면 타입 체커는 타입을 결정해야 한다.
  // -> 지정된 단일 값을 가지고 할당 가능한 값들의 집합을 유추해야 한다. => 넓히기 widening

  interface Vector3 {
    x: number;
    y: number;
    z: number;
  }

  function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
    return vector[axis];
  }

  // let x = 'x'; // 타입 추론이 'string'으로 됨. -> widening이 동작, 주어진 값으로 추론 가능한 타입이 여러 개이기 때문.
  const x = 'x'; // widening을 제어하는 첫 번째 방법, const 사용하기 -> 그러나 객체와 배열의 경우 여전히 문제가 됨.
  let vec = { x: 10, y: 20, z: 30 };
  getComponent(vec, x);

  // x = 'a';
  // x = 'can be assign any string value here';

  const v = { x: 1 };

  // 변수 v의 타입은 가장 구체적이라면 {readonly x: 1};
  // 추상적으로는 {x: number};
  // 가장 추상적으로는 {[key: string]: number} or object 가 될 것이다.
  // => 객체의 경우 타입스크립트의 넓히기 알고리즘은 각 요소를 let으로 할당된 것처럼 다룬다.
  // => 변수 v 타입은 {x: number};가 된다. 다른 속성 추가 불가

  // v.x = 3, // 재할당 가능
  // v.x = '3';  // string 타입으로는 재할당 불가
  // v.y = 4;
  // v.name = 'Pythagoras'

  // 타입 추론의 강도 직접 제어하기
  // 1. 명시적 타입 구문 제공
  const c: { x: 1 | 3 | 5 } = { x: 1 }; // 타입 =  { x: 1 | 3 | 5 }
  // 2. 타입 체커에 추가적인 문맥 제공
  // 3. const 단언문 사용
  // 값 뒤에 as const를 작성하면 타입스크립트는 최대한 좁은 타입으로 추론한다.
  const v1 = {
    x: 1,
    y: 2,
  };

  const v2 = {
    x: 1 as const,
    y: 2,
  };

  // widening 넓히기가 동작하지 않는다.
  const v3 = {
    x: 1,
    y: 2,
  } as const;

  // Item 2️⃣2️⃣. 타입 좁히기
  // 가장 일반적인 예시는 null 체크

  const el = document.getElementById('foo');

  if (el) {
    el;
    el.innerHTML = 'Party time'.blink();
  } else {
    el;
    alert('No element #foo');
  }

  // 또는

  const el2 = document.getElementById('foo');
  if (!el) throw new Error('Unable to find #foo');
  el;
  el.innerHTML = 'Party time'.blink();

  // instanceof, 속성 체크로도 타입을 좁힐 수 있다.
  // Array.isArray 같은 일부 내장 함수로도 타입을 좁힐 수 있다.

  // 명시적 '태그'를 붙여서 타입을 좁힐 수도 있다.
  // tagged union or discriminated union
  interface UploadEvent {
    type: 'upload';
    filename: string;
    contents: string;
  }
  interface DownloadEvent {
    type: 'download';
    filename: string;
  }

  type AppEvent = UploadEvent | DownloadEvent;

  function handleEvent(e: AppEvent) {
    switch (e.type) {
      case 'upload':
        e;
        break;
      case 'download':
        e;
        break;
    }
  }

  // 식별을 돕기 위해 커스텀 함수 도입 가능
  // 사용자 정의 타입 가드
  function isInputElement(el: HTMLElement): el is HTMLInputElement {
    return 'value' in el;
  }

  function getElementContent(el: HTMLElement) {
    if (isInputElement(el)) {
      el;
      return el.value;
    }
    el;
    return el.textContent;
  }

  function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
  }

  // Item 2️⃣3️⃣. 한꺼번에 객체 생성하기
  // 객체를 생성할 때는 속성을 하나씩 추가하기보다는 여러 속성을 포함해서 한꺼번에 생성해야 타입 추론에 유리하다.
}
