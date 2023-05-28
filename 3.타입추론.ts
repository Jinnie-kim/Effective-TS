{
  // 타입 추론은 수동으로 명시해야 하는 타입 구문의 수를 엄청나게 줄여주기 때문에
  // 코드의 전체적인 안정성이 향상된다.

  // Item 1️⃣9️⃣. 추론 가능한 타입을 사용해 장황한 코드 방지하기
  // 타입 추론이 되면 명시적 타입 구문은 필요하지 않다.
  // 타입스크립트에서 변수의 타입은 일반적으로 처음 등장할 때 결정된다.

  let x: number = 12; // 비생산적

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
}
