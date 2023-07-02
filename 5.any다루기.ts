{
  // Item 4️⃣1️⃣. any의 진화를 이해하기
  // any 타입의 진화는 noImplicitAny가 설정된 상태에서 변수의 타입이 암시적 any인 경우에만 일어난다.
  // 명시적으로 any 타입을 선언하면 타입이 그대로 유지된다.

  function range(start: number, limit: number) {
    const out = []; // any[] 타입으로 초기화
    for (let i = 0; i < limit; i++) {
      out.push(i);
    }

    return out; // number[] type으로 추론됨
  }

  // 조건문에서는 분기에 따라 타입이 변할 수도 있음
  let val; // any type
  if (Math.random() < 0.5) {
    val = /hello/;
    val; // RegExp type
  } else {
    val = 12;
    val; // number type
  }
  val; // number | RegExp

  // 변수의 초깃값이 null인 경우, any의 진화가 일어남. (보통 try/catch 블록 안에서 변수를 할당하는 경우)
  let val2 = null;
  try {
    // somethingWeird();
    val2 = 12;
    val2;
  } catch (e) {
    console.warn('alas');
  }
  val2; // number | null

  function makeSquares(start: number, limit: number) {
    const out = [];
    range(start, limit).forEach((i) => {
      out.push(i * i);
    });

    return out;
  }

  // Item 4️⃣2️⃣. 모르는 타입의 값에는 any대신 unknown을 사용하기

  // any가 강력하면서도 위험한 이유
  // 1. 어떠한 타입이든 any타입에 할당 가능 (어떤 타입이든 unknown타입에 할당 가능 / 어떤 타입도 never타입에 할당할 수 없음)
  // 2. any 타입은 어떠한 타입으로도 할당 가능하다. (unknown은 오직 unknown과 any에만 할당 가능 / never 타입은 어떠한 타입으로도 할당 가능)

  // 변수 선언 시 어떠한 값이 있지만 그 타입을 모르는 경우에 unknown을 사용한다.

  // Item 4️⃣3️⃣. 몽키 패치보다는 안전한 타입을 사용하기

  // 자바스크립트의 가장 유명한 특징 중 하나: 객체와 클래스에 임의의 속성을 추가할 수 있을만큼 유연하다.
  // 객체에 속성을 추가하는 기능 - window나 document에 값을 할당하여 전역변수를 만들 때, DOM 엘리먼트에 데이터를 추가할 때
  window.monkey = 'Tamarin';
  document.monkey = 'Howler';

  const el = document.getElementById('colorbus');
  el.home = 'tree';

  // 내장 타입에 데이터를 저장해야 하는 경우, 안전한 타입 접근법(보강 or 사용자 정의 인터페이스로 단언)중 하나를 사용해야 한다.
}
